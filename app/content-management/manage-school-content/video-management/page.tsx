"use client";
import React, { useEffect, useState } from "react";
import ContentSidebar from "../../components/ContentSidebar";
import { db } from "../../../../lib/firebaseClient";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth } from "../../../../components/firebase";
import { storage } from "../../../../components/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function VideoManagement() {
  // State declarations
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Upload form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  
  // Data state
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [uploadSubjects, setUploadSubjects] = useState<any[]>([]);
  
  // Loading states
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingUploadSubjects, setLoadingUploadSubjects] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Filter state
  const [filterClass, setFilterClass] = useState<string>("");
  const [filterSubject, setFilterSubject] = useState<string>("");
  
  // Client-only render guard
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

  // Fetch classes for the logged-in teacher (on mount)
  useEffect(() => {
    async function fetchClasses() {
      setLoadingClasses(true);
      try {
        const user = auth.currentUser;
        if (!user) return;
        
        // First get the teacher document to get assigned classes
        const teacherQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));
        const teacherSnapshot = await getDocs(teacherQuery);
        
        if (teacherSnapshot.empty) {
          console.log("No teacher found for the current user");
          setClasses([]);
          return;
        }
        
        const teacherDoc = teacherSnapshot.docs[0];
        const teacherData = teacherDoc.data();
        
        // Get the assigned classes for this teacher
        const teacherClassRefs = teacherData.classes || [];
        
        if (teacherClassRefs.length === 0) {
          console.log("No classes assigned to this teacher");
          setClasses([]);
          return;
        }
        
        // Convert class references to document data
        const classPromises = teacherClassRefs.map(async (classRef: any) => {
          const classSnap = await getDoc(classRef);
          if (classSnap.exists()) {
            const data = classSnap.data() as any;
            return { id: classSnap.id, ...data };
          }
          return null;
        });
        
        const classesData = (await Promise.all(classPromises)).filter(Boolean);
        setClasses(classesData);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setError("Failed to load classes. Please try again.");
      } finally {
        setLoadingClasses(false);
      }
    }
    fetchClasses();
  }, []);

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
        
        // Get teacher document to fetch assigned subjects
        const teacherQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));
        const teacherSnapshot = await getDocs(teacherQuery);
        
        if (teacherSnapshot.empty) {
          console.log("No teacher found for the current user");
          setSubjects([]);
          return;
        }
        
        const teacherDoc = teacherSnapshot.docs[0];
        const teacherData = teacherDoc.data();
        
        // Get the assigned subjects for this teacher
        const teacherSubjectRefs = teacherData.subjects || [];
        
        if (teacherSubjectRefs.length === 0) {
          console.log("No subjects assigned to this teacher");
          setSubjects([]);
          return;
        }
        
        // Convert subject references to document IDs
        const teacherSubjectIds = teacherSubjectRefs.map((ref: any) => ref.path.split('/').pop());
        
        // Get the class reference
        const classRef = doc(db, "classes", filterClass);
        
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
        
        setSubjects(subjectsData);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setError("Failed to load subjects. Please try again.");
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
        
        // Get teacher document to fetch assigned subjects
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

  // Helper function to format file size
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Fetch videos for the logged-in teacher
  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      setError(null);
      try {
        const user = auth.currentUser;
        if (!user) return;
        
        // Get teacher document to ensure proper permissions
        const teacherQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));
        const teacherSnapshot = await getDocs(teacherQuery);
        
        if (teacherSnapshot.empty) {
          setVideos([]);
          setError("Teacher record not found");
          return;
        }
        
        const teacherDoc = teacherSnapshot.docs[0];
        const teacherData = teacherDoc.data();
        const schoolID = teacherData.schoolId;
        
        if (!schoolID) {
          setVideos([]);
          setError("School ID not found in teacher record");
          return;
        }
        
        // Fetch videos by classId (teacher's assigned classes) to include legacy docs
        const teacherClasses: any[] = teacherData.classes || [];
        
        // If a specific class is selected, single query path
        if (filterClass) {
          let q = query(
            collection(db, "contents"),
            where("video", "==", true),
            where("classId", "==", doc(db, "classes", filterClass))
          );
          if (filterSubject) {
            q = query(q, where("subjectId", "==", doc(db, "subjects", filterSubject)));
          }
          const snap = await getDocs(q);
          const videosData = await Promise.all(
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
                videoUrl: d.url || "#",
                fileType: d.fileType || 'Video',
                fileSize: d.fileSize ? formatFileSize(d.fileSize) : ''
              };
            })
          );
          setVideos(videosData);
        } else {
          // No class filter: query by teacher's assigned classes in batches of 10 (Firestore 'in' limit)
          if (!teacherClasses.length) {
            setVideos([]);
            return;
          }
          const CHUNK = 10;
          const results: any[] = [];
          for (let i = 0; i < teacherClasses.length; i += CHUNK) {
            const chunk = teacherClasses.slice(i, i + CHUNK);
            let q = query(
              collection(db, "contents"),
              where("video", "==", true),
              where("classId", "in", chunk)
            );
            if (filterSubject) {
              q = query(q, where("subjectId", "==", doc(db, "subjects", filterSubject)));
            }
            const snap = await getDocs(q);
            results.push(...snap.docs);
          }
          // Deduplicate results and map
          const seen = new Set<string>();
          const uniqueDocs = results.filter((d: any) => {
            if (seen.has(d.id)) return false;
            seen.add(d.id);
            return true;
          });
          const videosData = await Promise.all(
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
                videoUrl: d.url || "#",
                fileType: d.fileType || 'Video',
                fileSize: d.fileSize ? formatFileSize(d.fileSize) : ''
              };
            })
          );
          setVideos(videosData);
        }
      } catch (e) {
        console.error("Error fetching videos:", e);
        setError("Failed to fetch videos. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [filterClass, filterSubject]);

  // Filtered videos
  const filteredVideos = videos.filter((video: any) => {
    if (filterClass && video.className !== (classes.find((c: any) => c.id === filterClass)?.name || "")) return false;
    if (filterSubject && video.subjectName !== (subjects.find((s: any) => s.id === filterSubject)?.name || "")) return false;
    return true;
  });

  // Handle video upload
  const handleUpload = async () => {
    setUploadError(null);
    
    // Validate form
    if (!title || !description || !selectedClass || !selectedSubject || (!file && !youtubeUrl)) {
      setUploadError("Please fill all required fields and either upload a file or provide a YouTube URL.");
      return;
    }
    
    // Validate that the selected subject belongs to the teacher
    const isSubjectValid = uploadSubjects.some((sub: any) => sub.id === selectedSubject);
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
      
      let videoUrl = youtubeUrl;
      let fileType = 'youtube';
      let fileSize = 0;
      let fileName = '';
      
      // Handle file upload if a file is provided
      if (file) {
        // Generate a unique filename
        const fileExtension = file.name.split('.').pop();
        fileName = `videos/${user.uid}/${Date.now()}.${fileExtension}`;
        const storageRef = ref(storage, fileName);
        
        // Upload the file
        const uploadTask = await uploadBytes(storageRef, file);
        videoUrl = await getDownloadURL(uploadTask.ref);
        fileType = file.type || 'video/mp4';
        fileSize = file.size;
      }
      
      // Add video metadata to Firestore
      await addDoc(collection(db, "contents"), {
        title,
        description,
        url: videoUrl,
        createdBy: doc(db, "teachers", teacherDoc.id),
        createdAt: serverTimestamp(),
        classId: doc(db, "classes", selectedClass),
        subjectId: doc(db, "subjects", selectedSubject),
        schoolId: schoolID,
        video: true,
        fileType,
        fileSize,
        fileName: file ? file.name : 'YouTube Video',
        youtubeUrl: youtubeUrl || null
      });
      
      // Reset form and close modal
      setTitle("");
      setDescription("");
      setSelectedClass("");
      setSelectedSubject("");
      setFile(null);
      setYoutubeUrl("");
      setShowModal(false);
      
      // Refresh the videos list
      setLoading(true);
      const q = query(
        collection(db, "contents"),
        where("video", "==", true),
        where("createdBy", "==", doc(db, "teachers", teacherDoc.id))
      );
      
      const snap = await getDocs(q);
      const videosData = await Promise.all(
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
            videoUrl: d.url || "#",
            fileType: d.fileType || 'Video',
            fileSize: d.fileSize ? formatFileSize(d.fileSize) : '',
            youtubeUrl: d.youtubeUrl || ''
          };
        })
      );
      
      setVideos(videosData);
      setLoading(false);
      
    } catch (error: any) {
      console.error("Error uploading video:", error);
      setUploadError(error.message || "Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Prevent hydration mismatch: only render after client mount
  if (!hasMounted) return null;

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <ContentSidebar />
      <main className="flex-1 bg-gray-50 p-10">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Video Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Videos Count */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow flex flex-col items-center border border-gray-100">
            <div className="text-4xl font-bold text-blue-700 mb-2">{loading ? "-" : filteredVideos.length}</div>
            <div className="text-gray-600">Total Videos Uploaded</div>
          </div>
          {/* Upload New Video */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow flex flex-col items-center border border-gray-100">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition text-lg mb-2" onClick={() => setShowModal(true)}>Upload New Video</button>
            <div className="text-gray-600">Upload video lectures for your classes.</div>
          </div>
        </div>
        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <select
            value={filterClass}
            onChange={e => {
              setFilterClass(e.target.value);
              setFilterSubject("");
            }}
            className="border rounded px-3 py-2"
            disabled={loadingClasses}
          >
            <option value="">All Classes</option>
            {classes.map((cls: any) => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
          {filterClass && (
            <select
              value={filterSubject}
              onChange={e => setFilterSubject(e.target.value)}
              className="border rounded px-3 py-2"
              disabled={loadingSubjects}
            >
              <option value="">All Subjects</option>
              {subjects.length === 0 && <option disabled>No subjects found for this class</option>}
              {subjects.map((sub: any) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          )}
        </div>
        {/* Videos List */}
        <div>
          {loading ? (
            <div className="text-center text-gray-500">Loading videos...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center text-gray-500">No videos found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVideos.map((video: any) => (
                <div key={video.id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-gray-100">
                  <div className="font-bold text-blue-700 text-lg">{video.title}</div>
                  <div className="text-gray-600">{video.description}</div>
                  <div className="text-gray-500 text-sm">Class: <span className="font-medium">{video.className}</span></div>
                  <div className="text-gray-500 text-sm">Subject: <span className="font-medium">{video.subjectName}</span></div>
                  <div>
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View/Download Video</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Upload Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button
                type="button"
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none z-30"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              {uploading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center z-20">
                  <svg className="animate-spin h-8 w-8 text-blue-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <div className="text-blue-700 font-semibold">Uploading...</div>
                </div>
              )}
              <div className="text-xl font-bold mb-4">Upload New Video</div>
              {uploadError && (
                <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm border border-red-200">{uploadError}</div>
              )}
              <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Class</label>
                  <select
                    className="border rounded px-3 py-2 w-full"
                    value={selectedClass}
                    onChange={e => {
                      setSelectedClass(e.target.value);
                      setSelectedSubject("");
                    }}
                    disabled={loadingClasses}
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls: any) => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Subject</label>
                  {selectedClass && (
                    <select
                      className="border rounded px-3 py-2 w-full"
                      value={selectedSubject}
                      onChange={e => setSelectedSubject(e.target.value)}
                      disabled={!selectedClass || loadingUploadSubjects}
                    >
                      <option value="">Select Subject</option>
                      {uploadSubjects.length === 0 && <option disabled>No subjects found for this class</option>}
                      {uploadSubjects.map((sub: any) => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Title</label>
                  <input
                    className="border rounded px-3 py-2 w-full"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Description</label>
                  <textarea
                    className="border rounded px-3 py-2 w-full"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Video Upload</label>
                  <div className="mb-2">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={e => setFile(e.target.files?.[0] || null)}
                      className="w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                      required={!youtubeUrl}
                    />
                  </div>
                  <div className="text-center text-gray-500 text-sm mb-2">OR</div>
                  <div>
                    <label className="block text-gray-700 mb-1">YouTube URL</label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYoutubeUrl(e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm"
                      required={!file}
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter a valid YouTube URL</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload Video'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
