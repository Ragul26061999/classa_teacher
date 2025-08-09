"use client";
import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc, serverTimestamp, query, where, getDocs, getDoc, documentId } from "firebase/firestore";
import { db } from "../../../lib/firebaseClient";
import { useAuth } from "../../contexts/AuthContext";
import FormCard from "../shared/FormCard";
import Input from "../shared/Input";
import Select from "../shared/Select";
import Button from "../shared/Button";
import LoadingSpinner from "../shared/LoadingSpinner";

interface LessonFormProps {
  lessonId?: string;
  initialData?: {
    name: string;
    description: string;
    content: string;
    subjectId: string;
    chapterId: string;
    orderIndex: number;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface SubjectOption {
  value: string;
  label: string;
}

interface ChapterOption {
  value: string;
  label: string;
}

export default function LessonForm({ lessonId, initialData, onSuccess, onCancel }: LessonFormProps) {
  const { user, schoolId } = useAuth();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    classId: "",
    subjectId: initialData?.subjectId || "",
    chapterId: initialData?.chapterId || "",
    orderIndex: initialData?.orderIndex || 1,
  });
  interface Option { value: string; label: string }
  const [classes, setClasses] = useState<Option[]>([]);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [chapters, setChapters] = useState<ChapterOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [teacherSubjectIds, setTeacherSubjectIds] = useState<string[]>([]);

  // Load teacher subject IDs for filtering
  useEffect(() => {
    const fetchTeacherSubjectIds = async () => {
      try {
        if (!user?.uid) { setTeacherSubjectIds([]); return; }
        const tQ = query(collection(db, "teachers"), where("userId", "==", user.uid));
        const tSnap = await getDocs(tQ);
        if (tSnap.empty) { setTeacherSubjectIds([]); return; }
        const t = tSnap.docs[0].data() as any;
        const ids: string[] = (t.subjects || []).map((ref: any) => {
          if (typeof ref === 'string') return ref.split('/').pop();
          if (ref?.path) return ref.path.split('/').pop();
          return undefined;
        }).filter(Boolean);
        setTeacherSubjectIds(ids);
      } catch (e) {
        console.error("Error fetching teacher subject ids:", e);
        setTeacherSubjectIds([]);
      }
    };
    fetchTeacherSubjectIds();
  }, [user?.uid]);

  // Fetch classes (teacher-scoped, fallback to all)
  useEffect(() => {
    const fetchClasses = async () => {
      if (!schoolId) return;
      setLoadingClasses(true);
      try {
        let classOptions: Option[] = [];
        if (user?.uid) {
          try {
            const teacherQ = query(collection(db, "teachers"), where("userId", "==", user.uid));
            const teacherSnap = await getDocs(teacherQ);
            if (!teacherSnap.empty) {
              const t = teacherSnap.docs[0].data() as any;
              const classRefs: any[] = t.classes || [];
              if (classRefs.length > 0) {
                const classDocs = await Promise.all(classRefs.map(async (ref: any) => {
                  try {
                    const path = typeof ref === 'string' ? ref : ref?.path;
                    if (!path) return null;
                    const cDoc = await getDoc(doc(db, path));
                    if (cDoc.exists()) {
                      const cData = cDoc.data() as any;
                      return { value: cDoc.id, label: cData?.name || 'Unnamed Class' } as Option;
                    }
                    return null;
                  } catch { return null; }
                }));
                classOptions = classDocs.filter((c): c is Option => !!c);
              }
            }
          } catch (e) {
            console.warn("Failed to fetch teacher classes, falling back to all classes.");
          }
        }
        if (classOptions.length === 0) {
          const qAll = query(collection(db, "classes"), where("schoolId", "==", doc(db, "school", schoolId)));
          const snap = await getDocs(qAll);
          classOptions = snap.docs.map(d => ({ value: d.id, label: (d.data() as any)?.name }));
        }
        setClasses(classOptions);
        if (!initialData?.subjectId && classOptions.length > 0 && !formData.classId) {
          setFormData(prev => ({ ...prev, classId: classOptions[0].value }));
        }
      } catch (e) {
        console.error("Error fetching classes:", e);
        setErrors(prev => ({ ...prev, classes: "Failed to load classes" }));
      } finally {
        setLoadingClasses(false);
      }
    };
    fetchClasses();
  }, [schoolId]);

  useEffect(() => {
    if (formData.subjectId) {
      fetchChapters(formData.subjectId);
    } else {
      setChapters([]);
      setFormData(prev => ({ ...prev, chapterId: "" }));
    }
  }, [formData.subjectId]);

  const chunkBy10 = <T,>(arr: T[]): T[][] => { const out: T[][] = []; for (let i=0;i<arr.length;i+=10) out.push(arr.slice(i,i+10)); return out; };

  // Fetch subjects for selected class, filtered by teacher subjects when available
  const fetchSubjectsForClass = async (classId: string) => {
    if (!schoolId || !classId) return;
    setLoadingSubjects(true);
    try {
      let collected: SubjectOption[] = [];
      if (teacherSubjectIds.length > 0) {
        const chunks = chunkBy10(teacherSubjectIds);
        for (const chunk of chunks) {
          const qy = query(
            collection(db, "subjects"),
            where("schoolId", "==", doc(db, "school", schoolId)),
            where("assClass", "array-contains", doc(db, "classes", classId)),
            where(documentId(), "in", chunk)
          );
          const snap = await getDocs(qy);
          const opts: SubjectOption[] = snap.docs.map(d => ({ value: d.id, label: (d.data() as any).name }));
          collected = [...collected, ...opts];
        }
      } else {
        const qy = query(
          collection(db, "subjects"),
          where("schoolId", "==", doc(db, "school", schoolId)),
          where("assClass", "array-contains", doc(db, "classes", classId))
        );
        const snap = await getDocs(qy);
        collected = snap.docs.map(d => ({ value: d.id, label: (d.data() as any).name }));
      }
      setSubjects(collected);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setErrors(prev => ({ ...prev, subjects: "Failed to load subjects" }));
    } finally {
      setLoadingSubjects(false);
    }
  };

  // On class change, refresh subjects
  useEffect(() => {
    if (formData.classId) {
      setFormData(prev => ({ ...prev, subjectId: "", chapterId: "" }));
      setChapters([]);
      fetchSubjectsForClass(formData.classId);
    } else {
      setSubjects([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.classId, schoolId, teacherSubjectIds]);

  // If editing, preselect class from subject's assigned classes
  useEffect(() => {
    const preselectClassFromSubject = async () => {
      try {
        if (!initialData?.subjectId || formData.classId) return;
        const sDoc = await getDoc(doc(db, "subjects", initialData.subjectId));
        if (sDoc.exists()) {
          const data = sDoc.data() as any;
          const ass = data?.assClass || [];
          if (ass.length > 0) {
            const firstPath = typeof ass[0] === 'string' ? ass[0] : ass[0]?.path;
            const classId = firstPath ? firstPath.split('/').pop() : "";
            if (classId) setFormData(prev => ({ ...prev, classId }));
          }
        }
      } catch (e) {
        console.warn("Could not preselect class from subject:", e);
      }
    };
    preselectClassFromSubject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?.subjectId]);

  const fetchChapters = async (subjectId: string) => {
    setLoadingChapters(true);
    try {
      const chaptersQuery = query(
        collection(db, "chapters"),
        where("subjectId", "==", doc(db, "subjects", subjectId)),
        where("schoolId", "==", doc(db, "school", schoolId!))
      );
      const chaptersSnapshot = await getDocs(chaptersQuery);
      
      const chapterOptions: ChapterOption[] = chaptersSnapshot.docs.map(doc => ({
        value: doc.id,
        label: doc.data().name
      }));
      
      setChapters(chapterOptions);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setErrors({ chapters: "Failed to load chapters" });
    } finally {
      setLoadingChapters(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Lesson name is required";
    }

    if (!formData.classId) {
      newErrors.classId = "Class is required";
    }

    if (!formData.subjectId) {
      newErrors.subjectId = "Subject is required";
    }

    if (!formData.chapterId) {
      newErrors.chapterId = "Chapter is required";
    }

    if (!schoolId) {
      newErrors.school = "School ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const lessonData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
        subjectId: doc(db, "subjects", formData.subjectId),
        chapterId: doc(db, "chapters", formData.chapterId),
        schoolId: doc(db, "school", schoolId!),
        orderIndex: formData.orderIndex,
        createdBy: doc(db, "users", user!.uid),
        ...(lessonId 
          ? { updatedAt: serverTimestamp() }
          : { createdAt: serverTimestamp() }
        ),
      };

      if (lessonId) {
        await updateDoc(doc(db, "lessons", lessonId), lessonData);
      } else {
        await addDoc(collection(db, "lessons"), lessonData);
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving lesson:", error);
      setErrors({ submit: "Failed to save lesson. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard title={lessonId ? "Edit Lesson" : "Create New Lesson"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Class"
          options={classes}
          value={formData.classId}
          onChange={(value) => setFormData(prev => ({ ...prev, classId: value }))}
          placeholder="Select a class"
          required
          disabled={loadingClasses}
          error={errors.classId}
        />

        <Select
          label="Subject"
          options={subjects}
          value={formData.subjectId}
          onChange={(value) => setFormData(prev => ({ ...prev, subjectId: value }))}
          placeholder="Select a subject"
          required
          disabled={loadingSubjects || !formData.classId}
          error={errors.subjectId}
        />

        <Select
          label="Chapter"
          options={chapters}
          value={formData.chapterId}
          onChange={(value) => setFormData(prev => ({ ...prev, chapterId: value }))}
          placeholder="Select a chapter"
          required
          disabled={loadingChapters || !formData.subjectId}
          error={errors.chapterId}
        />

        <Input
          label="Lesson Name"
          type="text"
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="Enter lesson name"
          required
          error={errors.name}
        />

        <Input
          label="Description"
          type="textarea"
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="Enter lesson description (optional)"
          rows={3}
        />

        <Input
          label="Content"
          type="textarea"
          value={formData.content}
          onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
          placeholder="Enter lesson content"
          rows={5}
        />

        <Input
          label="Order Index"
          type="number"
          value={formData.orderIndex.toString()}
          onChange={(value) => setFormData(prev => ({ ...prev, orderIndex: parseInt(value) || 1 }))}
          placeholder="Enter order index (1, 2, 3, ...)"
          required
        />

        {errors.submit && (
          <div className="text-red-600 text-sm">{errors.submit}</div>
        )}

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            loading={loading}
            disabled={loading || loadingSubjects || loadingChapters}
            className="flex-1"
          >
            {loading ? <LoadingSpinner size="small" /> : null}
            {lessonId ? "Update Lesson" : "Create Lesson"}
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </FormCard>
  );
} 