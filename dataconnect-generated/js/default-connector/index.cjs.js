const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'classa2-main',
  location: 'asia-south1'
};
exports.connectorConfig = connectorConfig;

const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
};

const createSchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSchool', inputVars);
}
createSchoolRef.operationName = 'CreateSchool';
exports.createSchoolRef = createSchoolRef;

exports.createSchool = function createSchool(dcOrVars, vars) {
  return executeMutation(createSchoolRef(dcOrVars, vars));
};

const updateSchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSchool', inputVars);
}
updateSchoolRef.operationName = 'UpdateSchool';
exports.updateSchoolRef = updateSchoolRef;

exports.updateSchool = function updateSchool(dcOrVars, vars) {
  return executeMutation(updateSchoolRef(dcOrVars, vars));
};

const createClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateClass', inputVars);
}
createClassRef.operationName = 'CreateClass';
exports.createClassRef = createClassRef;

exports.createClass = function createClass(dcOrVars, vars) {
  return executeMutation(createClassRef(dcOrVars, vars));
};

const updateClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateClass', inputVars);
}
updateClassRef.operationName = 'UpdateClass';
exports.updateClassRef = updateClassRef;

exports.updateClass = function updateClass(dcOrVars, vars) {
  return executeMutation(updateClassRef(dcOrVars, vars));
};

const deleteClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteClass', inputVars);
}
deleteClassRef.operationName = 'DeleteClass';
exports.deleteClassRef = deleteClassRef;

exports.deleteClass = function deleteClass(dcOrVars, vars) {
  return executeMutation(deleteClassRef(dcOrVars, vars));
};

const createSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSubject', inputVars);
}
createSubjectRef.operationName = 'CreateSubject';
exports.createSubjectRef = createSubjectRef;

exports.createSubject = function createSubject(dcOrVars, vars) {
  return executeMutation(createSubjectRef(dcOrVars, vars));
};

const updateSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSubject', inputVars);
}
updateSubjectRef.operationName = 'UpdateSubject';
exports.updateSubjectRef = updateSubjectRef;

exports.updateSubject = function updateSubject(dcOrVars, vars) {
  return executeMutation(updateSubjectRef(dcOrVars, vars));
};

const deleteSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteSubject', inputVars);
}
deleteSubjectRef.operationName = 'DeleteSubject';
exports.deleteSubjectRef = deleteSubjectRef;

exports.deleteSubject = function deleteSubject(dcOrVars, vars) {
  return executeMutation(deleteSubjectRef(dcOrVars, vars));
};

const createChapterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateChapter', inputVars);
}
createChapterRef.operationName = 'CreateChapter';
exports.createChapterRef = createChapterRef;

exports.createChapter = function createChapter(dcOrVars, vars) {
  return executeMutation(createChapterRef(dcOrVars, vars));
};

const updateChapterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateChapter', inputVars);
}
updateChapterRef.operationName = 'UpdateChapter';
exports.updateChapterRef = updateChapterRef;

exports.updateChapter = function updateChapter(dcOrVars, vars) {
  return executeMutation(updateChapterRef(dcOrVars, vars));
};

const deleteChapterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteChapter', inputVars);
}
deleteChapterRef.operationName = 'DeleteChapter';
exports.deleteChapterRef = deleteChapterRef;

exports.deleteChapter = function deleteChapter(dcOrVars, vars) {
  return executeMutation(deleteChapterRef(dcOrVars, vars));
};

const createLessonRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLesson', inputVars);
}
createLessonRef.operationName = 'CreateLesson';
exports.createLessonRef = createLessonRef;

exports.createLesson = function createLesson(dcOrVars, vars) {
  return executeMutation(createLessonRef(dcOrVars, vars));
};

const updateLessonRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLesson', inputVars);
}
updateLessonRef.operationName = 'UpdateLesson';
exports.updateLessonRef = updateLessonRef;

exports.updateLesson = function updateLesson(dcOrVars, vars) {
  return executeMutation(updateLessonRef(dcOrVars, vars));
};

const deleteLessonRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLesson', inputVars);
}
deleteLessonRef.operationName = 'DeleteLesson';
exports.deleteLessonRef = deleteLessonRef;

exports.deleteLesson = function deleteLesson(dcOrVars, vars) {
  return executeMutation(deleteLessonRef(dcOrVars, vars));
};

const createTeacherRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTeacher', inputVars);
}
createTeacherRef.operationName = 'CreateTeacher';
exports.createTeacherRef = createTeacherRef;

exports.createTeacher = function createTeacher(dcOrVars, vars) {
  return executeMutation(createTeacherRef(dcOrVars, vars));
};

const updateTeacherRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTeacher', inputVars);
}
updateTeacherRef.operationName = 'UpdateTeacher';
exports.updateTeacherRef = updateTeacherRef;

exports.updateTeacher = function updateTeacher(dcOrVars, vars) {
  return executeMutation(updateTeacherRef(dcOrVars, vars));
};

const deleteTeacherRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteTeacher', inputVars);
}
deleteTeacherRef.operationName = 'DeleteTeacher';
exports.deleteTeacherRef = deleteTeacherRef;

exports.deleteTeacher = function deleteTeacher(dcOrVars, vars) {
  return executeMutation(deleteTeacherRef(dcOrVars, vars));
};

const assignSubjectToClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignSubjectToClass', inputVars);
}
assignSubjectToClassRef.operationName = 'AssignSubjectToClass';
exports.assignSubjectToClassRef = assignSubjectToClassRef;

exports.assignSubjectToClass = function assignSubjectToClass(dcOrVars, vars) {
  return executeMutation(assignSubjectToClassRef(dcOrVars, vars));
};

const removeSubjectFromClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveSubjectFromClass', inputVars);
}
removeSubjectFromClassRef.operationName = 'RemoveSubjectFromClass';
exports.removeSubjectFromClassRef = removeSubjectFromClassRef;

exports.removeSubjectFromClass = function removeSubjectFromClass(dcOrVars, vars) {
  return executeMutation(removeSubjectFromClassRef(dcOrVars, vars));
};

const assignTeacherToClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignTeacherToClass', inputVars);
}
assignTeacherToClassRef.operationName = 'AssignTeacherToClass';
exports.assignTeacherToClassRef = assignTeacherToClassRef;

exports.assignTeacherToClass = function assignTeacherToClass(dcOrVars, vars) {
  return executeMutation(assignTeacherToClassRef(dcOrVars, vars));
};

const removeTeacherFromClassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveTeacherFromClass', inputVars);
}
removeTeacherFromClassRef.operationName = 'RemoveTeacherFromClass';
exports.removeTeacherFromClassRef = removeTeacherFromClassRef;

exports.removeTeacherFromClass = function removeTeacherFromClass(dcOrVars, vars) {
  return executeMutation(removeTeacherFromClassRef(dcOrVars, vars));
};

const assignTeacherToSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignTeacherToSubject', inputVars);
}
assignTeacherToSubjectRef.operationName = 'AssignTeacherToSubject';
exports.assignTeacherToSubjectRef = assignTeacherToSubjectRef;

exports.assignTeacherToSubject = function assignTeacherToSubject(dcOrVars, vars) {
  return executeMutation(assignTeacherToSubjectRef(dcOrVars, vars));
};

const removeTeacherFromSubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveTeacherFromSubject', inputVars);
}
removeTeacherFromSubjectRef.operationName = 'RemoveTeacherFromSubject';
exports.removeTeacherFromSubjectRef = removeTeacherFromSubjectRef;

exports.removeTeacherFromSubject = function removeTeacherFromSubject(dcOrVars, vars) {
  return executeMutation(removeTeacherFromSubjectRef(dcOrVars, vars));
};

const getCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}
getCurrentUserRef.operationName = 'GetCurrentUser';
exports.getCurrentUserRef = getCurrentUserRef;

exports.getCurrentUser = function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
};

const getSchoolByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSchoolById', inputVars);
}
getSchoolByIdRef.operationName = 'GetSchoolById';
exports.getSchoolByIdRef = getSchoolByIdRef;

exports.getSchoolById = function getSchoolById(dcOrVars, vars) {
  return executeQuery(getSchoolByIdRef(dcOrVars, vars));
};

const listClassesBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListClassesBySchool', inputVars);
}
listClassesBySchoolRef.operationName = 'ListClassesBySchool';
exports.listClassesBySchoolRef = listClassesBySchoolRef;

exports.listClassesBySchool = function listClassesBySchool(dcOrVars, vars) {
  return executeQuery(listClassesBySchoolRef(dcOrVars, vars));
};

const listSubjectsBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSubjectsBySchool', inputVars);
}
listSubjectsBySchoolRef.operationName = 'ListSubjectsBySchool';
exports.listSubjectsBySchoolRef = listSubjectsBySchoolRef;

exports.listSubjectsBySchool = function listSubjectsBySchool(dcOrVars, vars) {
  return executeQuery(listSubjectsBySchoolRef(dcOrVars, vars));
};

const listChaptersBySubjectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListChaptersBySubject', inputVars);
}
listChaptersBySubjectRef.operationName = 'ListChaptersBySubject';
exports.listChaptersBySubjectRef = listChaptersBySubjectRef;

exports.listChaptersBySubject = function listChaptersBySubject(dcOrVars, vars) {
  return executeQuery(listChaptersBySubjectRef(dcOrVars, vars));
};

const listLessonsByChapterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLessonsByChapter', inputVars);
}
listLessonsByChapterRef.operationName = 'ListLessonsByChapter';
exports.listLessonsByChapterRef = listLessonsByChapterRef;

exports.listLessonsByChapter = function listLessonsByChapter(dcOrVars, vars) {
  return executeQuery(listLessonsByChapterRef(dcOrVars, vars));
};

const listTeachersBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTeachersBySchool', inputVars);
}
listTeachersBySchoolRef.operationName = 'ListTeachersBySchool';
exports.listTeachersBySchoolRef = listTeachersBySchoolRef;

exports.listTeachersBySchool = function listTeachersBySchool(dcOrVars, vars) {
  return executeQuery(listTeachersBySchoolRef(dcOrVars, vars));
};

const listClassSubjectsBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListClassSubjectsBySchool', inputVars);
}
listClassSubjectsBySchoolRef.operationName = 'ListClassSubjectsBySchool';
exports.listClassSubjectsBySchoolRef = listClassSubjectsBySchoolRef;

exports.listClassSubjectsBySchool = function listClassSubjectsBySchool(dcOrVars, vars) {
  return executeQuery(listClassSubjectsBySchoolRef(dcOrVars, vars));
};

const listTeacherClassesBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTeacherClassesBySchool', inputVars);
}
listTeacherClassesBySchoolRef.operationName = 'ListTeacherClassesBySchool';
exports.listTeacherClassesBySchoolRef = listTeacherClassesBySchoolRef;

exports.listTeacherClassesBySchool = function listTeacherClassesBySchool(dcOrVars, vars) {
  return executeQuery(listTeacherClassesBySchoolRef(dcOrVars, vars));
};

const listTeacherSubjectsBySchoolRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTeacherSubjectsBySchool', inputVars);
}
listTeacherSubjectsBySchoolRef.operationName = 'ListTeacherSubjectsBySchool';
exports.listTeacherSubjectsBySchoolRef = listTeacherSubjectsBySchoolRef;

exports.listTeacherSubjectsBySchool = function listTeacherSubjectsBySchool(dcOrVars, vars) {
  return executeQuery(listTeacherSubjectsBySchoolRef(dcOrVars, vars));
};
