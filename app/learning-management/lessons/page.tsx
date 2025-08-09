"use client";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebaseClient";
import { useAuth } from "../../contexts/AuthContext";
import LearningManagementSidebar from "../components/LearningManagementSidebar";
import LessonForm from "../../components/forms/LessonForm";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faBook,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

interface Lesson {
  id: string;
  name: string;
  description: string;
  content: string;
  subjectId: string;
  chapterId: string;
  orderIndex: number;
  createdAt: any;
  updatedAt?: any;
}

interface LessonWithDetails extends Lesson {
  subjectName: string;
  chapterName: string;
}

export default function LessonManagementPage() {
  const { schoolId, user, loading: authLoading } = useAuth();
  const [lessons, setLessons] = useState<LessonWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string>("");

  // Teacher scope state
  interface ClassData { id: string; name: string }
  interface Subject { id: string; name: string }
  const [teacherClasses, setTeacherClasses] = useState<ClassData[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [teacherSubjectIds, setTeacherSubjectIds] = useState<string[]>([]);

  useEffect(() => {
    console.log("AuthContext state:", { schoolId, authLoading, user: user?.uid });
    if (!authLoading) {
      // Kick off teacher scope fetches
      fetchTeacherClasses();
      if (user?.uid) {
        getTeacherSubjectIds(user.uid).then(setTeacherSubjectIds).catch(() => setTeacherSubjectIds([]));
      }
    }
  }, [schoolId, authLoading, user?.uid]);

  // Fetch teacher's assigned classes
  async function fetchTeacherClasses() {
    const uid = user?.uid;
    if (!uid) return;
    try {
      const teacherQuery = query(collection(db, "teachers"), where("userId", "==", uid));
      const teacherSnapshot = await getDocs(teacherQuery);
      if (!teacherSnapshot.empty) {
        const teacherData = teacherSnapshot.docs[0].data() as any;
        if (teacherData.classes?.length > 0) {
          const classPromises = teacherData.classes.map(async (classRef: any) => {
            try {
              const classDoc = typeof classRef?.path === 'string' ? await getDoc(doc(db, classRef.path)) : await getDoc(classRef);
              if (classDoc.exists()) {
                const classData = classDoc.data() as any;
                return { id: classDoc.id, name: classData?.name || 'Unnamed Class' } as ClassData;
              }
              return null;
            } catch {
              return null;
            }
          });
          const classDocs = await Promise.all(classPromises);
          const valid = classDocs.filter((c): c is ClassData => !!c);
          setTeacherClasses(valid);
          if (valid.length > 0) setSelectedClass(valid[0].id);
        }
      }
    } catch (e) {
      console.error("Error fetching teacher classes:", e);
    }
  }

  // Fetch teacher subject ids
  const getTeacherSubjectIds = async (userId: string): Promise<string[]> => {
    try {
      const teacherQuery = query(collection(db, "teachers"), where("userId", "==", userId));
      const teacherSnapshot = await getDocs(teacherQuery);
      if (!teacherSnapshot.empty) {
        const t = teacherSnapshot.docs[0].data() as any;
        if (t.subjects?.length > 0) {
          return t.subjects.map((subjRef: any) => {
            if (typeof subjRef === 'string') return subjRef.split('/').pop();
            if (subjRef?.path) return subjRef.path.split('/').pop();
            return '';
          }).filter(Boolean);
        }
      }
      return [];
    } catch (e) {
      console.error("Error fetching teacher subjects:", e);
      return [];
    }
  };

  // Subjects for selected class (filtered to teacher, with admin-like fallback)
  useEffect(() => {
    async function fetchSubjectsForClass() {
      try {
        setSubjects([]);
        setSelectedSubject("");
        if (!selectedClass) return;
        const baseConstraint = where("assClass", "array-contains", doc(db, "classes", selectedClass));
        const qAll = query(collection(db, "subjects"), baseConstraint);
        const snap = await getDocs(qAll);
        const allSubjects: Subject[] = snap.docs.map(d => ({ id: d.id, name: (d.data() as any)?.name || "Unnamed Subject" }));
        let collected: Subject[] = allSubjects;
        if (teacherSubjectIds.length > 0) {
          const allow = new Set(teacherSubjectIds);
          const filtered = allSubjects.filter(s => allow.has(s.id));
          collected = filtered.length > 0 ? filtered : allSubjects; // fallback
        }
        const seen = new Set<string>();
        const unique = collected.filter(s => { if (seen.has(s.id)) return false; seen.add(s.id); return true; }).sort((a, b) => a.name.localeCompare(b.name));
        setSubjects(unique);
        if (unique.length > 0) setSelectedSubject(unique[0].id);
      } catch (e) {
        console.error("Error fetching subjects for class:", e);
      }
    }
    fetchSubjectsForClass();
  }, [selectedClass, teacherSubjectIds]);

  // When selection is ready, fetch lessons automatically
  useEffect(() => {
    if (!authLoading && selectedClass && (selectedSubject || subjects.length > 0)) {
      fetchLessons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, selectedClass, selectedSubject, subjects.length]);

  const fetchLessons = async () => {
    if (!selectedClass) return;

    console.log("Fetching lessons for teacher scope:", { schoolId, selectedClass, selectedSubject, subjectsCount: subjects.length });
    setLoading(true);
    setError("");
    
    try {
      // subject scope
      let subjectIds: string[] = [];
      if (selectedSubject) subjectIds = [selectedSubject];
      else if (subjects.length > 0) subjectIds = subjects.map(s => s.id);
      else {
        setLessons([]);
        setLoading(false);
        return;
      }

      // Build both ref and string queries (batched by 10)
      const subjectRefs = subjectIds.map(id => doc(db, "subjects", id));
      const chunkBy10 = <T,>(arr: T[]): T[][] => { const out: T[][] = []; for (let i=0;i<arr.length;i+=10) out.push(arr.slice(i,i+10)); return out; };
      const refChunks = chunkBy10(subjectRefs);
      const idChunks = chunkBy10(subjectIds);

      const refResults = await Promise.all(refChunks.map(async (chunk) => {
        const qRef = query(collection(db, "lessons"), where("subjectId", "in", chunk));
        const snap = await getDocs(qRef);
        return snap.docs;
      }));
      const idResults = await Promise.all(idChunks.map(async (chunk) => {
        const qIds = query(collection(db, "lessons"), where("subjectId", "in", chunk));
        const snap = await getDocs(qIds);
        return snap.docs;
      }));

      // Additionally, fetch lessons by chapter linkage: chapters where subjectId in selected subjects
      const chapterRefResults = await Promise.all(refChunks.map(async (chunk) => {
        const qChRef = query(collection(db, "chapters"), where("subjectId", "in", chunk));
        const snap = await getDocs(qChRef);
        return snap.docs;
      }));
      const chapterIdResults = await Promise.all(idChunks.map(async (chunk) => {
        const qChIds = query(collection(db, "chapters"), where("subjectId", "in", chunk));
        const snap = await getDocs(qChIds);
        return snap.docs;
      }));
      const chapterDocs = [...chapterRefResults.flat(), ...chapterIdResults.flat()];
      const chapterIds = chapterDocs.map(d => d.id);
      const chapterIdRefs = chapterDocs.map(d => doc(db, "chapters", d.id));
      const chIdChunks = chunkBy10(chapterIds);
      const chRefChunks = chunkBy10(chapterIdRefs);
      const lessonByChapterIdResults = await Promise.all(chIdChunks.map(async (chunk) => {
        if (chunk.length === 0) return [] as any[];
        const qL = query(collection(db, "lessons"), where("chapterId", "in", chunk));
        const snap = await getDocs(qL);
        return snap.docs;
      }));
      const lessonByChapterRefResults = await Promise.all(chRefChunks.map(async (chunk) => {
        if (chunk.length === 0) return [] as any[];
        const qL = query(collection(db, "lessons"), where("chapterId", "in", chunk));
        const snap = await getDocs(qL);
        return snap.docs;
      }));

      const mapDocs = new Map<string, any>();
      [...refResults.flat(), ...idResults.flat(), ...lessonByChapterIdResults.flat(), ...lessonByChapterRefResults.flat()].forEach(d => mapDocs.set(d.id, d));
      const lessonsDocs = Array.from(mapDocs.values());
      console.log("Lessons found:", lessonsDocs.length);
      
      const lessonPromises = lessonsDocs.map(async (lessonDoc) => {
        const lessonData = lessonDoc.data();
        const lesson: Lesson = {
          id: lessonDoc.id,
          name: lessonData.name,
          description: lessonData.description || "",
          content: lessonData.content || "",
          subjectId: lessonData.subjectId?.id || lessonData.subjectId,
          chapterId: lessonData.chapterId?.id || lessonData.chapterId,
          orderIndex: lessonData.orderIndex || 0,
          createdAt: lessonData.createdAt,
          updatedAt: lessonData.updatedAt,
        };

        // Fetch subject name
        let subjectName = lesson.subjectId;
        try {
          if (lesson.subjectId) {
            const subjectDoc = await getDoc(doc(db, "subjects", lesson.subjectId));
            if (subjectDoc.exists()) {
              subjectName = subjectDoc.data().name;
            }
          }
        } catch (error) {
          console.error("Error fetching subject name:", error);
        }

        // Fetch chapter name
        let chapterName = lesson.chapterId;
        try {
          if (lesson.chapterId) {
            const chapterDoc = await getDoc(doc(db, "chapters", lesson.chapterId));
            if (chapterDoc.exists()) {
              chapterName = chapterDoc.data().name;
            }
          }
        } catch (error) {
          console.error("Error fetching chapter name:", error);
        }

        return {
          ...lesson,
          subjectName: subjectName || "Unknown Subject",
          chapterName: chapterName || "Unknown Chapter",
        };
      });

      const lessonsWithDetails = await Promise.all(lessonPromises);
      // Sort by subject name, then by chapter name, then by order index
      lessonsWithDetails.sort((a: LessonWithDetails, b: LessonWithDetails) => {
        const subjectNameA = a.subjectName || "Unknown Subject";
        const subjectNameB = b.subjectName || "Unknown Subject";
        
        if (subjectNameA !== subjectNameB) {
          return subjectNameA.localeCompare(subjectNameB);
        }
        if (a.chapterName !== b.chapterName) {
          return a.chapterName.localeCompare(b.chapterName);
        }
        return a.orderIndex - b.orderIndex;
      });
      setLessons(lessonsWithDetails);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      setError("Failed to load lessons. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "lessons", lessonId));
      setLessons(lessons.filter(lesson => lesson.id !== lessonId));
    } catch (error) {
      console.error("Error deleting lesson:", error);
      setError("Failed to delete lesson");
    }
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingLesson(null);
    fetchLessons();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingLesson(null);
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // Show error if no school ID
  if (!schoolId) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <LearningManagementSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-4xl mb-4" />
              <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
              <p className="text-red-600 mb-4">
                You don't have permission to access this page. Please ensure you're logged in as a school administrator or teacher.
              </p>
              <button
                onClick={() => window.location.href = "/login"}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LearningManagementSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Lesson Management</h1>
              <p className="text-gray-600">Manage lessons within chapters</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Lesson
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <span>{error}</span>
              </div>
              <button
                onClick={() => fetchLessons()}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try Again
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <LoadingSpinner size="large" />
                <p className="mt-4 text-gray-600">Loading lessons...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lesson Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chapter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lessons.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faBook} className="text-4xl text-gray-300 mb-4" />
                            <p className="text-lg font-medium mb-2">No lessons found</p>
                            <p className="text-sm">Create your first lesson to get started</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      lessons.map((lesson) => (
                        <tr key={lesson.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {lesson.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {lesson.subjectName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {lesson.chapterName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                              {lesson.description || "No description"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {lesson.orderIndex}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {lesson.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditLesson(lesson)}
                                className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                                title="Edit lesson"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                onClick={() => handleDeleteLesson(lesson.id)}
                                className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                                title="Delete lesson"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6">
              <LessonForm
                lessonId={editingLesson?.id}
                initialData={editingLesson ? {
                  name: editingLesson.name,
                  description: editingLesson.description,
                  content: editingLesson.content,
                  subjectId: editingLesson.subjectId,
                  chapterId: editingLesson.chapterId,
                  orderIndex: editingLesson.orderIndex,
                } : undefined}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 