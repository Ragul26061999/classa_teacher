"use client";
import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc, serverTimestamp, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebaseClient";
import { useAuth } from "../../contexts/AuthContext";
import FormCard from "../shared/FormCard";
import Input from "../shared/Input";
import Select from "../shared/Select";
import Button from "../shared/Button";
import LoadingSpinner from "../shared/LoadingSpinner";

interface ChapterFormProps {
  chapterId?: string;
  initialData?: {
    name: string;
    description: string;
    subjectId: string;
    orderIndex: number;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface SubjectOption {
  value: string;
  label: string;
}

interface ClassOption {
  value: string;
  label: string;
}

export default function ChapterForm({ chapterId, initialData, onSuccess, onCancel }: ChapterFormProps) {
  const { user, schoolId } = useAuth();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    subjectId: initialData?.subjectId || "",
    orderIndex: initialData?.orderIndex || 1,
  });
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchClasses();
    // If editing, try to preselect a class that contains the current subject
    const preselectClassForExistingSubject = async () => {
      if (initialData?.subjectId && !selectedClass) {
        try {
          const subjSnap = await getDoc(doc(db, "subjects", initialData.subjectId));
          if (subjSnap.exists()) {
            const data: any = subjSnap.data();
            const assClassRefs: any[] = data.assClass || [];
            const firstClassId = assClassRefs
              .map((ref: any) => {
                if (!ref) return null;
                if (typeof ref === "string") return ref.split("/").pop();
                if (ref?.path) return ref.path.split("/").pop();
                return ref?.id || null;
              })
              .filter(Boolean)?.[0] as string | undefined;
            if (firstClassId) {
              setSelectedClass(firstClassId);
            }
          }
        } catch (e) {
          console.error("Failed to preselect class for subject:", e);
        }
      }
    };
    preselectClassForExistingSubject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    fetchSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass]);

  // Fetch teacher's classes to drive subject filtering
  const fetchClasses = async () => {
    try {
      if (!user) return;
      const tQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));
      const tSnap = await getDocs(tQuery);
      if (!tSnap.empty) {
        const tData: any = tSnap.docs[0].data();
        const classRefs: any[] = tData.classes || [];
        const classOptions: ClassOption[] = [];
        for (const cref of classRefs) {
          try {
            const cSnap = typeof cref?.path === "string" ? await getDoc(doc(db, cref.path)) : await getDoc(cref);
            if (cSnap.exists()) {
              const cData: any = cSnap.data();
              classOptions.push({ value: cSnap.id, label: cData?.name || "Unnamed Class" });
            }
          } catch (e) {
            console.error("Error resolving class ref:", e);
          }
        }
        setClasses(classOptions);
        if (!selectedClass && classOptions.length > 0 && !initialData?.subjectId) {
          setSelectedClass(classOptions[0].value);
        }
      } else {
        setClasses([]);
      }
    } catch (e) {
      console.error("Error fetching classes:", e);
      setClasses([]);
    }
  };

  // Helper to get teacher subject IDs
  const getTeacherSubjectIds = async (userId: string): Promise<string[]> => {
    try {
      const tQuery = query(collection(db, "teachers"), where("userId", "==", userId));
      const tSnap = await getDocs(tQuery);
      if (!tSnap.empty) {
        const tData = tSnap.docs[0].data() as any;
        if (tData.subjects?.length > 0) {
          return tData.subjects
            .map((subjRef: any) => {
              if (typeof subjRef === "string") return subjRef.split("/").pop();
              if (subjRef?.path) return subjRef.path.split("/").pop();
              return subjRef?.id || "";
            })
            .filter(Boolean);
        }
      }
      return [];
    } catch (e) {
      console.error("Error fetching teacher subject IDs:", e);
      return [];
    }
  };

  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    try {
      if (!selectedClass) {
        setSubjects([]);
        return;
      }
      if (!user) return;

      const teacherSubjectIds = await getTeacherSubjectIds(user.uid);
      const classRef = doc(db, "classes", selectedClass);

      let qRef = query(
        collection(db, "subjects"),
        where("assClass", "array-contains", classRef)
      );
      if (teacherSubjectIds.length > 0) {
        qRef = query(qRef, where("__name__", "in", teacherSubjectIds));
      }

      const snap = await getDocs(qRef);
      const subjectOptions: SubjectOption[] = snap.docs.map(d => ({ value: d.id, label: (d.data() as any).name || "Unnamed Subject" }));
      setSubjects(subjectOptions);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setErrors({ subjects: "Failed to load subjects" });
    } finally {
      setLoadingSubjects(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Chapter name is required";
    }

    if (!formData.subjectId) {
      newErrors.subjectId = "Subject is required";
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
      const chapterData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        subjectId: doc(db, "subjects", formData.subjectId),
        schoolId: doc(db, "school", schoolId!),
        orderIndex: formData.orderIndex,
        createdBy: doc(db, "users", user!.uid),
        teacherId: user!.uid, // Add teacherId to associate chapter with teacher
        ...(chapterId 
          ? { updatedAt: serverTimestamp() }
          : { createdAt: serverTimestamp() }
        ),
      };

      if (chapterId) {
        await updateDoc(doc(db, "chapters", chapterId), chapterData);
      } else {
        await addDoc(collection(db, "chapters"), chapterData);
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving chapter:", error);
      setErrors({ submit: "Failed to save chapter. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard title={chapterId ? "Edit Chapter" : "Create New Chapter"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Class"
          options={classes}
          value={selectedClass}
          onChange={(value) => {
            setSelectedClass(value);
            setFormData(prev => ({ ...prev, subjectId: "" }));
          }}
          placeholder="Select a class"
          required
        />

        <Select
          label="Subject"
          options={subjects}
          value={formData.subjectId}
          onChange={(value) => setFormData(prev => ({ ...prev, subjectId: value }))}
          placeholder="Select a subject (choose class first)"
          required
          disabled={loadingSubjects || !selectedClass}
        />

        <Input
          label="Chapter Name"
          type="text"
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="Enter chapter name"
          required
          error={errors.name}
        />

        <Input
          label="Description"
          type="textarea"
          value={formData.description}
          onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          placeholder="Enter chapter description (optional)"
          rows={3}
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
            disabled={loading || loadingSubjects}
            className="flex-1"
          >
            {loading ? <LoadingSpinner size="small" /> : null}
            {chapterId ? "Update Chapter" : "Create Chapter"}
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