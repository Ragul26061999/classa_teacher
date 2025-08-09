import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AssignSubjectToClassData {
  classSubject_upsert: ClassSubject_Key;
}

export interface AssignSubjectToClassVariables {
  classId: UUIDString;
  subjectId: UUIDString;
  schoolId: UUIDString;
}

export interface AssignTeacherToClassData {
  teacherClass_upsert: TeacherClass_Key;
}

export interface AssignTeacherToClassVariables {
  teacherId: UUIDString;
  classId: UUIDString;
  schoolId: UUIDString;
}

export interface AssignTeacherToSubjectData {
  teacherSubject_upsert: TeacherSubject_Key;
}

export interface AssignTeacherToSubjectVariables {
  teacherId: UUIDString;
  subjectId: UUIDString;
  schoolId: UUIDString;
}

export interface Chapter_Key {
  id: UUIDString;
  __typename?: 'Chapter_Key';
}

export interface ClassSubject_Key {
  classId: UUIDString;
  subjectId: UUIDString;
  __typename?: 'ClassSubject_Key';
}

export interface Class_Key {
  id: UUIDString;
  __typename?: 'Class_Key';
}

export interface CreateChapterData {
  chapter_insert: Chapter_Key;
}

export interface CreateChapterVariables {
  name: string;
  description?: string | null;
  subjectId: UUIDString;
  schoolId: UUIDString;
  orderIndex?: number | null;
}

export interface CreateClassData {
  class_insert: Class_Key;
}

export interface CreateClassVariables {
  name: string;
  schoolId: UUIDString;
}

export interface CreateLessonData {
  lesson_insert: Lesson_Key;
}

export interface CreateLessonVariables {
  name: string;
  description?: string | null;
  content?: string | null;
  chapterId: UUIDString;
  subjectId: UUIDString;
  schoolId: UUIDString;
  orderIndex?: number | null;
}

export interface CreateSchoolData {
  school_insert: School_Key;
}

export interface CreateSchoolVariables {
  name: string;
  address?: string | null;
  contact?: string | null;
  isBranch?: boolean | null;
  mainBranchId?: UUIDString | null;
}

export interface CreateSubjectData {
  subject_insert: Subject_Key;
}

export interface CreateSubjectVariables {
  name: string;
  description?: string | null;
  image?: string | null;
  schoolId: UUIDString;
}

export interface CreateTeacherData {
  teacher_insert: Teacher_Key;
}

export interface CreateTeacherVariables {
  teacherId: string;
  userId: string;
  schoolId: UUIDString;
}

export interface DeleteChapterData {
  chapter_delete?: Chapter_Key | null;
}

export interface DeleteChapterVariables {
  chapterId: UUIDString;
}

export interface DeleteClassData {
  class_delete?: Class_Key | null;
}

export interface DeleteClassVariables {
  classId: UUIDString;
}

export interface DeleteLessonData {
  lesson_delete?: Lesson_Key | null;
}

export interface DeleteLessonVariables {
  lessonId: UUIDString;
}

export interface DeleteSubjectData {
  subject_delete?: Subject_Key | null;
}

export interface DeleteSubjectVariables {
  subjectId: UUIDString;
}

export interface DeleteTeacherData {
  teacher_delete?: Teacher_Key | null;
}

export interface DeleteTeacherVariables {
  teacherId: UUIDString;
}

export interface GetCurrentUserData {
  user?: {
    id: string;
    email: string;
    displayName?: string | null;
    role?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & User_Key;
}

export interface GetSchoolByIdData {
  school?: {
    id: UUIDString;
    name: string;
    address?: string | null;
    contact?: string | null;
    isBranch?: boolean | null;
    mainAdmin: {
      id: string;
      email: string;
      displayName?: string | null;
    } & User_Key;
      branchAdmin?: {
        id: string;
        email: string;
        displayName?: string | null;
      } & User_Key;
        mainBranch?: {
          id: UUIDString;
          name: string;
        } & School_Key;
          createdAt: TimestampString;
          updatedAt: TimestampString;
  } & School_Key;
}

export interface GetSchoolByIdVariables {
  schoolId: UUIDString;
}

export interface Lesson_Key {
  id: UUIDString;
  __typename?: 'Lesson_Key';
}

export interface ListChaptersBySubjectData {
  chapters: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    orderIndex?: number | null;
    subject: {
      id: UUIDString;
      name: string;
    } & Subject_Key;
      school: {
        id: UUIDString;
        name: string;
      } & School_Key;
        createdBy: {
          id: string;
          displayName?: string | null;
        } & User_Key;
          createdAt: TimestampString;
          updatedAt: TimestampString;
  } & Chapter_Key)[];
}

export interface ListChaptersBySubjectVariables {
  subjectId: UUIDString;
}

export interface ListClassSubjectsBySchoolData {
  classSubjects: ({
    class: {
      id: UUIDString;
      name: string;
    } & Class_Key;
      subject: {
        id: UUIDString;
        name: string;
      } & Subject_Key;
        school: {
          id: UUIDString;
          name: string;
        } & School_Key;
          createdBy: {
            id: string;
            displayName?: string | null;
          } & User_Key;
            createdAt: TimestampString;
  })[];
}

export interface ListClassSubjectsBySchoolVariables {
  schoolId: UUIDString;
}

export interface ListClassesBySchoolData {
  classes: ({
    id: UUIDString;
    name: string;
    school: {
      id: UUIDString;
      name: string;
    } & School_Key;
      createdBy: {
        id: string;
        displayName?: string | null;
      } & User_Key;
        createdAt: TimestampString;
        updatedAt: TimestampString;
  } & Class_Key)[];
}

export interface ListClassesBySchoolVariables {
  schoolId: UUIDString;
}

export interface ListLessonsByChapterData {
  lessons: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    content?: string | null;
    orderIndex?: number | null;
    chapter: {
      id: UUIDString;
      name: string;
    } & Chapter_Key;
      subject: {
        id: UUIDString;
        name: string;
      } & Subject_Key;
        school: {
          id: UUIDString;
          name: string;
        } & School_Key;
          createdBy: {
            id: string;
            displayName?: string | null;
          } & User_Key;
            createdAt: TimestampString;
            updatedAt: TimestampString;
  } & Lesson_Key)[];
}

export interface ListLessonsByChapterVariables {
  chapterId: UUIDString;
}

export interface ListSubjectsBySchoolData {
  subjects: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    image?: string | null;
    school: {
      id: UUIDString;
      name: string;
    } & School_Key;
      createdBy: {
        id: string;
        displayName?: string | null;
      } & User_Key;
        createdAt: TimestampString;
        updatedAt: TimestampString;
  } & Subject_Key)[];
}

export interface ListSubjectsBySchoolVariables {
  schoolId: UUIDString;
}

export interface ListTeacherClassesBySchoolData {
  teacherClasses: ({
    teacher: {
      id: UUIDString;
      teacherId: string;
      user: {
        id: string;
        displayName?: string | null;
      } & User_Key;
    } & Teacher_Key;
      class: {
        id: UUIDString;
        name: string;
      } & Class_Key;
        school: {
          id: UUIDString;
          name: string;
        } & School_Key;
          createdBy: {
            id: string;
            displayName?: string | null;
          } & User_Key;
            createdAt: TimestampString;
  })[];
}

export interface ListTeacherClassesBySchoolVariables {
  schoolId: UUIDString;
}

export interface ListTeacherSubjectsBySchoolData {
  teacherSubjects: ({
    teacher: {
      id: UUIDString;
      teacherId: string;
      user: {
        id: string;
        displayName?: string | null;
      } & User_Key;
    } & Teacher_Key;
      subject: {
        id: UUIDString;
        name: string;
      } & Subject_Key;
        school: {
          id: UUIDString;
          name: string;
        } & School_Key;
          createdBy: {
            id: string;
            displayName?: string | null;
          } & User_Key;
            createdAt: TimestampString;
  })[];
}

export interface ListTeacherSubjectsBySchoolVariables {
  schoolId: UUIDString;
}

export interface ListTeachersBySchoolData {
  teachers: ({
    id: UUIDString;
    teacherId: string;
    user: {
      id: string;
      email: string;
      displayName?: string | null;
    } & User_Key;
      school: {
        id: UUIDString;
        name: string;
      } & School_Key;
        createdBy: {
          id: string;
          displayName?: string | null;
        } & User_Key;
          createdAt: TimestampString;
          updatedAt: TimestampString;
  } & Teacher_Key)[];
}

export interface ListTeachersBySchoolVariables {
  schoolId: UUIDString;
}

export interface RemoveSubjectFromClassData {
  classSubject_delete?: ClassSubject_Key | null;
}

export interface RemoveSubjectFromClassVariables {
  classId: UUIDString;
  subjectId: UUIDString;
}

export interface RemoveTeacherFromClassData {
  teacherClass_delete?: TeacherClass_Key | null;
}

export interface RemoveTeacherFromClassVariables {
  teacherId: UUIDString;
  classId: UUIDString;
}

export interface RemoveTeacherFromSubjectData {
  teacherSubject_delete?: TeacherSubject_Key | null;
}

export interface RemoveTeacherFromSubjectVariables {
  teacherId: UUIDString;
  subjectId: UUIDString;
}

export interface School_Key {
  id: UUIDString;
  __typename?: 'School_Key';
}

export interface Subject_Key {
  id: UUIDString;
  __typename?: 'Subject_Key';
}

export interface TeacherClass_Key {
  teacherId: UUIDString;
  classId: UUIDString;
  __typename?: 'TeacherClass_Key';
}

export interface TeacherSubject_Key {
  teacherId: UUIDString;
  subjectId: UUIDString;
  __typename?: 'TeacherSubject_Key';
}

export interface Teacher_Key {
  id: UUIDString;
  __typename?: 'Teacher_Key';
}

export interface UpdateChapterData {
  chapter_update?: Chapter_Key | null;
}

export interface UpdateChapterVariables {
  chapterId: UUIDString;
  name?: string | null;
  description?: string | null;
  orderIndex?: number | null;
}

export interface UpdateClassData {
  class_update?: Class_Key | null;
}

export interface UpdateClassVariables {
  classId: UUIDString;
  name: string;
}

export interface UpdateLessonData {
  lesson_update?: Lesson_Key | null;
}

export interface UpdateLessonVariables {
  lessonId: UUIDString;
  name?: string | null;
  description?: string | null;
  content?: string | null;
  orderIndex?: number | null;
}

export interface UpdateSchoolData {
  school_update?: School_Key | null;
}

export interface UpdateSchoolVariables {
  schoolId: UUIDString;
  name?: string | null;
  address?: string | null;
  contact?: string | null;
}

export interface UpdateSubjectData {
  subject_update?: Subject_Key | null;
}

export interface UpdateSubjectVariables {
  subjectId: UUIDString;
  name?: string | null;
  description?: string | null;
  image?: string | null;
}

export interface UpdateTeacherData {
  teacher_update?: Teacher_Key | null;
}

export interface UpdateTeacherVariables {
  teacherId: UUIDString;
  teacherIdString: string;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  email: string;
  displayName?: string | null;
  role?: string | null;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface CreateSchoolRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSchoolVariables): MutationRef<CreateSchoolData, CreateSchoolVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSchoolVariables): MutationRef<CreateSchoolData, CreateSchoolVariables>;
  operationName: string;
}
export const createSchoolRef: CreateSchoolRef;

export function createSchool(vars: CreateSchoolVariables): MutationPromise<CreateSchoolData, CreateSchoolVariables>;
export function createSchool(dc: DataConnect, vars: CreateSchoolVariables): MutationPromise<CreateSchoolData, CreateSchoolVariables>;

interface UpdateSchoolRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSchoolVariables): MutationRef<UpdateSchoolData, UpdateSchoolVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSchoolVariables): MutationRef<UpdateSchoolData, UpdateSchoolVariables>;
  operationName: string;
}
export const updateSchoolRef: UpdateSchoolRef;

export function updateSchool(vars: UpdateSchoolVariables): MutationPromise<UpdateSchoolData, UpdateSchoolVariables>;
export function updateSchool(dc: DataConnect, vars: UpdateSchoolVariables): MutationPromise<UpdateSchoolData, UpdateSchoolVariables>;

interface CreateClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
  operationName: string;
}
export const createClassRef: CreateClassRef;

export function createClass(vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;
export function createClass(dc: DataConnect, vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface UpdateClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
  operationName: string;
}
export const updateClassRef: UpdateClassRef;

export function updateClass(vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;
export function updateClass(dc: DataConnect, vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;

interface DeleteClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
  operationName: string;
}
export const deleteClassRef: DeleteClassRef;

export function deleteClass(vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;
export function deleteClass(dc: DataConnect, vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;

interface CreateSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
  operationName: string;
}
export const createSubjectRef: CreateSubjectRef;

export function createSubject(vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;
export function createSubject(dc: DataConnect, vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;

interface UpdateSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
  operationName: string;
}
export const updateSubjectRef: UpdateSubjectRef;

export function updateSubject(vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;
export function updateSubject(dc: DataConnect, vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;

interface DeleteSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubjectVariables): MutationRef<DeleteSubjectData, DeleteSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSubjectVariables): MutationRef<DeleteSubjectData, DeleteSubjectVariables>;
  operationName: string;
}
export const deleteSubjectRef: DeleteSubjectRef;

export function deleteSubject(vars: DeleteSubjectVariables): MutationPromise<DeleteSubjectData, DeleteSubjectVariables>;
export function deleteSubject(dc: DataConnect, vars: DeleteSubjectVariables): MutationPromise<DeleteSubjectData, DeleteSubjectVariables>;

interface CreateChapterRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateChapterVariables): MutationRef<CreateChapterData, CreateChapterVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateChapterVariables): MutationRef<CreateChapterData, CreateChapterVariables>;
  operationName: string;
}
export const createChapterRef: CreateChapterRef;

export function createChapter(vars: CreateChapterVariables): MutationPromise<CreateChapterData, CreateChapterVariables>;
export function createChapter(dc: DataConnect, vars: CreateChapterVariables): MutationPromise<CreateChapterData, CreateChapterVariables>;

interface UpdateChapterRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateChapterVariables): MutationRef<UpdateChapterData, UpdateChapterVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateChapterVariables): MutationRef<UpdateChapterData, UpdateChapterVariables>;
  operationName: string;
}
export const updateChapterRef: UpdateChapterRef;

export function updateChapter(vars: UpdateChapterVariables): MutationPromise<UpdateChapterData, UpdateChapterVariables>;
export function updateChapter(dc: DataConnect, vars: UpdateChapterVariables): MutationPromise<UpdateChapterData, UpdateChapterVariables>;

interface DeleteChapterRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteChapterVariables): MutationRef<DeleteChapterData, DeleteChapterVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteChapterVariables): MutationRef<DeleteChapterData, DeleteChapterVariables>;
  operationName: string;
}
export const deleteChapterRef: DeleteChapterRef;

export function deleteChapter(vars: DeleteChapterVariables): MutationPromise<DeleteChapterData, DeleteChapterVariables>;
export function deleteChapter(dc: DataConnect, vars: DeleteChapterVariables): MutationPromise<DeleteChapterData, DeleteChapterVariables>;

interface CreateLessonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLessonVariables): MutationRef<CreateLessonData, CreateLessonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLessonVariables): MutationRef<CreateLessonData, CreateLessonVariables>;
  operationName: string;
}
export const createLessonRef: CreateLessonRef;

export function createLesson(vars: CreateLessonVariables): MutationPromise<CreateLessonData, CreateLessonVariables>;
export function createLesson(dc: DataConnect, vars: CreateLessonVariables): MutationPromise<CreateLessonData, CreateLessonVariables>;

interface UpdateLessonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLessonVariables): MutationRef<UpdateLessonData, UpdateLessonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLessonVariables): MutationRef<UpdateLessonData, UpdateLessonVariables>;
  operationName: string;
}
export const updateLessonRef: UpdateLessonRef;

export function updateLesson(vars: UpdateLessonVariables): MutationPromise<UpdateLessonData, UpdateLessonVariables>;
export function updateLesson(dc: DataConnect, vars: UpdateLessonVariables): MutationPromise<UpdateLessonData, UpdateLessonVariables>;

interface DeleteLessonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLessonVariables): MutationRef<DeleteLessonData, DeleteLessonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLessonVariables): MutationRef<DeleteLessonData, DeleteLessonVariables>;
  operationName: string;
}
export const deleteLessonRef: DeleteLessonRef;

export function deleteLesson(vars: DeleteLessonVariables): MutationPromise<DeleteLessonData, DeleteLessonVariables>;
export function deleteLesson(dc: DataConnect, vars: DeleteLessonVariables): MutationPromise<DeleteLessonData, DeleteLessonVariables>;

interface CreateTeacherRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTeacherVariables): MutationRef<CreateTeacherData, CreateTeacherVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTeacherVariables): MutationRef<CreateTeacherData, CreateTeacherVariables>;
  operationName: string;
}
export const createTeacherRef: CreateTeacherRef;

export function createTeacher(vars: CreateTeacherVariables): MutationPromise<CreateTeacherData, CreateTeacherVariables>;
export function createTeacher(dc: DataConnect, vars: CreateTeacherVariables): MutationPromise<CreateTeacherData, CreateTeacherVariables>;

interface UpdateTeacherRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeacherVariables): MutationRef<UpdateTeacherData, UpdateTeacherVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTeacherVariables): MutationRef<UpdateTeacherData, UpdateTeacherVariables>;
  operationName: string;
}
export const updateTeacherRef: UpdateTeacherRef;

export function updateTeacher(vars: UpdateTeacherVariables): MutationPromise<UpdateTeacherData, UpdateTeacherVariables>;
export function updateTeacher(dc: DataConnect, vars: UpdateTeacherVariables): MutationPromise<UpdateTeacherData, UpdateTeacherVariables>;

interface DeleteTeacherRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTeacherVariables): MutationRef<DeleteTeacherData, DeleteTeacherVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTeacherVariables): MutationRef<DeleteTeacherData, DeleteTeacherVariables>;
  operationName: string;
}
export const deleteTeacherRef: DeleteTeacherRef;

export function deleteTeacher(vars: DeleteTeacherVariables): MutationPromise<DeleteTeacherData, DeleteTeacherVariables>;
export function deleteTeacher(dc: DataConnect, vars: DeleteTeacherVariables): MutationPromise<DeleteTeacherData, DeleteTeacherVariables>;

interface AssignSubjectToClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignSubjectToClassVariables): MutationRef<AssignSubjectToClassData, AssignSubjectToClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignSubjectToClassVariables): MutationRef<AssignSubjectToClassData, AssignSubjectToClassVariables>;
  operationName: string;
}
export const assignSubjectToClassRef: AssignSubjectToClassRef;

export function assignSubjectToClass(vars: AssignSubjectToClassVariables): MutationPromise<AssignSubjectToClassData, AssignSubjectToClassVariables>;
export function assignSubjectToClass(dc: DataConnect, vars: AssignSubjectToClassVariables): MutationPromise<AssignSubjectToClassData, AssignSubjectToClassVariables>;

interface RemoveSubjectFromClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveSubjectFromClassVariables): MutationRef<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveSubjectFromClassVariables): MutationRef<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;
  operationName: string;
}
export const removeSubjectFromClassRef: RemoveSubjectFromClassRef;

export function removeSubjectFromClass(vars: RemoveSubjectFromClassVariables): MutationPromise<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;
export function removeSubjectFromClass(dc: DataConnect, vars: RemoveSubjectFromClassVariables): MutationPromise<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;

interface AssignTeacherToClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignTeacherToClassVariables): MutationRef<AssignTeacherToClassData, AssignTeacherToClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignTeacherToClassVariables): MutationRef<AssignTeacherToClassData, AssignTeacherToClassVariables>;
  operationName: string;
}
export const assignTeacherToClassRef: AssignTeacherToClassRef;

export function assignTeacherToClass(vars: AssignTeacherToClassVariables): MutationPromise<AssignTeacherToClassData, AssignTeacherToClassVariables>;
export function assignTeacherToClass(dc: DataConnect, vars: AssignTeacherToClassVariables): MutationPromise<AssignTeacherToClassData, AssignTeacherToClassVariables>;

interface RemoveTeacherFromClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTeacherFromClassVariables): MutationRef<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveTeacherFromClassVariables): MutationRef<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;
  operationName: string;
}
export const removeTeacherFromClassRef: RemoveTeacherFromClassRef;

export function removeTeacherFromClass(vars: RemoveTeacherFromClassVariables): MutationPromise<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;
export function removeTeacherFromClass(dc: DataConnect, vars: RemoveTeacherFromClassVariables): MutationPromise<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;

interface AssignTeacherToSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignTeacherToSubjectVariables): MutationRef<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignTeacherToSubjectVariables): MutationRef<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;
  operationName: string;
}
export const assignTeacherToSubjectRef: AssignTeacherToSubjectRef;

export function assignTeacherToSubject(vars: AssignTeacherToSubjectVariables): MutationPromise<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;
export function assignTeacherToSubject(dc: DataConnect, vars: AssignTeacherToSubjectVariables): MutationPromise<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;

interface RemoveTeacherFromSubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTeacherFromSubjectVariables): MutationRef<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveTeacherFromSubjectVariables): MutationRef<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;
  operationName: string;
}
export const removeTeacherFromSubjectRef: RemoveTeacherFromSubjectRef;

export function removeTeacherFromSubject(vars: RemoveTeacherFromSubjectVariables): MutationPromise<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;
export function removeTeacherFromSubject(dc: DataConnect, vars: RemoveTeacherFromSubjectVariables): MutationPromise<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

interface GetSchoolByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSchoolByIdVariables): QueryRef<GetSchoolByIdData, GetSchoolByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSchoolByIdVariables): QueryRef<GetSchoolByIdData, GetSchoolByIdVariables>;
  operationName: string;
}
export const getSchoolByIdRef: GetSchoolByIdRef;

export function getSchoolById(vars: GetSchoolByIdVariables): QueryPromise<GetSchoolByIdData, GetSchoolByIdVariables>;
export function getSchoolById(dc: DataConnect, vars: GetSchoolByIdVariables): QueryPromise<GetSchoolByIdData, GetSchoolByIdVariables>;

interface ListClassesBySchoolRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListClassesBySchoolVariables): QueryRef<ListClassesBySchoolData, ListClassesBySchoolVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListClassesBySchoolVariables): QueryRef<ListClassesBySchoolData, ListClassesBySchoolVariables>;
  operationName: string;
}
export const listClassesBySchoolRef: ListClassesBySchoolRef;

export function listClassesBySchool(vars: ListClassesBySchoolVariables): QueryPromise<ListClassesBySchoolData, ListClassesBySchoolVariables>;
export function listClassesBySchool(dc: DataConnect, vars: ListClassesBySchoolVariables): QueryPromise<ListClassesBySchoolData, ListClassesBySchoolVariables>;

interface ListSubjectsBySchoolRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListSubjectsBySchoolVariables): QueryRef<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListSubjectsBySchoolVariables): QueryRef<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;
  operationName: string;
}
export const listSubjectsBySchoolRef: ListSubjectsBySchoolRef;

export function listSubjectsBySchool(vars: ListSubjectsBySchoolVariables): QueryPromise<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;
export function listSubjectsBySchool(dc: DataConnect, vars: ListSubjectsBySchoolVariables): QueryPromise<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;

interface ListChaptersBySubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListChaptersBySubjectVariables): QueryRef<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListChaptersBySubjectVariables): QueryRef<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;
  operationName: string;
}
export const listChaptersBySubjectRef: ListChaptersBySubjectRef;

export function listChaptersBySubject(vars: ListChaptersBySubjectVariables): QueryPromise<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;
export function listChaptersBySubject(dc: DataConnect, vars: ListChaptersBySubjectVariables): QueryPromise<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;

interface ListLessonsByChapterRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListLessonsByChapterVariables): QueryRef<ListLessonsByChapterData, ListLessonsByChapterVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListLessonsByChapterVariables): QueryRef<ListLessonsByChapterData, ListLessonsByChapterVariables>;
  operationName: string;
}
export const listLessonsByChapterRef: ListLessonsByChapterRef;

export function listLessonsByChapter(vars: ListLessonsByChapterVariables): QueryPromise<ListLessonsByChapterData, ListLessonsByChapterVariables>;
export function listLessonsByChapter(dc: DataConnect, vars: ListLessonsByChapterVariables): QueryPromise<ListLessonsByChapterData, ListLessonsByChapterVariables>;

interface ListTeachersBySchoolRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTeachersBySchoolVariables): QueryRef<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTeachersBySchoolVariables): QueryRef<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;
  operationName: string;
}
export const listTeachersBySchoolRef: ListTeachersBySchoolRef;

export function listTeachersBySchool(vars: ListTeachersBySchoolVariables): QueryPromise<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;
export function listTeachersBySchool(dc: DataConnect, vars: ListTeachersBySchoolVariables): QueryPromise<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;

interface ListClassSubjectsBySchoolRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListClassSubjectsBySchoolVariables): QueryRef<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListClassSubjectsBySchoolVariables): QueryRef<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;
  operationName: string;
}
export const listClassSubjectsBySchoolRef: ListClassSubjectsBySchoolRef;

export function listClassSubjectsBySchool(vars: ListClassSubjectsBySchoolVariables): QueryPromise<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;
export function listClassSubjectsBySchool(dc: DataConnect, vars: ListClassSubjectsBySchoolVariables): QueryPromise<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;

interface ListTeacherClassesBySchoolRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTeacherClassesBySchoolVariables): QueryRef<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTeacherClassesBySchoolVariables): QueryRef<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;
  operationName: string;
}
export const listTeacherClassesBySchoolRef: ListTeacherClassesBySchoolRef;

export function listTeacherClassesBySchool(vars: ListTeacherClassesBySchoolVariables): QueryPromise<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;
export function listTeacherClassesBySchool(dc: DataConnect, vars: ListTeacherClassesBySchoolVariables): QueryPromise<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;

interface ListTeacherSubjectsBySchoolRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTeacherSubjectsBySchoolVariables): QueryRef<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTeacherSubjectsBySchoolVariables): QueryRef<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;
  operationName: string;
}
export const listTeacherSubjectsBySchoolRef: ListTeacherSubjectsBySchoolRef;

export function listTeacherSubjectsBySchool(vars: ListTeacherSubjectsBySchoolVariables): QueryPromise<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;
export function listTeacherSubjectsBySchool(dc: DataConnect, vars: ListTeacherSubjectsBySchoolVariables): QueryPromise<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;

