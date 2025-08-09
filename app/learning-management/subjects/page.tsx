"use client";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebaseClient";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../../components/firebase";
import LearningManagementSidebar from "../components/LearningManagementSidebar";
import SubjectForm from "../../components/forms/SubjectForm";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faBookOpen,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

interface Subject {
  id: string;
  name: string;
  description: string;
  image: string;
  assClass: string[];
  createdAt: any;
  updatedAt?: any;
}

interface SubjectWithDetails extends Subject {
  classNames: string[];
}

export default function SubjectManagementPage() {
  const { schoolId, loading: authLoading } = useAuth();
  const [subjects, setSubjects] = useState<SubjectWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    console.log("AuthContext state:", { schoolId, authLoading });
    
    if (!authLoading) {
      if (schoolId) {
        fetchSubjects();
      } else {
        setError("School ID not found. Please ensure you're logged in as a school administrator or teacher.");
        setLoading(false);
      }
    }
  }, [schoolId, authLoading]);

  const fetchSubjects = async () => {
    if (!schoolId) return;

    console.log("Fetching subjects (teacher-scoped if applicable) for school:", schoolId);
    setLoading(true);
    setError("");

    try {
      const user = auth.currentUser;
      let isTeacher = false;
      let teacherSubjectIds: string[] = [];
      let teacherClassIds: string[] = [];

      if (user) {
        // Try to resolve teacher document
        const tQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));
        const tSnap = await getDocs(tQuery);
        if (!tSnap.empty) {
          isTeacher = true;
          const tData = tSnap.docs[0].data();
          // subjects can be refs or strings
          teacherSubjectIds = (tData.subjects || [])
            .map((ref: any) => {
              if (!ref) return null;
              if (typeof ref === "string") return ref.split("/").pop();
              if (ref?.path) return ref.path.split("/").pop();
              return ref?.id || null;
            })
            .filter(Boolean) as string[];
          // classes are refs; use id
          teacherClassIds = (tData.classes || [])
            .map((ref: any) => {
              if (!ref) return null;
              if (typeof ref === "string") return ref.split("/").pop();
              return ref?.id || (ref?.path ? ref.path.split("/").pop() : null);
            })
            .filter(Boolean) as string[];
        }
      }

      // Helper: chunk array for Firestore 'in' constraint (max 10)
      const chunk = <T,>(arr: T[], size: number) => {
        const out: T[][] = [];
        for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
        return out;
      };

      let collected: SubjectWithDetails[] = [];

      // If teacher exists but has no subjects assigned, show empty list
      if (isTeacher && teacherSubjectIds.length === 0) {
        setSubjects([]);
        return;
      }

      if (isTeacher && teacherSubjectIds.length > 0) {
        // Teacher-scoped: fetch only assigned subjects, then intersect classes
        const idChunks = chunk(teacherSubjectIds, 10);
        for (const ids of idChunks) {
          const qSubj = query(
            collection(db, "subjects"),
            where("__name__", "in", ids)
          );
          const sSnap = await getDocs(qSubj);
          const items = await Promise.all(
            sSnap.docs.map(async (subjectDoc) => {
              const subjectData = subjectDoc.data() as any;
              const assClassRefs: any[] = subjectData.assClass || [];
              // Normalize class IDs from refs/strings
              const subjectClassIds: string[] = assClassRefs.map((ref: any) => {
                if (!ref) return null;
                if (typeof ref === "string") return ref.split("/").pop();
                return ref?.id || (ref?.path ? ref.path.split("/").pop() : null);
              }).filter(Boolean);

              // Keep only classes assigned to this teacher
              const visibleClassIds = subjectClassIds.filter((cid) => teacherClassIds.includes(cid));

              // Fetch class names for visible classes
              const classNames = await Promise.all(
                visibleClassIds.map(async (classId) => {
                  try {
                    const classDoc = await getDoc(doc(db, "classes", classId));
                    return classDoc.exists() ? (classDoc.data() as any).name : classId;
                  } catch (e) {
                    console.error("Error fetching class name:", e);
                    return classId;
                  }
                })
              );

              const subject: SubjectWithDetails = {
                id: subjectDoc.id,
                name: subjectData.name,
                description: subjectData.description || "",
                image: subjectData.image || "",
                assClass: visibleClassIds,
                createdAt: subjectData.createdAt,
                updatedAt: subjectData.updatedAt,
                classNames,
              };
              return subject;
            })
          );
          collected.push(...items);
        }

        // Optionally, filter out subjects with no visible classes
        collected = collected.filter((s) => s.assClass.length > 0);
      } else {
        // Admin/school-wide fallback: current behavior
        const subjectsQuery = query(
          collection(db, "subjects"),
          where("schoolId", "==", doc(db, "school", schoolId))
        );
        const subjectsSnapshot = await getDocs(subjectsQuery);

        const items = await Promise.all(
          subjectsSnapshot.docs.map(async (subjectDoc) => {
            const subjectData = subjectDoc.data() as any;
            const assClassRefs: any[] = subjectData.assClass || [];
            const subjectClassIds: string[] = assClassRefs.map((ref: any) => {
              if (!ref) return null;
              if (typeof ref === "string") return ref.split("/").pop();
              return ref?.id || (ref?.path ? ref.path.split("/").pop() : null);
            }).filter(Boolean);

            const classNames = await Promise.all(
              subjectClassIds.map(async (classId) => {
                try {
                  const classDoc = await getDoc(doc(db, "classes", classId));
                  return classDoc.exists() ? (classDoc.data() as any).name : classId;
                } catch (e) {
                  console.error("Error fetching class name:", e);
                  return classId;
                }
              })
            );

            const subject: SubjectWithDetails = {
              id: subjectDoc.id,
              name: subjectData.name,
              description: subjectData.description || "",
              image: subjectData.image || "",
              assClass: subjectClassIds,
              createdAt: subjectData.createdAt,
              updatedAt: subjectData.updatedAt,
              classNames,
            };
            return subject;
          })
        );
        collected = items;
      }

      setSubjects(collected);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setError("Failed to load subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubject = async (subjectId: string) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "subjects", subjectId));
      setSubjects(subjects.filter(subject => subject.id !== subjectId));
    } catch (error) {
      console.error("Error deleting subject:", error);
      setError("Failed to delete subject");
    }
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingSubject(null);
    fetchSubjects();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSubject(null);
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Subject Management</h1>
              <p className="text-gray-600">Manage subjects and their class assignments</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <span>{error}</span>
              </div>
              <button
                onClick={() => fetchSubjects()}
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
                <p className="mt-4 text-gray-600">Loading subjects...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Classes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subjects.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faBookOpen} className="text-4xl text-gray-300 mb-4" />
                            <p className="text-lg font-medium mb-2">No subjects found</p>
                            <p className="text-sm">Create your first subject to get started</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      subjects.map((subject) => (
                        <tr key={subject.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {subject.image && (
                                <img
                                  src={subject.image}
                                  alt={subject.name}
                                  className="h-10 w-10 rounded-full object-cover mr-3"
                                />
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {subject.name}
                                </div>
                                {subject.description && (
                                  <div className="text-sm text-gray-500 max-w-xs truncate">
                                    {subject.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {subject.classNames.length > 0 ? (
                                subject.classNames.map((className, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {className}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-500 text-sm">No classes assigned</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditSubject(subject)}
                                className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                                title="Edit subject"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                onClick={() => handleDeleteSubject(subject.id)}
                                className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                                title="Delete subject"
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
              <SubjectForm
                subjectId={editingSubject?.id}
                initialData={editingSubject ? {
                  name: editingSubject.name,
                  description: editingSubject.description,
                  image: editingSubject.image,
                  assClass: editingSubject.assClass,
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