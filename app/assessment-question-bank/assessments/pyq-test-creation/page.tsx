"use client";
import * as React from "react";
import Sidebar from "../../components/Sidebar";
import { db, auth } from "@/lib/firebaseClient";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function CreatePyqTestPage() {
  const router = useRouter();
  const [testName, setTestName] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [selectedClass, setSelectedClass] = React.useState("");
  const [classes, setClasses] = React.useState<{ id: string; name: string }[]>([]);
  const [loadingClasses, setLoadingClasses] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<{ [k: string]: string }>({});
  // Added for Assign To & Total Questions
  const [studentMode, setStudentMode] = React.useState<"whole" | "selective">("whole");
  const [showStudentModal, setShowStudentModal] = React.useState(false);
  const [students, setStudents] = React.useState<Array<{ id: string; name: string; email?: string; rollNumber?: string }>>([]);
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);
  const [loadingStudents, setLoadingStudents] = React.useState(false);
  const [totalQuestions, setTotalQuestions] = React.useState<number>(0);
  const [userSchoolId, setUserSchoolId] = React.useState<string | null>(null);

  // Helper to extract school ID from DocumentReference or path
  const extractSchoolId = (schoolRef: any): string | null => {
    if (!schoolRef) return null;
    if (typeof schoolRef === 'string') {
      const parts = schoolRef.split('/');
      return parts[parts.length - 1] || null;
    }
    if (schoolRef.path) {
      const parts = schoolRef.path.split('/');
      return parts[parts.length - 1] || null;
    }
    if (schoolRef.id) return schoolRef.id as string;
    return null;
  };

  React.useEffect(() => {
    let unsubscribe: any;
    setLoadingClasses(true);
    unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        // Fetch user to get schoolId (needed for student queries)
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        if (userData?.schoolId) {
          setUserSchoolId(extractSchoolId(userData.schoolId));
        }

        const teacherQ = query(collection(db, "teachers"), where("userId", "==", user.uid));
        const teacherSnap = await getDocs(teacherQ);
        if (teacherSnap.empty) {
          setClasses([]);
        } else {
          const teacherDoc = teacherSnap.docs[0];
          const teacherData: any = teacherDoc.data();
          const teacherClassRefs = teacherData.classes || [];
          if (!teacherClassRefs.length) {
            setClasses([]);
          } else {
            const classPromises = teacherClassRefs.map(async (classRef: any) => {
              try {
                const ref = classRef?.path
                  ? classRef
                  : classRef?.id
                  ? doc(db, "classes", classRef.id)
                  : typeof classRef === "string"
                  ? (() => {
                      const last = (classRef as string).split("/").pop();
                      return last ? doc(db, "classes", last) : null;
                    })()
                  : null;
                if (!ref) return null;
                const classSnap = await getDoc(ref);
                if (classSnap.exists()) {
                  const data = classSnap.data() as any;
                  return { id: classSnap.id, name: data.name };
                }
              } catch {}
              return null;
            });
            const resolved = (await Promise.all(classPromises)).filter(Boolean) as { id: string; name: string }[];
            setClasses(resolved);
          }
        }
      } catch (e) {
        console.error("Error loading classes:", e);
        setClasses([]);
      } finally {
        setLoadingClasses(false);
      }
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  // Fetch students for selected class when in selective mode
  React.useEffect(() => {
    if (studentMode === 'selective' && selectedClass && userSchoolId) {
      setShowStudentModal(true);
      setLoadingStudents(true);
      fetchStudentsForClass();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentMode, selectedClass, userSchoolId]);

  const fetchStudentsForClass = async () => {
    if (!selectedClass || !userSchoolId) return;
    try {
      const studentsQuery = query(
        collection(db, "students"),
        where("classId", "==", doc(db, "classes", selectedClass)),
        where("schoolId", "==", doc(db, "school", userSchoolId)),
        where("isActive", "==", true)
      );
      const studentSnap = await getDocs(studentsQuery);
      const list: Array<{ id: string; name: string; email?: string; rollNumber?: string }> = [];
      studentSnap.forEach((s) => {
        const d = s.data() as any;
        list.push({ id: s.id, name: d.name || 'Unknown', email: d.email || '', rollNumber: d.rollNumber || '' });
      });
      setStudents(list);
    } catch (e) {
      console.error('Error fetching students:', e);
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) => prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]);
  };

  const closeStudentModal = () => {
    setShowStudentModal(false);
    if (selectedStudents.length === 0) setStudentMode('whole');
  };

  const validate = () => {
    const e: any = {};
    if (!testName.trim()) e.testName = "Test name is required";
    if (!startTime) e.startTime = "Start time is required";
    if (!endTime) e.endTime = "End time is required";
    if (!selectedClass) e.selectedClass = "Please choose a class";
    if (!studentMode) e.studentMode = "Assign To is required";
    if (studentMode === 'selective' && selectedStudents.length === 0) e.selectedStudents = "Select at least one student";
    if (!totalQuestions || totalQuestions < 1) e.totalQuestions = "Total questions must be greater than 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // TODO: Implement PYQ test creation persist logic
      router.push("/assessment-question-bank/assessments/manage-tests");
    } catch (e) {
      console.error("Submit failed:", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-2xl mb-8">
          <h1 className="text-3xl lg:text-4xl font-light text-slate-800 mb-2 tracking-tight">Create PYQ Test</h1>
          <p className="text-slate-500 font-light">Create a practice test using previous year questions</p>
        </div>

        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          <div className="p-8 lg:p-10">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 mb-3">Test Name</label>
                <input
                  className={`w-full bg-slate-50/50 border-2 ${errors.testName ? 'border-red-300' : 'border-slate-200/50'} rounded-2xl px-4 py-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:bg-white/80 transition-all duration-200 font-light text-lg`}
                  placeholder="Enter test name"
                  value={testName}
                  onChange={e => setTestName(e.target.value)}
                />
                {errors.testName && <p className="text-sm text-red-500">{errors.testName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Start Time</label>
                  <input
                    type="datetime-local"
                    className={`w-full bg-slate-50/50 border-2 ${errors.startTime ? 'border-red-300' : 'border-slate-200/50'} rounded-2xl px-4 py-4 text-slate-800 focus:outline-none focus:border-blue-300 focus:bg-white/80 transition-all duration-200 font-light text-lg`}
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                  />
                  {errors.startTime && <p className="text-sm text-red-500">{errors.startTime}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 mb-3">End Time</label>
                  <input
                    type="datetime-local"
                    className={`w-full bg-slate-50/50 border-2 ${errors.endTime ? 'border-red-300' : 'border-slate-200/50'} rounded-2xl px-4 py-4 text-slate-800 focus:outline-none focus:border-blue-300 focus:bg-white/80 transition-all duration-200 font-light text-lg`}
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                  />
                  {errors.endTime && <p className="text-sm text-red-500">{errors.endTime}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 mb-3">Select Class</label>
                <select
                  className={`w-full bg-slate-50/50 border-2 ${errors.selectedClass ? 'border-red-300' : 'border-slate-200/50'} rounded-2xl px-4 py-4 text-slate-800 focus:outline-none focus:border-blue-300 focus:bg-white/80 transition-all duration-200 font-light text-lg`}
                  value={selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  disabled={loadingClasses}
                >
                  <option value="">Choose a class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
                {errors.selectedClass && <p className="text-sm text-red-500">{errors.selectedClass}</p>}
              </div>

              {/* Assign To */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">Assign To</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 bg-slate-50/30 hover:bg-slate-50/50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-transparent hover:border-slate-200/50">
                    <input
                      type="radio"
                      name="studentMode"
                      value="whole"
                      checked={studentMode === "whole"}
                      onChange={() => setStudentMode("whole")}
                      className="w-5 h-5 text-blue-400 bg-transparent border-2 border-slate-300 focus:ring-blue-300 focus:ring-2"
                    />
                    <span className="text-slate-700 font-light">Whole Class</span>
                  </label>
                  <label className={`flex items-center gap-3 p-4 bg-slate-50/30 hover:bg-slate-50/50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-transparent hover:border-slate-200/50 ${
                    !selectedClass ? 'opacity-50 pointer-events-none' : ''
                  }`}>
                    <input
                      type="radio"
                      name="studentMode"
                      value="selective"
                      checked={studentMode === "selective"}
                      onChange={() => selectedClass && setStudentMode("selective")}
                      className="w-5 h-5 text-blue-400 bg-transparent border-2 border-slate-300 focus:ring-blue-300 focus:ring-2"
                      disabled={!selectedClass}
                    />
                    <span className="text-slate-700 font-light">Selective Students</span>
                  </label>
                </div>
                {studentMode === "selective" && (
                  <div className="flex justify-end">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-light bg-blue-100/50 text-blue-600">
                      {selectedStudents.length} students selected
                    </span>
                  </div>
                )}
                {errors.selectedStudents && (
                  <p className="text-red-400 text-sm font-light">{errors.selectedStudents}</p>
                )}
              </div>

              {/* Total Questions */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 mb-3">Total Questions</label>
                <input
                  type="number"
                  className={`w-full bg-slate-50/50 border-2 ${
                    errors.totalQuestions ? 'border-red-300' : 'border-slate-200/50'
                  } rounded-2xl px-4 py-4 text-slate-800 placeholder-slate-400 
                  focus:outline-none focus:border-blue-300 focus:bg-white/80 
                  transition-all duration-200 font-light text-lg`}
                  placeholder="Enter number of questions"
                  value={totalQuestions}
                  onChange={e => setTotalQuestions(Number(e.target.value))}
                  min={1}
                />
                {errors.totalQuestions && (
                  <p className="text-red-400 text-sm font-light mt-2">{errors.totalQuestions}</p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50">Cancel</button>
                <button type="submit" disabled={submitting} className="px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">{submitting ? 'Creating...' : 'Create PYQ Test'}</button>
              </div>
            </form>
          </div>
        </div>
        {/* Student selection modal */}
        {showStudentModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeStudentModal();
            }}
          >
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-medium text-slate-800">Select Students</h3>
                <button
                  type="button"
                  onClick={closeStudentModal}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-hidden">
                {loadingStudents ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-400 border-t-transparent"></div>
                  </div>
                ) : students.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 font-light">
                    No students found in this class.
                  </div>
                ) : (
                  <div className="overflow-y-auto max-h-96 p-6">
                    <div className="space-y-3">
                      {students.map((student) => (
                        <label
                          key={student.id}
                          className="flex items-center gap-4 p-4 bg-slate-50/30 hover:bg-slate-50/50 rounded-2xl cursor-pointer transition-all duration-200 border-2 border-transparent hover:border-slate-200/30"
                        >
                          <input
                            type="checkbox"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleStudentSelection(student.id)}
                            className="w-5 h-5 text-blue-400 bg-transparent border-2 border-slate-300 rounded focus:ring-blue-300 focus:ring-2"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-slate-800 font-medium truncate">{student.name}</div>
                            <div className="text-sm text-slate-500 font-light">
                              {student.rollNumber} {student.email && `• ${student.email}`}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                <span className="text-slate-600 text-sm font-light">
                  {selectedStudents.length} students selected
                </span>
                <button
                  type="button"
                  onClick={closeStudentModal}
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:from-blue-500 hover:to-purple-500"
                >
                  Save Selection
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
