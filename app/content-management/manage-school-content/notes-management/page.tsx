"use client";
import React, { useEffect, useState } from "react";
import ContentSidebar from "../../components/ContentSidebar";
import { db } from "../../../../lib/firebaseClient";
import { collection, query, where, getDocs, doc, getDoc, orderBy } from "firebase/firestore";
import { auth } from "../../../../components/firebase";

export default function NotesManagement() {
  // All useState declarations (MUST be at the top)
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  // Upload form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  interface ClassData {
    id: string;
    name: string;
    [key: string]: any;
  }
  const [classes, setClasses] = useState<ClassData[]>([]);
  // Subjects for main page filter
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  // Subjects for upload modal filter
  const [uploadSubjects, setUploadSubjects] = useState<any[]>([]);
  const [loadingUploadSubjects, setLoadingUploadSubjects] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // Filter state
  const [filterClass, setFilterClass] = useState<string>("");
  const [filterSubject, setFilterSubject] = useState<string>("");
  // Client-only render guard
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

  // All useEffect hooks below here


  // Fetch classes for the logged-in teacher (always on mount)
  useEffect(() => {
    async function fetchClasses() {
      setLoadingClasses(true);
      try {
        const user = auth.currentUser;
        if (!user) return;

        // First, check if user is a teacher and get their assigned classes
        const teacherQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));
        const teacherSnapshot = await getDocs(teacherQuery);
        
        if (!teacherSnapshot.empty) {
          const teacherDoc = teacherSnapshot.docs[0];
          const teacherData = teacherDoc.data();
          
          if (teacherData.classes?.length > 0) {
            // Get the actual class data for each class reference
            const classPromises = teacherData.classes.map(async (classRef: any) => {
              try {
                // If classRef is a reference, we need to get the document
                const classDoc = typeof classRef?.path === 'string' 
                  ? await getDoc(doc(db, classRef.path))
                  : await getDoc(classRef);
                  
                if (classDoc.exists()) {
                  const classData = classDoc.data() as { name?: string; [key: string]: any };
                  return {
                    id: classDoc.id,
                    name: classData?.name || 'Unnamed Class',
                    ...(classData || {})
                  } as ClassData;
                }
                return null;
              } catch (error) {
                console.error("Error fetching class:", error);
                return null;
              }
            });
            
            const classDocs = await Promise.all(classPromises);
            const validClasses = classDocs.filter((c): c is ClassData => c !== null);
            console.log("Fetched classes:", validClasses);
            setClasses(validClasses);
            
            // If there are classes, set the first one as selected
            if (validClasses.length > 0 && !filterClass) {
              setFilterClass(validClasses[0].id);
            }
          } else {
            console.log("No classes assigned to teacher");
            setClasses([]);
          }
        } else {
          // If not a teacher (e.g., admin), get all classes for the school
          const userSnap = await getDoc(doc(db, "users", user.uid));
          const schoolID = userSnap.exists() ? userSnap.data().schoolId : null;
          if (!schoolID) return;
          
          const q = query(collection(db, "classes"), where("schoolId", "==", schoolID));
          const snap = await getDocs(q);
          const allClasses = snap.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || 'Unnamed Class',
            ...doc.data()
          } as ClassData));
          setClasses(allClasses);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoadingClasses(false);
      }
    }
    fetchClasses();
  }, []);

  // Helper function to get teacher's subject IDs
  const getTeacherSubjectIds = async (userId: string): Promise<string[]> => {
    try {
      const teacherQuery = query(collection(db, "teachers"), where("userId", "==", userId));
      const teacherSnapshot = await getDocs(teacherQuery);
      
      if (!teacherSnapshot.empty) {
        const teacherData = teacherSnapshot.docs[0].data();
        if (teacherData.subjects?.length > 0) {
          return teacherData.subjects.map((subjRef: any) => {
            if (typeof subjRef === 'string') return subjRef.split('/').pop();
            if (subjRef?.path) return subjRef.path.split('/').pop();
            return '';
          }).filter(Boolean);
        }
      }
      return [];
    } catch (error) {
      console.error("Error fetching teacher's subjects:", error);
      return [];
    }
  };

  // Fetch subjects for the main page filter
  useEffect(() => {
    async function fetchSubjectsForMainPage() {
      setLoadingSubjects(true);
      try {
        if (!filterClass) {
          setSubjects([]);
          setLoadingSubjects(false);
          return;
        }
        
        const user = auth.currentUser;
        if (!user) return;
        
        const teacherSubjectIds = await getTeacherSubjectIds(user.uid);
        const classRef = doc(db, "classes", filterClass);
        
        let q = query(
          collection(db, "subjects"),
          where("assClass", "array-contains", classRef)
        );
        
        // If teacher has specific subjects, filter by them
        if (teacherSubjectIds.length > 0) {
          q = query(q, where("__name__", "in", teacherSubjectIds));
        }
        
        const snap = await getDocs(q);
        setSubjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoadingSubjects(false);
      }
    }
    fetchSubjectsForMainPage();
  }, [filterClass]);

  // Fetch subjects for the upload modal filter
  useEffect(() => {
    async function fetchSubjectsForUploadModal() {
      setLoadingUploadSubjects(true);
      try {
        if (!selectedClass) {
          setUploadSubjects([]);
          setLoadingUploadSubjects(false);
          return;
        }
        
        const user = auth.currentUser;
        if (!user) return;
        
        // First get the teacher document to get assigned subjects
        const teacherQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));
        const teacherSnapshot = await getDocs(teacherQuery);
        
        if (teacherSnapshot.empty) {
          console.log("No teacher found for the current user");
          setUploadSubjects([]);
          return;
        }
        
        const teacherDoc = teacherSnapshot.docs[0];
        const teacherData = teacherDoc.data();
        
        // Get the assigned subjects for this teacher
        const teacherSubjectRefs = teacherData.subjects || [];
        
        if (teacherSubjectRefs.length === 0) {
          console.log("No subjects assigned to this teacher");
          setUploadSubjects([]);
          return;
        }
        
        // Convert subject references to document IDs
        const teacherSubjectIds = teacherSubjectRefs.map((ref: any) => ref.path.split('/').pop());
        
        // Get the class reference
        const classRef = doc(db, "classes", selectedClass);
        
        // Query subjects that are both assigned to the teacher and associated with the selected class
        const q = query(
          collection(db, "subjects"),
          where("__name__", "in", teacherSubjectIds),
          where("assClass", "array-contains", classRef)
        );
        
        const snap = await getDocs(q);
        const subjectsData = snap.docs.map(d => ({
          id: d.id,
          name: d.data().name || 'Unnamed Subject',
          ...d.data()
        }));
        
        console.log("Upload modal subjects:", subjectsData);
        setUploadSubjects(subjectsData);
      } catch (error) {
        console.error("Error fetching upload subjects:", error);
        setError("Failed to load subjects. Please try again.");
      } finally {
        setLoadingUploadSubjects(false);
      }
    }
    fetchSubjectsForUploadModal();
  }, [selectedClass]);

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      setError(null);
      try {
        const user = auth.currentUser;
        if (!user) return;
        
        // Get teacher document for the logged-in user
        const teacherQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));
        const teacherSnapshot = await getDocs(teacherQuery);
        
        if (teacherSnapshot.empty) {
          console.log("No teacher found for the current user");
          setNotes([]);
          return;
        }
        
        const teacherDoc = teacherSnapshot.docs[0];
        const teacherData = teacherDoc.data();
        const schoolID = teacherData.schoolId;
        
        if (!schoolID) {
          console.log("No school ID found for the teacher");
          return;
        }
        
        // Fetch notes by classId instead of createdBy to include legacy docs
        const teacherClasses: any[] = teacherData.classes || [];
        
        // If a specific class is selected, use a single query
        if (selectedClass) {
          let q = query(
            collection(db, "contents"),
            where("video", "==", false),
            where("classId", "==", doc(db, "classes", selectedClass))
          );
          if (selectedSubject) {
            q = query(q, where("subjectId", "==", doc(db, "subjects", selectedSubject)));
          }
          const snap = await getDocs(q);
          const notesData = await Promise.all(
            snap.docs.map(async (docSnap) => {
              const d = docSnap.data();
              let className = "";
              if (d.classId) {
                try {
                  const classSnap = await getDoc(d.classId);
                  className = classSnap.exists() ? (classSnap.data() as any).name || "" : "";
                } catch {}
              }
              let subjectName = "";
              if (d.subjectId) {
                try {
                  const subjectSnap = await getDoc(d.subjectId);
                  subjectName = subjectSnap.exists() ? (subjectSnap.data() as any).name || "" : "";
                } catch {}
              }
              return {
                id: docSnap.id,
                title: d.title,
                description: d.description,
                className,
                subjectName,
                downloadUrl: d.url || "#"
              };
            })
          );
          setNotes(notesData);
        } else {
          // No class filter: query by the teacher's assigned classes (batch in chunks of 10 for 'in' constraint)
          if (!teacherClasses.length) {
            setNotes([]);
            return;
          }
          const CHUNK = 10;
          const results: any[] = [];
          for (let i = 0; i < teacherClasses.length; i += CHUNK) {
            const chunk = teacherClasses.slice(i, i + CHUNK);
            let q = query(
              collection(db, "contents"),
              where("video", "==", false),
              where("classId", "in", chunk)
            );
            if (selectedSubject) {
              q = query(q, where("subjectId", "==", doc(db, "subjects", selectedSubject)));
            }
            const snap = await getDocs(q);
            results.push(...snap.docs);
          }
          // Deduplicate and map
          const seen = new Set<string>();
          const uniqueDocs = results.filter((d: any) => {
            if (seen.has(d.id)) return false;
            seen.add(d.id);
            return true;
          });
          const notesData = await Promise.all(
            uniqueDocs.map(async (docSnap: any) => {
              const d = docSnap.data();
              let className = "";
              if (d.classId) {
                try {
                  const classSnap = await getDoc(d.classId);
                  className = classSnap.exists() ? (classSnap.data() as any).name || "" : "";
                } catch {}
              }
              let subjectName = "";
              if (d.subjectId) {
                try {
                  const subjectSnap = await getDoc(d.subjectId);
                  subjectName = subjectSnap.exists() ? (subjectSnap.data() as any).name || "" : "";
                } catch {}
              }
              return {
                id: docSnap.id,
                title: d.title,
                description: d.description,
                className,
                subjectName,
                downloadUrl: d.url || "#"
              };
            })
          );
          setNotes(notesData);
        }
      } catch (e) {
        setError("Failed to fetch notes.");
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  async function handleUpload() {
    setUploadError(null);
    if (!title || !description || !selectedClass || !selectedSubject || !file) {
      setUploadError("Please fill all fields and select a file.");
      return;
    }
    
    // Validate that the selected subject belongs to the teacher
    const isSubjectValid = uploadSubjects.some(sub => sub.id === selectedSubject);
    if (!isSubjectValid) {
      setUploadError("Invalid subject selected. Please try again.");
      return;
    }
    
    setUploading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");
      
      // Get teacher document to ensure proper permissions
      const teacherQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));
      const teacherSnapshot = await getDocs(teacherQuery);
      
      if (teacherSnapshot.empty) {
        throw new Error("Teacher record not found");
      }
      
      const teacherDoc = teacherSnapshot.docs[0];
      const teacherData = teacherDoc.data();
      const schoolID = teacherData.schoolId;
      
      if (!schoolID) {
        throw new Error("School ID not found in teacher record");
      }
      
      // Upload file to Firebase Storage
      const storageMod = await import("firebase/storage");
      const { ref, uploadBytes, getDownloadURL } = storageMod;
      const storageRef = ref(
        (await import("../../../../components/firebase")).storage,
        `notes/${user.uid}/${Date.now()}_${file.name}`
      );
      
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      // Add document to Firestore
      const { addDoc, serverTimestamp } = await import("firebase/firestore");
      await addDoc(collection(db, "contents"), {
        title,
        description,
        url,
        createdBy: doc(db, "teachers", teacherDoc.id), // Reference to teacher document
        createdAt: serverTimestamp(),
        classId: doc(db, "classes", selectedClass),
        subjectId: doc(db, "subjects", selectedSubject),
        schoolId: schoolID,
        video: false,
        fileName: file.name,
        fileType: file.type || 'application/octet-stream',
        fileSize: file.size
      });
      
      // Reset form and close modal
      setShowModal(false);
      setTitle("");
      setDescription("");
      setSelectedClass("");
      setSelectedSubject("");
      setFile(null);
      
      // Refresh the notes list
      await fetchNotes();
      
    } catch (e: any) {
      console.error("Upload error:", e);
      setUploadError(e.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }
  
  // Fetch notes with proper filtering
  async function fetchNotes() {
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user) return;
      
      // Get teacher document
      const teacherQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));
      const teacherSnapshot = await getDocs(teacherQuery);
      
      if (teacherSnapshot.empty) {
        setNotes([]);
        return;
      }
      
      const teacherDoc = teacherSnapshot.docs[0];
      
      // Fetch notes by classId based on teacher's assigned classes
      const teacherClasses: any[] = (teacherDoc.data().classes || []);
      
      // If a class filter is chosen, prefer it
      if (filterClass) {
        let q = query(
          collection(db, "contents"),
          where("video", "==", false),
          where("classId", "==", doc(db, "classes", filterClass))
        );
        if (filterSubject) {
          q = query(q, where("subjectId", "==", doc(db, "subjects", filterSubject)));
        }
        const snap = await getDocs(q);
        const notesData = await Promise.all(
          snap.docs.map(async (docSnap) => {
            const d = docSnap.data();
            let className = "";
            if (d.classId) {
              try {
                const classSnap = await getDoc(d.classId);
                className = classSnap.exists() ? (classSnap.data() as any).name || "" : "";
              } catch {}
            }
            let subjectName = "";
            if (d.subjectId) {
              try {
                const subjectSnap = await getDoc(d.subjectId);
                subjectName = subjectSnap.exists() ? (subjectSnap.data() as any).name || "" : "";
              } catch {}
            }
            return {
              id: docSnap.id,
              title: d.title,
              description: d.description,
              className,
              subjectName,
              downloadUrl: d.url || "#",
              fileType: d.fileType || 'PDF',
              fileSize: d.fileSize ? formatFileSize(d.fileSize) : ''
            };
          })
        );
        setNotes(notesData);
      } else {
        if (!teacherClasses.length) {
          setNotes([]);
          return;
        }
        const CHUNK = 10;
        const results: any[] = [];
        for (let i = 0; i < teacherClasses.length; i += CHUNK) {
          const chunk = teacherClasses.slice(i, i + CHUNK);
          let q = query(
            collection(db, "contents"),
            where("video", "==", false),
            where("classId", "in", chunk)
          );
          if (filterSubject) {
            q = query(q, where("subjectId", "==", doc(db, "subjects", filterSubject)));
          }
          const snap = await getDocs(q);
          results.push(...snap.docs);
        }
        const seen = new Set<string>();
        const uniqueDocs = results.filter((d: any) => {
          if (seen.has(d.id)) return false;
          seen.add(d.id);
          return true;
        });
        const notesData = await Promise.all(
          uniqueDocs.map(async (docSnap: any) => {
            const d = docSnap.data();
            let className = "";
            if (d.classId) {
              try {
                const classSnap = await getDoc(d.classId);
                className = classSnap.exists() ? (classSnap.data() as any).name || "" : "";
              } catch {}
            }
            let subjectName = "";
            if (d.subjectId) {
              try {
                const subjectSnap = await getDoc(d.subjectId);
                subjectName = subjectSnap.exists() ? (subjectSnap.data() as any).name || "" : "";
              } catch {}
            }
            return {
              id: docSnap.id,
              title: d.title,
              description: d.description,
              className,
              subjectName,
              downloadUrl: d.url || "#",
              fileType: d.fileType || 'PDF',
              fileSize: d.fileSize ? formatFileSize(d.fileSize) : ''
            };
          })
        );
        setNotes(notesData);
      }
    } catch (e) {
      console.error("Error fetching notes:", e);
      setError("Failed to fetch notes. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  
  // Helper function to format file size
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }


  // Now, after all state and effects are declared, compute filteredNotes
  const filteredNotes = notes.filter((note: any) => {
    if (filterClass && note.className !== (classes.find((c: any) => c.id === filterClass)?.name || "")) return false;
    if (filterSubject && note.subjectName !== (subjects.find((s: any) => s.id === filterSubject)?.name || "")) return false;
    return true;
  });

  // Prevent hydration mismatch: only render after client mount
  if (!hasMounted) return null;

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <ContentSidebar />
      <main className="flex-1 bg-gray-50 p-10">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Notes Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Notes Count */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow flex flex-col items-center border border-gray-100">
            <div className="text-4xl font-bold text-blue-700 mb-2">{loading ? "-" : filteredNotes.length}</div>
            <div className="text-gray-600">Total Notes Uploaded</div>
          </div>
          {/* Upload New Notes */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow flex flex-col items-center border border-gray-100">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition text-lg mb-2" onClick={() => setShowModal(true)}>Upload New Notes</button>
            <div className="text-gray-600">Upload PDF or document notes for your classes.</div>
          </div>
        </div>
        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative">
            {loadingClasses ? (
              <div className="animate-pulse h-10 bg-gray-100 rounded-md w-full"></div>
            ) : classes.length === 0 ? (
              <div className="text-sm text-gray-500 p-2 bg-gray-50 rounded-md border border-gray-200">
                No classes assigned. Please contact your administrator.
              </div>
            ) : (
              <select
                value={filterClass}
                onChange={e => {
                  setFilterClass(e.target.value);
                  setFilterSubject("");
                }}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          {/* Subject filter only appears after a class is selected */}
          {filterClass && (
            <select
              value={filterSubject}
              onChange={e => setFilterSubject(e.target.value)}
              className="border rounded px-3 py-2"
              disabled={!filterClass || loadingSubjects}
            >
              <option value="">All Subjects</option>
              {subjects.length === 0 && <option disabled>No subjects found for this class</option>}
              {subjects.map((sub: any) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          )}

        </div>
        {/* Upload Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm overflow-auto">
            <div className="relative w-full max-w-2xl mx-auto p-0">
              <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100 p-0 flex flex-col animate-fadeIn overflow-hidden max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-2">
                  <h2 className="text-2xl font-bold text-gray-800">Upload Files</h2>
                  <button
                    className="bg-white/70 hover:bg-gray-100 text-blue-500 rounded-full p-2 shadow-md border border-gray-200 transition"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    <svg width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/></svg>
                  </button>
                </div>
                {/* File Upload Area */}
                <div className="px-8 pt-2 pb-6 overflow-y-auto">
                  <div className="w-full bg-gray-50/80 border-2 border-dashed border-blue-100 rounded-2xl flex flex-col items-center justify-center py-8 mb-6 shadow-sm">
                    <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mb-2 text-blue-300"><path fill="currentColor" d="M12 16v-8m0 0-3 3m3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div className="text-gray-500 text-lg mb-2">Drop files to upload or click</div>
                    <label className="inline-block">
                      <input type="file" accept="application/pdf,.doc,.docx" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                      <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-6 py-2 rounded-xl shadow hover:bg-blue-200 hover:text-blue-800 transition cursor-pointer">Upload Files</span>
                    </label>
                    {file && <div className="mt-2 text-blue-600 font-semibold">{file.name}</div>}
                  </div>
                  {/* Details Section (no tabs) */}
                  <div className="mb-6">
                    <div className="text-blue-700 font-bold text-lg mb-2">Details</div>
                  </div>
                  {/* Form Fields */}
                  <form className="flex flex-col gap-6">
                    {/* Class/Subject Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Upload Modal Class Dropdown */}
                      <div className="relative">
                        <label className="block text-gray-700 font-semibold mb-1">Class</label>
                        <select
                          className="w-full bg-gray-50/80 backdrop-blur border border-blue-100 rounded-xl px-5 py-3 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow"
                          value={selectedClass}
                          onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setSelectedSubject(""); // Reset subject when class changes
                          }}
                          disabled={loadingClasses}
                        >
                          <option value="">Select Class</option>
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Upload Modal Subject Dropdown */}
                      <div className="relative">
                        <label className="block text-gray-700 font-semibold mb-1">Subject</label>
                        <select
                          className="w-full bg-gray-50/80 backdrop-blur border border-blue-100 rounded-xl px-5 py-3 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow"
                          value={selectedSubject}
                          onChange={(e) => setSelectedSubject(e.target.value)}
                          disabled={!selectedClass || loadingUploadSubjects}
                        >
                          <option value="">Select Subject</option>
                          {uploadSubjects.length === 0 ? (
                            <option disabled>No subjects found for this class</option>
                          ) : (
                            uploadSubjects.map((sub: any) => (
                              <option key={sub.id} value={sub.id}>
                                {sub.name}
                              </option>
                            ))
                          )}
                        </select>
                        {loadingUploadSubjects && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                          </div>
                        )}
                      </div>

                    </div>
                    {/* Title */}
                    <div className="relative">
                      <label className="block text-gray-700 font-semibold mb-1">Title</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50/80 backdrop-blur border border-blue-100 rounded-xl px-5 py-3 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                    {/* Description */}
                    <div className="relative">
                      <label className="block text-gray-700 font-semibold mb-1">Description</label>
                      <textarea
                        className="w-full bg-gray-50/80 backdrop-blur border border-blue-100 rounded-xl px-5 py-3 text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow min-h-[90px]"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-end gap-4 mt-2">
                      <button type="button" className="text-blue-400 font-semibold px-6 py-2 rounded-xl hover:bg-blue-50 transition" onClick={() => setShowModal(false)}>Cancel</button>
                      <button
                        type="button"
                        className="bg-gradient-to-r from-blue-500 to-blue-300 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-400 transition disabled:opacity-60"
                        disabled={uploading}
                        onClick={handleUpload}
                      >
                        {uploading ? "Uploading..." : "Upload this file"}
                      </button>
                    </div>
                  </form>
                  {uploadError && <div className="text-red-500 text-sm mt-2">{uploadError}</div>}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Notes List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Uploaded Notes</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow flex flex-col border border-gray-100 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-5/6 mb-4"></div>
                  <div className="flex gap-4 mb-4">
                    <span className="bg-gray-100 text-transparent px-3 py-1 rounded-full text-xs font-semibold">Loading...</span>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <div className="bg-gray-200 h-10 w-24 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    No notes found. Try uploading your first note using the "Upload New Notes" button above.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map(note => (
                <div key={note.id} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow flex flex-col border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 truncate" title={note.title}>{note.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {note.fileType || 'PDF'}
                    </span>
                  </div>
                  
                  {note.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.className && (
                      <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        {note.className}
                      </span>
                    )}
                    {note.subjectName && (
                      <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {note.subjectName}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                    <a
                      href={note.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition text-center flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                    <button
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-100 transition flex items-center gap-2"
                      onClick={async (e) => {
                        e.preventDefault();
                        if (window.confirm(`Are you sure you want to delete the note: ${note.title}?`)) {
                          try {
                            const { deleteDoc } = await import("firebase/firestore");
                            await deleteDoc(doc(db, "contents", note.id));
                            setNotes(notes => notes.filter(n => n.id !== note.id));
                          } catch (e) {
                            console.error("Error deleting note:", e);
                            alert("Failed to delete note. Please try again.");
                          }
                        }
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 