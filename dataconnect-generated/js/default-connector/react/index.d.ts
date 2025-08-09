import { UpsertUserData, UpsertUserVariables, CreateSchoolData, CreateSchoolVariables, UpdateSchoolData, UpdateSchoolVariables, CreateClassData, CreateClassVariables, UpdateClassData, UpdateClassVariables, DeleteClassData, DeleteClassVariables, CreateSubjectData, CreateSubjectVariables, UpdateSubjectData, UpdateSubjectVariables, DeleteSubjectData, DeleteSubjectVariables, CreateChapterData, CreateChapterVariables, UpdateChapterData, UpdateChapterVariables, DeleteChapterData, DeleteChapterVariables, CreateLessonData, CreateLessonVariables, UpdateLessonData, UpdateLessonVariables, DeleteLessonData, DeleteLessonVariables, CreateTeacherData, CreateTeacherVariables, UpdateTeacherData, UpdateTeacherVariables, DeleteTeacherData, DeleteTeacherVariables, AssignSubjectToClassData, AssignSubjectToClassVariables, RemoveSubjectFromClassData, RemoveSubjectFromClassVariables, AssignTeacherToClassData, AssignTeacherToClassVariables, RemoveTeacherFromClassData, RemoveTeacherFromClassVariables, AssignTeacherToSubjectData, AssignTeacherToSubjectVariables, RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables, GetCurrentUserData, GetSchoolByIdData, GetSchoolByIdVariables, ListClassesBySchoolData, ListClassesBySchoolVariables, ListSubjectsBySchoolData, ListSubjectsBySchoolVariables, ListChaptersBySubjectData, ListChaptersBySubjectVariables, ListLessonsByChapterData, ListLessonsByChapterVariables, ListTeachersBySchoolData, ListTeachersBySchoolVariables, ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables, ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables, ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useUpsertUser(options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;
export function useUpsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;

export function useCreateSchool(options?: useDataConnectMutationOptions<CreateSchoolData, FirebaseError, CreateSchoolVariables>): UseDataConnectMutationResult<CreateSchoolData, CreateSchoolVariables>;
export function useCreateSchool(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSchoolData, FirebaseError, CreateSchoolVariables>): UseDataConnectMutationResult<CreateSchoolData, CreateSchoolVariables>;

export function useUpdateSchool(options?: useDataConnectMutationOptions<UpdateSchoolData, FirebaseError, UpdateSchoolVariables>): UseDataConnectMutationResult<UpdateSchoolData, UpdateSchoolVariables>;
export function useUpdateSchool(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSchoolData, FirebaseError, UpdateSchoolVariables>): UseDataConnectMutationResult<UpdateSchoolData, UpdateSchoolVariables>;

export function useCreateClass(options?: useDataConnectMutationOptions<CreateClassData, FirebaseError, CreateClassVariables>): UseDataConnectMutationResult<CreateClassData, CreateClassVariables>;
export function useCreateClass(dc: DataConnect, options?: useDataConnectMutationOptions<CreateClassData, FirebaseError, CreateClassVariables>): UseDataConnectMutationResult<CreateClassData, CreateClassVariables>;

export function useUpdateClass(options?: useDataConnectMutationOptions<UpdateClassData, FirebaseError, UpdateClassVariables>): UseDataConnectMutationResult<UpdateClassData, UpdateClassVariables>;
export function useUpdateClass(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateClassData, FirebaseError, UpdateClassVariables>): UseDataConnectMutationResult<UpdateClassData, UpdateClassVariables>;

export function useDeleteClass(options?: useDataConnectMutationOptions<DeleteClassData, FirebaseError, DeleteClassVariables>): UseDataConnectMutationResult<DeleteClassData, DeleteClassVariables>;
export function useDeleteClass(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteClassData, FirebaseError, DeleteClassVariables>): UseDataConnectMutationResult<DeleteClassData, DeleteClassVariables>;

export function useCreateSubject(options?: useDataConnectMutationOptions<CreateSubjectData, FirebaseError, CreateSubjectVariables>): UseDataConnectMutationResult<CreateSubjectData, CreateSubjectVariables>;
export function useCreateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSubjectData, FirebaseError, CreateSubjectVariables>): UseDataConnectMutationResult<CreateSubjectData, CreateSubjectVariables>;

export function useUpdateSubject(options?: useDataConnectMutationOptions<UpdateSubjectData, FirebaseError, UpdateSubjectVariables>): UseDataConnectMutationResult<UpdateSubjectData, UpdateSubjectVariables>;
export function useUpdateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSubjectData, FirebaseError, UpdateSubjectVariables>): UseDataConnectMutationResult<UpdateSubjectData, UpdateSubjectVariables>;

export function useDeleteSubject(options?: useDataConnectMutationOptions<DeleteSubjectData, FirebaseError, DeleteSubjectVariables>): UseDataConnectMutationResult<DeleteSubjectData, DeleteSubjectVariables>;
export function useDeleteSubject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteSubjectData, FirebaseError, DeleteSubjectVariables>): UseDataConnectMutationResult<DeleteSubjectData, DeleteSubjectVariables>;

export function useCreateChapter(options?: useDataConnectMutationOptions<CreateChapterData, FirebaseError, CreateChapterVariables>): UseDataConnectMutationResult<CreateChapterData, CreateChapterVariables>;
export function useCreateChapter(dc: DataConnect, options?: useDataConnectMutationOptions<CreateChapterData, FirebaseError, CreateChapterVariables>): UseDataConnectMutationResult<CreateChapterData, CreateChapterVariables>;

export function useUpdateChapter(options?: useDataConnectMutationOptions<UpdateChapterData, FirebaseError, UpdateChapterVariables>): UseDataConnectMutationResult<UpdateChapterData, UpdateChapterVariables>;
export function useUpdateChapter(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateChapterData, FirebaseError, UpdateChapterVariables>): UseDataConnectMutationResult<UpdateChapterData, UpdateChapterVariables>;

export function useDeleteChapter(options?: useDataConnectMutationOptions<DeleteChapterData, FirebaseError, DeleteChapterVariables>): UseDataConnectMutationResult<DeleteChapterData, DeleteChapterVariables>;
export function useDeleteChapter(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteChapterData, FirebaseError, DeleteChapterVariables>): UseDataConnectMutationResult<DeleteChapterData, DeleteChapterVariables>;

export function useCreateLesson(options?: useDataConnectMutationOptions<CreateLessonData, FirebaseError, CreateLessonVariables>): UseDataConnectMutationResult<CreateLessonData, CreateLessonVariables>;
export function useCreateLesson(dc: DataConnect, options?: useDataConnectMutationOptions<CreateLessonData, FirebaseError, CreateLessonVariables>): UseDataConnectMutationResult<CreateLessonData, CreateLessonVariables>;

export function useUpdateLesson(options?: useDataConnectMutationOptions<UpdateLessonData, FirebaseError, UpdateLessonVariables>): UseDataConnectMutationResult<UpdateLessonData, UpdateLessonVariables>;
export function useUpdateLesson(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLessonData, FirebaseError, UpdateLessonVariables>): UseDataConnectMutationResult<UpdateLessonData, UpdateLessonVariables>;

export function useDeleteLesson(options?: useDataConnectMutationOptions<DeleteLessonData, FirebaseError, DeleteLessonVariables>): UseDataConnectMutationResult<DeleteLessonData, DeleteLessonVariables>;
export function useDeleteLesson(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteLessonData, FirebaseError, DeleteLessonVariables>): UseDataConnectMutationResult<DeleteLessonData, DeleteLessonVariables>;

export function useCreateTeacher(options?: useDataConnectMutationOptions<CreateTeacherData, FirebaseError, CreateTeacherVariables>): UseDataConnectMutationResult<CreateTeacherData, CreateTeacherVariables>;
export function useCreateTeacher(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTeacherData, FirebaseError, CreateTeacherVariables>): UseDataConnectMutationResult<CreateTeacherData, CreateTeacherVariables>;

export function useUpdateTeacher(options?: useDataConnectMutationOptions<UpdateTeacherData, FirebaseError, UpdateTeacherVariables>): UseDataConnectMutationResult<UpdateTeacherData, UpdateTeacherVariables>;
export function useUpdateTeacher(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTeacherData, FirebaseError, UpdateTeacherVariables>): UseDataConnectMutationResult<UpdateTeacherData, UpdateTeacherVariables>;

export function useDeleteTeacher(options?: useDataConnectMutationOptions<DeleteTeacherData, FirebaseError, DeleteTeacherVariables>): UseDataConnectMutationResult<DeleteTeacherData, DeleteTeacherVariables>;
export function useDeleteTeacher(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTeacherData, FirebaseError, DeleteTeacherVariables>): UseDataConnectMutationResult<DeleteTeacherData, DeleteTeacherVariables>;

export function useAssignSubjectToClass(options?: useDataConnectMutationOptions<AssignSubjectToClassData, FirebaseError, AssignSubjectToClassVariables>): UseDataConnectMutationResult<AssignSubjectToClassData, AssignSubjectToClassVariables>;
export function useAssignSubjectToClass(dc: DataConnect, options?: useDataConnectMutationOptions<AssignSubjectToClassData, FirebaseError, AssignSubjectToClassVariables>): UseDataConnectMutationResult<AssignSubjectToClassData, AssignSubjectToClassVariables>;

export function useRemoveSubjectFromClass(options?: useDataConnectMutationOptions<RemoveSubjectFromClassData, FirebaseError, RemoveSubjectFromClassVariables>): UseDataConnectMutationResult<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;
export function useRemoveSubjectFromClass(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveSubjectFromClassData, FirebaseError, RemoveSubjectFromClassVariables>): UseDataConnectMutationResult<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;

export function useAssignTeacherToClass(options?: useDataConnectMutationOptions<AssignTeacherToClassData, FirebaseError, AssignTeacherToClassVariables>): UseDataConnectMutationResult<AssignTeacherToClassData, AssignTeacherToClassVariables>;
export function useAssignTeacherToClass(dc: DataConnect, options?: useDataConnectMutationOptions<AssignTeacherToClassData, FirebaseError, AssignTeacherToClassVariables>): UseDataConnectMutationResult<AssignTeacherToClassData, AssignTeacherToClassVariables>;

export function useRemoveTeacherFromClass(options?: useDataConnectMutationOptions<RemoveTeacherFromClassData, FirebaseError, RemoveTeacherFromClassVariables>): UseDataConnectMutationResult<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;
export function useRemoveTeacherFromClass(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveTeacherFromClassData, FirebaseError, RemoveTeacherFromClassVariables>): UseDataConnectMutationResult<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;

export function useAssignTeacherToSubject(options?: useDataConnectMutationOptions<AssignTeacherToSubjectData, FirebaseError, AssignTeacherToSubjectVariables>): UseDataConnectMutationResult<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;
export function useAssignTeacherToSubject(dc: DataConnect, options?: useDataConnectMutationOptions<AssignTeacherToSubjectData, FirebaseError, AssignTeacherToSubjectVariables>): UseDataConnectMutationResult<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;

export function useRemoveTeacherFromSubject(options?: useDataConnectMutationOptions<RemoveTeacherFromSubjectData, FirebaseError, RemoveTeacherFromSubjectVariables>): UseDataConnectMutationResult<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;
export function useRemoveTeacherFromSubject(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveTeacherFromSubjectData, FirebaseError, RemoveTeacherFromSubjectVariables>): UseDataConnectMutationResult<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useGetSchoolById(vars: GetSchoolByIdVariables, options?: useDataConnectQueryOptions<GetSchoolByIdData>): UseDataConnectQueryResult<GetSchoolByIdData, GetSchoolByIdVariables>;
export function useGetSchoolById(dc: DataConnect, vars: GetSchoolByIdVariables, options?: useDataConnectQueryOptions<GetSchoolByIdData>): UseDataConnectQueryResult<GetSchoolByIdData, GetSchoolByIdVariables>;

export function useListClassesBySchool(vars: ListClassesBySchoolVariables, options?: useDataConnectQueryOptions<ListClassesBySchoolData>): UseDataConnectQueryResult<ListClassesBySchoolData, ListClassesBySchoolVariables>;
export function useListClassesBySchool(dc: DataConnect, vars: ListClassesBySchoolVariables, options?: useDataConnectQueryOptions<ListClassesBySchoolData>): UseDataConnectQueryResult<ListClassesBySchoolData, ListClassesBySchoolVariables>;

export function useListSubjectsBySchool(vars: ListSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListSubjectsBySchoolData>): UseDataConnectQueryResult<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;
export function useListSubjectsBySchool(dc: DataConnect, vars: ListSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListSubjectsBySchoolData>): UseDataConnectQueryResult<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;

export function useListChaptersBySubject(vars: ListChaptersBySubjectVariables, options?: useDataConnectQueryOptions<ListChaptersBySubjectData>): UseDataConnectQueryResult<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;
export function useListChaptersBySubject(dc: DataConnect, vars: ListChaptersBySubjectVariables, options?: useDataConnectQueryOptions<ListChaptersBySubjectData>): UseDataConnectQueryResult<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;

export function useListLessonsByChapter(vars: ListLessonsByChapterVariables, options?: useDataConnectQueryOptions<ListLessonsByChapterData>): UseDataConnectQueryResult<ListLessonsByChapterData, ListLessonsByChapterVariables>;
export function useListLessonsByChapter(dc: DataConnect, vars: ListLessonsByChapterVariables, options?: useDataConnectQueryOptions<ListLessonsByChapterData>): UseDataConnectQueryResult<ListLessonsByChapterData, ListLessonsByChapterVariables>;

export function useListTeachersBySchool(vars: ListTeachersBySchoolVariables, options?: useDataConnectQueryOptions<ListTeachersBySchoolData>): UseDataConnectQueryResult<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;
export function useListTeachersBySchool(dc: DataConnect, vars: ListTeachersBySchoolVariables, options?: useDataConnectQueryOptions<ListTeachersBySchoolData>): UseDataConnectQueryResult<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;

export function useListClassSubjectsBySchool(vars: ListClassSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListClassSubjectsBySchoolData>): UseDataConnectQueryResult<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;
export function useListClassSubjectsBySchool(dc: DataConnect, vars: ListClassSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListClassSubjectsBySchoolData>): UseDataConnectQueryResult<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;

export function useListTeacherClassesBySchool(vars: ListTeacherClassesBySchoolVariables, options?: useDataConnectQueryOptions<ListTeacherClassesBySchoolData>): UseDataConnectQueryResult<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;
export function useListTeacherClassesBySchool(dc: DataConnect, vars: ListTeacherClassesBySchoolVariables, options?: useDataConnectQueryOptions<ListTeacherClassesBySchoolData>): UseDataConnectQueryResult<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;

export function useListTeacherSubjectsBySchool(vars: ListTeacherSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListTeacherSubjectsBySchoolData>): UseDataConnectQueryResult<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;
export function useListTeacherSubjectsBySchool(dc: DataConnect, vars: ListTeacherSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListTeacherSubjectsBySchoolData>): UseDataConnectQueryResult<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;
