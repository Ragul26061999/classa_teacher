import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'classa2-main',
  location: 'asia-south1'
};

export const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';

export function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
}

export const createSchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSchool', inputVars);
}
createSchoolRef.operationName = 'CreateSchool';

export function createSchool(dcOrVars, vars) {
  return executeMutation(createSchoolRef(dcOrVars, vars));
}

export const updateSchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSchool', inputVars);
}
updateSchoolRef.operationName = 'UpdateSchool';

export function updateSchool(dcOrVars, vars) {
  return executeMutation(updateSchoolRef(dcOrVars, vars));
}

export const createClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateClass', inputVars);
}
createClassRef.operationName = 'CreateClass';

export function createClass(dcOrVars, vars) {
  return executeMutation(createClassRef(dcOrVars, vars));
}

export const updateClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateClass', inputVars);
}
updateClassRef.operationName = 'UpdateClass';

export function updateClass(dcOrVars, vars) {
  return executeMutation(updateClassRef(dcOrVars, vars));
}

export const deleteClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteClass', inputVars);
}
deleteClassRef.operationName = 'DeleteClass';

export function deleteClass(dcOrVars, vars) {
  return executeMutation(deleteClassRef(dcOrVars, vars));
}

export const createSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSubject', inputVars);
}
createSubjectRef.operationName = 'CreateSubject';

export function createSubject(dcOrVars, vars) {
  return executeMutation(createSubjectRef(dcOrVars, vars));
}

export const updateSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSubject', inputVars);
}
updateSubjectRef.operationName = 'UpdateSubject';

export function updateSubject(dcOrVars, vars) {
  return executeMutation(updateSubjectRef(dcOrVars, vars));
}

export const deleteSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSubject', inputVars);
}
deleteSubjectRef.operationName = 'DeleteSubject';

export function deleteSubject(dcOrVars, vars) {
  return executeMutation(deleteSubjectRef(dcOrVars, vars));
}

export const createChapterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateChapter', inputVars);
}
createChapterRef.operationName = 'CreateChapter';

export function createChapter(dcOrVars, vars) {
  return executeMutation(createChapterRef(dcOrVars, vars));
}

export const updateChapterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateChapter', inputVars);
}
updateChapterRef.operationName = 'UpdateChapter';

export function updateChapter(dcOrVars, vars) {
  return executeMutation(updateChapterRef(dcOrVars, vars));
}

export const deleteChapterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteChapter', inputVars);
}
deleteChapterRef.operationName = 'DeleteChapter';

export function deleteChapter(dcOrVars, vars) {
  return executeMutation(deleteChapterRef(dcOrVars, vars));
}

export const createLessonRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLesson', inputVars);
}
createLessonRef.operationName = 'CreateLesson';

export function createLesson(dcOrVars, vars) {
  return executeMutation(createLessonRef(dcOrVars, vars));
}

export const updateLessonRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLesson', inputVars);
}
updateLessonRef.operationName = 'UpdateLesson';

export function updateLesson(dcOrVars, vars) {
  return executeMutation(updateLessonRef(dcOrVars, vars));
}

export const deleteLessonRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLesson', inputVars);
}
deleteLessonRef.operationName = 'DeleteLesson';

export function deleteLesson(dcOrVars, vars) {
  return executeMutation(deleteLessonRef(dcOrVars, vars));
}

export const createTeacherRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTeacher', inputVars);
}
createTeacherRef.operationName = 'CreateTeacher';

export function createTeacher(dcOrVars, vars) {
  return executeMutation(createTeacherRef(dcOrVars, vars));
}

export const updateTeacherRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTeacher', inputVars);
}
updateTeacherRef.operationName = 'UpdateTeacher';

export function updateTeacher(dcOrVars, vars) {
  return executeMutation(updateTeacherRef(dcOrVars, vars));
}

export const deleteTeacherRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTeacher', inputVars);
}
deleteTeacherRef.operationName = 'DeleteTeacher';

export function deleteTeacher(dcOrVars, vars) {
  return executeMutation(deleteTeacherRef(dcOrVars, vars));
}

export const assignSubjectToClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignSubjectToClass', inputVars);
}
assignSubjectToClassRef.operationName = 'AssignSubjectToClass';

export function assignSubjectToClass(dcOrVars, vars) {
  return executeMutation(assignSubjectToClassRef(dcOrVars, vars));
}

export const removeSubjectFromClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveSubjectFromClass', inputVars);
}
removeSubjectFromClassRef.operationName = 'RemoveSubjectFromClass';

export function removeSubjectFromClass(dcOrVars, vars) {
  return executeMutation(removeSubjectFromClassRef(dcOrVars, vars));
}

export const assignTeacherToClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignTeacherToClass', inputVars);
}
assignTeacherToClassRef.operationName = 'AssignTeacherToClass';

export function assignTeacherToClass(dcOrVars, vars) {
  return executeMutation(assignTeacherToClassRef(dcOrVars, vars));
}

export const removeTeacherFromClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveTeacherFromClass', inputVars);
}
removeTeacherFromClassRef.operationName = 'RemoveTeacherFromClass';

export function removeTeacherFromClass(dcOrVars, vars) {
  return executeMutation(removeTeacherFromClassRef(dcOrVars, vars));
}

export const assignTeacherToSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignTeacherToSubject', inputVars);
}
assignTeacherToSubjectRef.operationName = 'AssignTeacherToSubject';

export function assignTeacherToSubject(dcOrVars, vars) {
  return executeMutation(assignTeacherToSubjectRef(dcOrVars, vars));
}

export const removeTeacherFromSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveTeacherFromSubject', inputVars);
}
removeTeacherFromSubjectRef.operationName = 'RemoveTeacherFromSubject';

export function removeTeacherFromSubject(dcOrVars, vars) {
  return executeMutation(removeTeacherFromSubjectRef(dcOrVars, vars));
}

export const getCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}
getCurrentUserRef.operationName = 'GetCurrentUser';

export function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
}

export const getSchoolByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSchoolById', inputVars);
}
getSchoolByIdRef.operationName = 'GetSchoolById';

export function getSchoolById(dcOrVars, vars) {
  return executeQuery(getSchoolByIdRef(dcOrVars, vars));
}

export const listClassesBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListClassesBySchool', inputVars);
}
listClassesBySchoolRef.operationName = 'ListClassesBySchool';

export function listClassesBySchool(dcOrVars, vars) {
  return executeQuery(listClassesBySchoolRef(dcOrVars, vars));
}

export const listSubjectsBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSubjectsBySchool', inputVars);
}
listSubjectsBySchoolRef.operationName = 'ListSubjectsBySchool';

export function listSubjectsBySchool(dcOrVars, vars) {
  return executeQuery(listSubjectsBySchoolRef(dcOrVars, vars));
}

export const listChaptersBySubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListChaptersBySubject', inputVars);
}
listChaptersBySubjectRef.operationName = 'ListChaptersBySubject';

export function listChaptersBySubject(dcOrVars, vars) {
  return executeQuery(listChaptersBySubjectRef(dcOrVars, vars));
}

export const listLessonsByChapterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLessonsByChapter', inputVars);
}
listLessonsByChapterRef.operationName = 'ListLessonsByChapter';

export function listLessonsByChapter(dcOrVars, vars) {
  return executeQuery(listLessonsByChapterRef(dcOrVars, vars));
}

export const listTeachersBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTeachersBySchool', inputVars);
}
listTeachersBySchoolRef.operationName = 'ListTeachersBySchool';

export function listTeachersBySchool(dcOrVars, vars) {
  return executeQuery(listTeachersBySchoolRef(dcOrVars, vars));
}

export const listClassSubjectsBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListClassSubjectsBySchool', inputVars);
}
listClassSubjectsBySchoolRef.operationName = 'ListClassSubjectsBySchool';

export function listClassSubjectsBySchool(dcOrVars, vars) {
  return executeQuery(listClassSubjectsBySchoolRef(dcOrVars, vars));
}

export const listTeacherClassesBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTeacherClassesBySchool', inputVars);
}
listTeacherClassesBySchoolRef.operationName = 'ListTeacherClassesBySchool';

export function listTeacherClassesBySchool(dcOrVars, vars) {
  return executeQuery(listTeacherClassesBySchoolRef(dcOrVars, vars));
}

export const listTeacherSubjectsBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTeacherSubjectsBySchool', inputVars);
}
listTeacherSubjectsBySchoolRef.operationName = 'ListTeacherSubjectsBySchool';

export function listTeacherSubjectsBySchool(dcOrVars, vars) {
  return executeQuery(listTeacherSubjectsBySchoolRef(dcOrVars, vars));
}

