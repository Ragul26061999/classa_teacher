# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`default-connector/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*GetSchoolById*](#getschoolbyid)
  - [*ListClassesBySchool*](#listclassesbyschool)
  - [*ListSubjectsBySchool*](#listsubjectsbyschool)
  - [*ListChaptersBySubject*](#listchaptersbysubject)
  - [*ListLessonsByChapter*](#listlessonsbychapter)
  - [*ListTeachersBySchool*](#listteachersbyschool)
  - [*ListClassSubjectsBySchool*](#listclasssubjectsbyschool)
  - [*ListTeacherClassesBySchool*](#listteacherclassesbyschool)
  - [*ListTeacherSubjectsBySchool*](#listteachersubjectsbyschool)
- [**Mutations**](#mutations)
  - [*UpsertUser*](#upsertuser)
  - [*CreateSchool*](#createschool)
  - [*UpdateSchool*](#updateschool)
  - [*CreateClass*](#createclass)
  - [*UpdateClass*](#updateclass)
  - [*DeleteClass*](#deleteclass)
  - [*CreateSubject*](#createsubject)
  - [*UpdateSubject*](#updatesubject)
  - [*DeleteSubject*](#deletesubject)
  - [*CreateChapter*](#createchapter)
  - [*UpdateChapter*](#updatechapter)
  - [*DeleteChapter*](#deletechapter)
  - [*CreateLesson*](#createlesson)
  - [*UpdateLesson*](#updatelesson)
  - [*DeleteLesson*](#deletelesson)
  - [*CreateTeacher*](#createteacher)
  - [*UpdateTeacher*](#updateteacher)
  - [*DeleteTeacher*](#deleteteacher)
  - [*AssignSubjectToClass*](#assignsubjecttoclass)
  - [*RemoveSubjectFromClass*](#removesubjectfromclass)
  - [*AssignTeacherToClass*](#assignteachertoclass)
  - [*RemoveTeacherFromClass*](#removeteacherfromclass)
  - [*AssignTeacherToSubject*](#assignteachertosubject)
  - [*RemoveTeacherFromSubject*](#removeteacherfromsubject)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@firebasegen/default-connector';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@firebasegen/default-connector';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetSchoolById
You can execute the `GetSchoolById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getSchoolById(vars: GetSchoolByIdVariables): QueryPromise<GetSchoolByIdData, GetSchoolByIdVariables>;

interface GetSchoolByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSchoolByIdVariables): QueryRef<GetSchoolByIdData, GetSchoolByIdVariables>;
}
export const getSchoolByIdRef: GetSchoolByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSchoolById(dc: DataConnect, vars: GetSchoolByIdVariables): QueryPromise<GetSchoolByIdData, GetSchoolByIdVariables>;

interface GetSchoolByIdRef {
  ...
  (dc: DataConnect, vars: GetSchoolByIdVariables): QueryRef<GetSchoolByIdData, GetSchoolByIdVariables>;
}
export const getSchoolByIdRef: GetSchoolByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSchoolByIdRef:
```typescript
const name = getSchoolByIdRef.operationName;
console.log(name);
```

### Variables
The `GetSchoolById` query requires an argument of type `GetSchoolByIdVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSchoolByIdVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `GetSchoolById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSchoolByIdData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetSchoolById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSchoolById, GetSchoolByIdVariables } from '@firebasegen/default-connector';

// The `GetSchoolById` query requires an argument of type `GetSchoolByIdVariables`:
const getSchoolByIdVars: GetSchoolByIdVariables = {
  schoolId: ..., 
};

// Call the `getSchoolById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSchoolById(getSchoolByIdVars);
// Variables can be defined inline as well.
const { data } = await getSchoolById({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSchoolById(dataConnect, getSchoolByIdVars);

console.log(data.school);

// Or, you can use the `Promise` API.
getSchoolById(getSchoolByIdVars).then((response) => {
  const data = response.data;
  console.log(data.school);
});
```

### Using `GetSchoolById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSchoolByIdRef, GetSchoolByIdVariables } from '@firebasegen/default-connector';

// The `GetSchoolById` query requires an argument of type `GetSchoolByIdVariables`:
const getSchoolByIdVars: GetSchoolByIdVariables = {
  schoolId: ..., 
};

// Call the `getSchoolByIdRef()` function to get a reference to the query.
const ref = getSchoolByIdRef(getSchoolByIdVars);
// Variables can be defined inline as well.
const ref = getSchoolByIdRef({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSchoolByIdRef(dataConnect, getSchoolByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.school);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.school);
});
```

## ListClassesBySchool
You can execute the `ListClassesBySchool` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listClassesBySchool(vars: ListClassesBySchoolVariables): QueryPromise<ListClassesBySchoolData, ListClassesBySchoolVariables>;

interface ListClassesBySchoolRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListClassesBySchoolVariables): QueryRef<ListClassesBySchoolData, ListClassesBySchoolVariables>;
}
export const listClassesBySchoolRef: ListClassesBySchoolRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listClassesBySchool(dc: DataConnect, vars: ListClassesBySchoolVariables): QueryPromise<ListClassesBySchoolData, ListClassesBySchoolVariables>;

interface ListClassesBySchoolRef {
  ...
  (dc: DataConnect, vars: ListClassesBySchoolVariables): QueryRef<ListClassesBySchoolData, ListClassesBySchoolVariables>;
}
export const listClassesBySchoolRef: ListClassesBySchoolRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listClassesBySchoolRef:
```typescript
const name = listClassesBySchoolRef.operationName;
console.log(name);
```

### Variables
The `ListClassesBySchool` query requires an argument of type `ListClassesBySchoolVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListClassesBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `ListClassesBySchool` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListClassesBySchoolData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListClassesBySchool`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listClassesBySchool, ListClassesBySchoolVariables } from '@firebasegen/default-connector';

// The `ListClassesBySchool` query requires an argument of type `ListClassesBySchoolVariables`:
const listClassesBySchoolVars: ListClassesBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listClassesBySchool()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listClassesBySchool(listClassesBySchoolVars);
// Variables can be defined inline as well.
const { data } = await listClassesBySchool({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listClassesBySchool(dataConnect, listClassesBySchoolVars);

console.log(data.classes);

// Or, you can use the `Promise` API.
listClassesBySchool(listClassesBySchoolVars).then((response) => {
  const data = response.data;
  console.log(data.classes);
});
```

### Using `ListClassesBySchool`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listClassesBySchoolRef, ListClassesBySchoolVariables } from '@firebasegen/default-connector';

// The `ListClassesBySchool` query requires an argument of type `ListClassesBySchoolVariables`:
const listClassesBySchoolVars: ListClassesBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listClassesBySchoolRef()` function to get a reference to the query.
const ref = listClassesBySchoolRef(listClassesBySchoolVars);
// Variables can be defined inline as well.
const ref = listClassesBySchoolRef({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listClassesBySchoolRef(dataConnect, listClassesBySchoolVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.classes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.classes);
});
```

## ListSubjectsBySchool
You can execute the `ListSubjectsBySchool` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listSubjectsBySchool(vars: ListSubjectsBySchoolVariables): QueryPromise<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;

interface ListSubjectsBySchoolRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListSubjectsBySchoolVariables): QueryRef<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;
}
export const listSubjectsBySchoolRef: ListSubjectsBySchoolRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSubjectsBySchool(dc: DataConnect, vars: ListSubjectsBySchoolVariables): QueryPromise<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;

interface ListSubjectsBySchoolRef {
  ...
  (dc: DataConnect, vars: ListSubjectsBySchoolVariables): QueryRef<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;
}
export const listSubjectsBySchoolRef: ListSubjectsBySchoolRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSubjectsBySchoolRef:
```typescript
const name = listSubjectsBySchoolRef.operationName;
console.log(name);
```

### Variables
The `ListSubjectsBySchool` query requires an argument of type `ListSubjectsBySchoolVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListSubjectsBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `ListSubjectsBySchool` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSubjectsBySchoolData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListSubjectsBySchool`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSubjectsBySchool, ListSubjectsBySchoolVariables } from '@firebasegen/default-connector';

// The `ListSubjectsBySchool` query requires an argument of type `ListSubjectsBySchoolVariables`:
const listSubjectsBySchoolVars: ListSubjectsBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listSubjectsBySchool()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSubjectsBySchool(listSubjectsBySchoolVars);
// Variables can be defined inline as well.
const { data } = await listSubjectsBySchool({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSubjectsBySchool(dataConnect, listSubjectsBySchoolVars);

console.log(data.subjects);

// Or, you can use the `Promise` API.
listSubjectsBySchool(listSubjectsBySchoolVars).then((response) => {
  const data = response.data;
  console.log(data.subjects);
});
```

### Using `ListSubjectsBySchool`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSubjectsBySchoolRef, ListSubjectsBySchoolVariables } from '@firebasegen/default-connector';

// The `ListSubjectsBySchool` query requires an argument of type `ListSubjectsBySchoolVariables`:
const listSubjectsBySchoolVars: ListSubjectsBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listSubjectsBySchoolRef()` function to get a reference to the query.
const ref = listSubjectsBySchoolRef(listSubjectsBySchoolVars);
// Variables can be defined inline as well.
const ref = listSubjectsBySchoolRef({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSubjectsBySchoolRef(dataConnect, listSubjectsBySchoolVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.subjects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.subjects);
});
```

## ListChaptersBySubject
You can execute the `ListChaptersBySubject` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listChaptersBySubject(vars: ListChaptersBySubjectVariables): QueryPromise<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;

interface ListChaptersBySubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListChaptersBySubjectVariables): QueryRef<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;
}
export const listChaptersBySubjectRef: ListChaptersBySubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listChaptersBySubject(dc: DataConnect, vars: ListChaptersBySubjectVariables): QueryPromise<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;

interface ListChaptersBySubjectRef {
  ...
  (dc: DataConnect, vars: ListChaptersBySubjectVariables): QueryRef<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;
}
export const listChaptersBySubjectRef: ListChaptersBySubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listChaptersBySubjectRef:
```typescript
const name = listChaptersBySubjectRef.operationName;
console.log(name);
```

### Variables
The `ListChaptersBySubject` query requires an argument of type `ListChaptersBySubjectVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListChaptersBySubjectVariables {
  subjectId: UUIDString;
}
```
### Return Type
Recall that executing the `ListChaptersBySubject` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListChaptersBySubjectData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListChaptersBySubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listChaptersBySubject, ListChaptersBySubjectVariables } from '@firebasegen/default-connector';

// The `ListChaptersBySubject` query requires an argument of type `ListChaptersBySubjectVariables`:
const listChaptersBySubjectVars: ListChaptersBySubjectVariables = {
  subjectId: ..., 
};

// Call the `listChaptersBySubject()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listChaptersBySubject(listChaptersBySubjectVars);
// Variables can be defined inline as well.
const { data } = await listChaptersBySubject({ subjectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listChaptersBySubject(dataConnect, listChaptersBySubjectVars);

console.log(data.chapters);

// Or, you can use the `Promise` API.
listChaptersBySubject(listChaptersBySubjectVars).then((response) => {
  const data = response.data;
  console.log(data.chapters);
});
```

### Using `ListChaptersBySubject`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listChaptersBySubjectRef, ListChaptersBySubjectVariables } from '@firebasegen/default-connector';

// The `ListChaptersBySubject` query requires an argument of type `ListChaptersBySubjectVariables`:
const listChaptersBySubjectVars: ListChaptersBySubjectVariables = {
  subjectId: ..., 
};

// Call the `listChaptersBySubjectRef()` function to get a reference to the query.
const ref = listChaptersBySubjectRef(listChaptersBySubjectVars);
// Variables can be defined inline as well.
const ref = listChaptersBySubjectRef({ subjectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listChaptersBySubjectRef(dataConnect, listChaptersBySubjectVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.chapters);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.chapters);
});
```

## ListLessonsByChapter
You can execute the `ListLessonsByChapter` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listLessonsByChapter(vars: ListLessonsByChapterVariables): QueryPromise<ListLessonsByChapterData, ListLessonsByChapterVariables>;

interface ListLessonsByChapterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListLessonsByChapterVariables): QueryRef<ListLessonsByChapterData, ListLessonsByChapterVariables>;
}
export const listLessonsByChapterRef: ListLessonsByChapterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listLessonsByChapter(dc: DataConnect, vars: ListLessonsByChapterVariables): QueryPromise<ListLessonsByChapterData, ListLessonsByChapterVariables>;

interface ListLessonsByChapterRef {
  ...
  (dc: DataConnect, vars: ListLessonsByChapterVariables): QueryRef<ListLessonsByChapterData, ListLessonsByChapterVariables>;
}
export const listLessonsByChapterRef: ListLessonsByChapterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listLessonsByChapterRef:
```typescript
const name = listLessonsByChapterRef.operationName;
console.log(name);
```

### Variables
The `ListLessonsByChapter` query requires an argument of type `ListLessonsByChapterVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListLessonsByChapterVariables {
  chapterId: UUIDString;
}
```
### Return Type
Recall that executing the `ListLessonsByChapter` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListLessonsByChapterData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListLessonsByChapter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listLessonsByChapter, ListLessonsByChapterVariables } from '@firebasegen/default-connector';

// The `ListLessonsByChapter` query requires an argument of type `ListLessonsByChapterVariables`:
const listLessonsByChapterVars: ListLessonsByChapterVariables = {
  chapterId: ..., 
};

// Call the `listLessonsByChapter()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listLessonsByChapter(listLessonsByChapterVars);
// Variables can be defined inline as well.
const { data } = await listLessonsByChapter({ chapterId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listLessonsByChapter(dataConnect, listLessonsByChapterVars);

console.log(data.lessons);

// Or, you can use the `Promise` API.
listLessonsByChapter(listLessonsByChapterVars).then((response) => {
  const data = response.data;
  console.log(data.lessons);
});
```

### Using `ListLessonsByChapter`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listLessonsByChapterRef, ListLessonsByChapterVariables } from '@firebasegen/default-connector';

// The `ListLessonsByChapter` query requires an argument of type `ListLessonsByChapterVariables`:
const listLessonsByChapterVars: ListLessonsByChapterVariables = {
  chapterId: ..., 
};

// Call the `listLessonsByChapterRef()` function to get a reference to the query.
const ref = listLessonsByChapterRef(listLessonsByChapterVars);
// Variables can be defined inline as well.
const ref = listLessonsByChapterRef({ chapterId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listLessonsByChapterRef(dataConnect, listLessonsByChapterVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.lessons);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.lessons);
});
```

## ListTeachersBySchool
You can execute the `ListTeachersBySchool` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listTeachersBySchool(vars: ListTeachersBySchoolVariables): QueryPromise<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;

interface ListTeachersBySchoolRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTeachersBySchoolVariables): QueryRef<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;
}
export const listTeachersBySchoolRef: ListTeachersBySchoolRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTeachersBySchool(dc: DataConnect, vars: ListTeachersBySchoolVariables): QueryPromise<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;

interface ListTeachersBySchoolRef {
  ...
  (dc: DataConnect, vars: ListTeachersBySchoolVariables): QueryRef<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;
}
export const listTeachersBySchoolRef: ListTeachersBySchoolRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTeachersBySchoolRef:
```typescript
const name = listTeachersBySchoolRef.operationName;
console.log(name);
```

### Variables
The `ListTeachersBySchool` query requires an argument of type `ListTeachersBySchoolVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTeachersBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTeachersBySchool` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTeachersBySchoolData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTeachersBySchool`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTeachersBySchool, ListTeachersBySchoolVariables } from '@firebasegen/default-connector';

// The `ListTeachersBySchool` query requires an argument of type `ListTeachersBySchoolVariables`:
const listTeachersBySchoolVars: ListTeachersBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listTeachersBySchool()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTeachersBySchool(listTeachersBySchoolVars);
// Variables can be defined inline as well.
const { data } = await listTeachersBySchool({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTeachersBySchool(dataConnect, listTeachersBySchoolVars);

console.log(data.teachers);

// Or, you can use the `Promise` API.
listTeachersBySchool(listTeachersBySchoolVars).then((response) => {
  const data = response.data;
  console.log(data.teachers);
});
```

### Using `ListTeachersBySchool`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTeachersBySchoolRef, ListTeachersBySchoolVariables } from '@firebasegen/default-connector';

// The `ListTeachersBySchool` query requires an argument of type `ListTeachersBySchoolVariables`:
const listTeachersBySchoolVars: ListTeachersBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listTeachersBySchoolRef()` function to get a reference to the query.
const ref = listTeachersBySchoolRef(listTeachersBySchoolVars);
// Variables can be defined inline as well.
const ref = listTeachersBySchoolRef({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTeachersBySchoolRef(dataConnect, listTeachersBySchoolVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teachers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teachers);
});
```

## ListClassSubjectsBySchool
You can execute the `ListClassSubjectsBySchool` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listClassSubjectsBySchool(vars: ListClassSubjectsBySchoolVariables): QueryPromise<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;

interface ListClassSubjectsBySchoolRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListClassSubjectsBySchoolVariables): QueryRef<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;
}
export const listClassSubjectsBySchoolRef: ListClassSubjectsBySchoolRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listClassSubjectsBySchool(dc: DataConnect, vars: ListClassSubjectsBySchoolVariables): QueryPromise<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;

interface ListClassSubjectsBySchoolRef {
  ...
  (dc: DataConnect, vars: ListClassSubjectsBySchoolVariables): QueryRef<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;
}
export const listClassSubjectsBySchoolRef: ListClassSubjectsBySchoolRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listClassSubjectsBySchoolRef:
```typescript
const name = listClassSubjectsBySchoolRef.operationName;
console.log(name);
```

### Variables
The `ListClassSubjectsBySchool` query requires an argument of type `ListClassSubjectsBySchoolVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListClassSubjectsBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `ListClassSubjectsBySchool` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListClassSubjectsBySchoolData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListClassSubjectsBySchool`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listClassSubjectsBySchool, ListClassSubjectsBySchoolVariables } from '@firebasegen/default-connector';

// The `ListClassSubjectsBySchool` query requires an argument of type `ListClassSubjectsBySchoolVariables`:
const listClassSubjectsBySchoolVars: ListClassSubjectsBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listClassSubjectsBySchool()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listClassSubjectsBySchool(listClassSubjectsBySchoolVars);
// Variables can be defined inline as well.
const { data } = await listClassSubjectsBySchool({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listClassSubjectsBySchool(dataConnect, listClassSubjectsBySchoolVars);

console.log(data.classSubjects);

// Or, you can use the `Promise` API.
listClassSubjectsBySchool(listClassSubjectsBySchoolVars).then((response) => {
  const data = response.data;
  console.log(data.classSubjects);
});
```

### Using `ListClassSubjectsBySchool`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listClassSubjectsBySchoolRef, ListClassSubjectsBySchoolVariables } from '@firebasegen/default-connector';

// The `ListClassSubjectsBySchool` query requires an argument of type `ListClassSubjectsBySchoolVariables`:
const listClassSubjectsBySchoolVars: ListClassSubjectsBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listClassSubjectsBySchoolRef()` function to get a reference to the query.
const ref = listClassSubjectsBySchoolRef(listClassSubjectsBySchoolVars);
// Variables can be defined inline as well.
const ref = listClassSubjectsBySchoolRef({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listClassSubjectsBySchoolRef(dataConnect, listClassSubjectsBySchoolVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.classSubjects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.classSubjects);
});
```

## ListTeacherClassesBySchool
You can execute the `ListTeacherClassesBySchool` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listTeacherClassesBySchool(vars: ListTeacherClassesBySchoolVariables): QueryPromise<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;

interface ListTeacherClassesBySchoolRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTeacherClassesBySchoolVariables): QueryRef<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;
}
export const listTeacherClassesBySchoolRef: ListTeacherClassesBySchoolRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTeacherClassesBySchool(dc: DataConnect, vars: ListTeacherClassesBySchoolVariables): QueryPromise<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;

interface ListTeacherClassesBySchoolRef {
  ...
  (dc: DataConnect, vars: ListTeacherClassesBySchoolVariables): QueryRef<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;
}
export const listTeacherClassesBySchoolRef: ListTeacherClassesBySchoolRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTeacherClassesBySchoolRef:
```typescript
const name = listTeacherClassesBySchoolRef.operationName;
console.log(name);
```

### Variables
The `ListTeacherClassesBySchool` query requires an argument of type `ListTeacherClassesBySchoolVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTeacherClassesBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTeacherClassesBySchool` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTeacherClassesBySchoolData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTeacherClassesBySchool`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTeacherClassesBySchool, ListTeacherClassesBySchoolVariables } from '@firebasegen/default-connector';

// The `ListTeacherClassesBySchool` query requires an argument of type `ListTeacherClassesBySchoolVariables`:
const listTeacherClassesBySchoolVars: ListTeacherClassesBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listTeacherClassesBySchool()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTeacherClassesBySchool(listTeacherClassesBySchoolVars);
// Variables can be defined inline as well.
const { data } = await listTeacherClassesBySchool({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTeacherClassesBySchool(dataConnect, listTeacherClassesBySchoolVars);

console.log(data.teacherClasses);

// Or, you can use the `Promise` API.
listTeacherClassesBySchool(listTeacherClassesBySchoolVars).then((response) => {
  const data = response.data;
  console.log(data.teacherClasses);
});
```

### Using `ListTeacherClassesBySchool`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTeacherClassesBySchoolRef, ListTeacherClassesBySchoolVariables } from '@firebasegen/default-connector';

// The `ListTeacherClassesBySchool` query requires an argument of type `ListTeacherClassesBySchoolVariables`:
const listTeacherClassesBySchoolVars: ListTeacherClassesBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listTeacherClassesBySchoolRef()` function to get a reference to the query.
const ref = listTeacherClassesBySchoolRef(listTeacherClassesBySchoolVars);
// Variables can be defined inline as well.
const ref = listTeacherClassesBySchoolRef({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTeacherClassesBySchoolRef(dataConnect, listTeacherClassesBySchoolVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teacherClasses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherClasses);
});
```

## ListTeacherSubjectsBySchool
You can execute the `ListTeacherSubjectsBySchool` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listTeacherSubjectsBySchool(vars: ListTeacherSubjectsBySchoolVariables): QueryPromise<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;

interface ListTeacherSubjectsBySchoolRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTeacherSubjectsBySchoolVariables): QueryRef<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;
}
export const listTeacherSubjectsBySchoolRef: ListTeacherSubjectsBySchoolRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTeacherSubjectsBySchool(dc: DataConnect, vars: ListTeacherSubjectsBySchoolVariables): QueryPromise<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;

interface ListTeacherSubjectsBySchoolRef {
  ...
  (dc: DataConnect, vars: ListTeacherSubjectsBySchoolVariables): QueryRef<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;
}
export const listTeacherSubjectsBySchoolRef: ListTeacherSubjectsBySchoolRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTeacherSubjectsBySchoolRef:
```typescript
const name = listTeacherSubjectsBySchoolRef.operationName;
console.log(name);
```

### Variables
The `ListTeacherSubjectsBySchool` query requires an argument of type `ListTeacherSubjectsBySchoolVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTeacherSubjectsBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTeacherSubjectsBySchool` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTeacherSubjectsBySchoolData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTeacherSubjectsBySchool`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTeacherSubjectsBySchool, ListTeacherSubjectsBySchoolVariables } from '@firebasegen/default-connector';

// The `ListTeacherSubjectsBySchool` query requires an argument of type `ListTeacherSubjectsBySchoolVariables`:
const listTeacherSubjectsBySchoolVars: ListTeacherSubjectsBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listTeacherSubjectsBySchool()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTeacherSubjectsBySchool(listTeacherSubjectsBySchoolVars);
// Variables can be defined inline as well.
const { data } = await listTeacherSubjectsBySchool({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTeacherSubjectsBySchool(dataConnect, listTeacherSubjectsBySchoolVars);

console.log(data.teacherSubjects);

// Or, you can use the `Promise` API.
listTeacherSubjectsBySchool(listTeacherSubjectsBySchoolVars).then((response) => {
  const data = response.data;
  console.log(data.teacherSubjects);
});
```

### Using `ListTeacherSubjectsBySchool`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTeacherSubjectsBySchoolRef, ListTeacherSubjectsBySchoolVariables } from '@firebasegen/default-connector';

// The `ListTeacherSubjectsBySchool` query requires an argument of type `ListTeacherSubjectsBySchoolVariables`:
const listTeacherSubjectsBySchoolVars: ListTeacherSubjectsBySchoolVariables = {
  schoolId: ..., 
};

// Call the `listTeacherSubjectsBySchoolRef()` function to get a reference to the query.
const ref = listTeacherSubjectsBySchoolRef(listTeacherSubjectsBySchoolVars);
// Variables can be defined inline as well.
const ref = listTeacherSubjectsBySchoolRef({ schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTeacherSubjectsBySchoolRef(dataConnect, listTeacherSubjectsBySchoolVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teacherSubjects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherSubjects);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  email: string;
  displayName?: string | null;
  role?: string | null;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@firebasegen/default-connector';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  email: ..., 
  displayName: ..., // optional
  role: ..., // optional
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ email: ..., displayName: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@firebasegen/default-connector';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  email: ..., 
  displayName: ..., // optional
  role: ..., // optional
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ email: ..., displayName: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## CreateSchool
You can execute the `CreateSchool` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createSchool(vars: CreateSchoolVariables): MutationPromise<CreateSchoolData, CreateSchoolVariables>;

interface CreateSchoolRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSchoolVariables): MutationRef<CreateSchoolData, CreateSchoolVariables>;
}
export const createSchoolRef: CreateSchoolRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSchool(dc: DataConnect, vars: CreateSchoolVariables): MutationPromise<CreateSchoolData, CreateSchoolVariables>;

interface CreateSchoolRef {
  ...
  (dc: DataConnect, vars: CreateSchoolVariables): MutationRef<CreateSchoolData, CreateSchoolVariables>;
}
export const createSchoolRef: CreateSchoolRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSchoolRef:
```typescript
const name = createSchoolRef.operationName;
console.log(name);
```

### Variables
The `CreateSchool` mutation requires an argument of type `CreateSchoolVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSchoolVariables {
  name: string;
  address?: string | null;
  contact?: string | null;
  isBranch?: boolean | null;
  mainBranchId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateSchool` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSchoolData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSchoolData {
  school_insert: School_Key;
}
```
### Using `CreateSchool`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSchool, CreateSchoolVariables } from '@firebasegen/default-connector';

// The `CreateSchool` mutation requires an argument of type `CreateSchoolVariables`:
const createSchoolVars: CreateSchoolVariables = {
  name: ..., 
  address: ..., // optional
  contact: ..., // optional
  isBranch: ..., // optional
  mainBranchId: ..., // optional
};

// Call the `createSchool()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSchool(createSchoolVars);
// Variables can be defined inline as well.
const { data } = await createSchool({ name: ..., address: ..., contact: ..., isBranch: ..., mainBranchId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSchool(dataConnect, createSchoolVars);

console.log(data.school_insert);

// Or, you can use the `Promise` API.
createSchool(createSchoolVars).then((response) => {
  const data = response.data;
  console.log(data.school_insert);
});
```

### Using `CreateSchool`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSchoolRef, CreateSchoolVariables } from '@firebasegen/default-connector';

// The `CreateSchool` mutation requires an argument of type `CreateSchoolVariables`:
const createSchoolVars: CreateSchoolVariables = {
  name: ..., 
  address: ..., // optional
  contact: ..., // optional
  isBranch: ..., // optional
  mainBranchId: ..., // optional
};

// Call the `createSchoolRef()` function to get a reference to the mutation.
const ref = createSchoolRef(createSchoolVars);
// Variables can be defined inline as well.
const ref = createSchoolRef({ name: ..., address: ..., contact: ..., isBranch: ..., mainBranchId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSchoolRef(dataConnect, createSchoolVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.school_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.school_insert);
});
```

## UpdateSchool
You can execute the `UpdateSchool` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateSchool(vars: UpdateSchoolVariables): MutationPromise<UpdateSchoolData, UpdateSchoolVariables>;

interface UpdateSchoolRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSchoolVariables): MutationRef<UpdateSchoolData, UpdateSchoolVariables>;
}
export const updateSchoolRef: UpdateSchoolRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSchool(dc: DataConnect, vars: UpdateSchoolVariables): MutationPromise<UpdateSchoolData, UpdateSchoolVariables>;

interface UpdateSchoolRef {
  ...
  (dc: DataConnect, vars: UpdateSchoolVariables): MutationRef<UpdateSchoolData, UpdateSchoolVariables>;
}
export const updateSchoolRef: UpdateSchoolRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSchoolRef:
```typescript
const name = updateSchoolRef.operationName;
console.log(name);
```

### Variables
The `UpdateSchool` mutation requires an argument of type `UpdateSchoolVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSchoolVariables {
  schoolId: UUIDString;
  name?: string | null;
  address?: string | null;
  contact?: string | null;
}
```
### Return Type
Recall that executing the `UpdateSchool` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSchoolData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSchoolData {
  school_update?: School_Key | null;
}
```
### Using `UpdateSchool`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSchool, UpdateSchoolVariables } from '@firebasegen/default-connector';

// The `UpdateSchool` mutation requires an argument of type `UpdateSchoolVariables`:
const updateSchoolVars: UpdateSchoolVariables = {
  schoolId: ..., 
  name: ..., // optional
  address: ..., // optional
  contact: ..., // optional
};

// Call the `updateSchool()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSchool(updateSchoolVars);
// Variables can be defined inline as well.
const { data } = await updateSchool({ schoolId: ..., name: ..., address: ..., contact: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSchool(dataConnect, updateSchoolVars);

console.log(data.school_update);

// Or, you can use the `Promise` API.
updateSchool(updateSchoolVars).then((response) => {
  const data = response.data;
  console.log(data.school_update);
});
```

### Using `UpdateSchool`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSchoolRef, UpdateSchoolVariables } from '@firebasegen/default-connector';

// The `UpdateSchool` mutation requires an argument of type `UpdateSchoolVariables`:
const updateSchoolVars: UpdateSchoolVariables = {
  schoolId: ..., 
  name: ..., // optional
  address: ..., // optional
  contact: ..., // optional
};

// Call the `updateSchoolRef()` function to get a reference to the mutation.
const ref = updateSchoolRef(updateSchoolVars);
// Variables can be defined inline as well.
const ref = updateSchoolRef({ schoolId: ..., name: ..., address: ..., contact: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSchoolRef(dataConnect, updateSchoolVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.school_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.school_update);
});
```

## CreateClass
You can execute the `CreateClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createClass(vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface CreateClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
}
export const createClassRef: CreateClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createClass(dc: DataConnect, vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface CreateClassRef {
  ...
  (dc: DataConnect, vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
}
export const createClassRef: CreateClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createClassRef:
```typescript
const name = createClassRef.operationName;
console.log(name);
```

### Variables
The `CreateClass` mutation requires an argument of type `CreateClassVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateClassVariables {
  name: string;
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateClassData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateClassData {
  class_insert: Class_Key;
}
```
### Using `CreateClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createClass, CreateClassVariables } from '@firebasegen/default-connector';

// The `CreateClass` mutation requires an argument of type `CreateClassVariables`:
const createClassVars: CreateClassVariables = {
  name: ..., 
  schoolId: ..., 
};

// Call the `createClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createClass(createClassVars);
// Variables can be defined inline as well.
const { data } = await createClass({ name: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createClass(dataConnect, createClassVars);

console.log(data.class_insert);

// Or, you can use the `Promise` API.
createClass(createClassVars).then((response) => {
  const data = response.data;
  console.log(data.class_insert);
});
```

### Using `CreateClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createClassRef, CreateClassVariables } from '@firebasegen/default-connector';

// The `CreateClass` mutation requires an argument of type `CreateClassVariables`:
const createClassVars: CreateClassVariables = {
  name: ..., 
  schoolId: ..., 
};

// Call the `createClassRef()` function to get a reference to the mutation.
const ref = createClassRef(createClassVars);
// Variables can be defined inline as well.
const ref = createClassRef({ name: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createClassRef(dataConnect, createClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.class_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.class_insert);
});
```

## UpdateClass
You can execute the `UpdateClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateClass(vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;

interface UpdateClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
}
export const updateClassRef: UpdateClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateClass(dc: DataConnect, vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;

interface UpdateClassRef {
  ...
  (dc: DataConnect, vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
}
export const updateClassRef: UpdateClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateClassRef:
```typescript
const name = updateClassRef.operationName;
console.log(name);
```

### Variables
The `UpdateClass` mutation requires an argument of type `UpdateClassVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateClassVariables {
  classId: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateClassData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateClassData {
  class_update?: Class_Key | null;
}
```
### Using `UpdateClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateClass, UpdateClassVariables } from '@firebasegen/default-connector';

// The `UpdateClass` mutation requires an argument of type `UpdateClassVariables`:
const updateClassVars: UpdateClassVariables = {
  classId: ..., 
  name: ..., 
};

// Call the `updateClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateClass(updateClassVars);
// Variables can be defined inline as well.
const { data } = await updateClass({ classId: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateClass(dataConnect, updateClassVars);

console.log(data.class_update);

// Or, you can use the `Promise` API.
updateClass(updateClassVars).then((response) => {
  const data = response.data;
  console.log(data.class_update);
});
```

### Using `UpdateClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateClassRef, UpdateClassVariables } from '@firebasegen/default-connector';

// The `UpdateClass` mutation requires an argument of type `UpdateClassVariables`:
const updateClassVars: UpdateClassVariables = {
  classId: ..., 
  name: ..., 
};

// Call the `updateClassRef()` function to get a reference to the mutation.
const ref = updateClassRef(updateClassVars);
// Variables can be defined inline as well.
const ref = updateClassRef({ classId: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateClassRef(dataConnect, updateClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.class_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.class_update);
});
```

## DeleteClass
You can execute the `DeleteClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteClass(vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;

interface DeleteClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
}
export const deleteClassRef: DeleteClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteClass(dc: DataConnect, vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;

interface DeleteClassRef {
  ...
  (dc: DataConnect, vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
}
export const deleteClassRef: DeleteClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteClassRef:
```typescript
const name = deleteClassRef.operationName;
console.log(name);
```

### Variables
The `DeleteClass` mutation requires an argument of type `DeleteClassVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteClassVariables {
  classId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteClassData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteClassData {
  class_delete?: Class_Key | null;
}
```
### Using `DeleteClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteClass, DeleteClassVariables } from '@firebasegen/default-connector';

// The `DeleteClass` mutation requires an argument of type `DeleteClassVariables`:
const deleteClassVars: DeleteClassVariables = {
  classId: ..., 
};

// Call the `deleteClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteClass(deleteClassVars);
// Variables can be defined inline as well.
const { data } = await deleteClass({ classId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteClass(dataConnect, deleteClassVars);

console.log(data.class_delete);

// Or, you can use the `Promise` API.
deleteClass(deleteClassVars).then((response) => {
  const data = response.data;
  console.log(data.class_delete);
});
```

### Using `DeleteClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteClassRef, DeleteClassVariables } from '@firebasegen/default-connector';

// The `DeleteClass` mutation requires an argument of type `DeleteClassVariables`:
const deleteClassVars: DeleteClassVariables = {
  classId: ..., 
};

// Call the `deleteClassRef()` function to get a reference to the mutation.
const ref = deleteClassRef(deleteClassVars);
// Variables can be defined inline as well.
const ref = deleteClassRef({ classId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteClassRef(dataConnect, deleteClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.class_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.class_delete);
});
```

## CreateSubject
You can execute the `CreateSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createSubject(vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;

interface CreateSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
}
export const createSubjectRef: CreateSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSubject(dc: DataConnect, vars: CreateSubjectVariables): MutationPromise<CreateSubjectData, CreateSubjectVariables>;

interface CreateSubjectRef {
  ...
  (dc: DataConnect, vars: CreateSubjectVariables): MutationRef<CreateSubjectData, CreateSubjectVariables>;
}
export const createSubjectRef: CreateSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSubjectRef:
```typescript
const name = createSubjectRef.operationName;
console.log(name);
```

### Variables
The `CreateSubject` mutation requires an argument of type `CreateSubjectVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSubjectVariables {
  name: string;
  description?: string | null;
  image?: string | null;
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSubjectData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSubjectData {
  subject_insert: Subject_Key;
}
```
### Using `CreateSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSubject, CreateSubjectVariables } from '@firebasegen/default-connector';

// The `CreateSubject` mutation requires an argument of type `CreateSubjectVariables`:
const createSubjectVars: CreateSubjectVariables = {
  name: ..., 
  description: ..., // optional
  image: ..., // optional
  schoolId: ..., 
};

// Call the `createSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSubject(createSubjectVars);
// Variables can be defined inline as well.
const { data } = await createSubject({ name: ..., description: ..., image: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSubject(dataConnect, createSubjectVars);

console.log(data.subject_insert);

// Or, you can use the `Promise` API.
createSubject(createSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.subject_insert);
});
```

### Using `CreateSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSubjectRef, CreateSubjectVariables } from '@firebasegen/default-connector';

// The `CreateSubject` mutation requires an argument of type `CreateSubjectVariables`:
const createSubjectVars: CreateSubjectVariables = {
  name: ..., 
  description: ..., // optional
  image: ..., // optional
  schoolId: ..., 
};

// Call the `createSubjectRef()` function to get a reference to the mutation.
const ref = createSubjectRef(createSubjectVars);
// Variables can be defined inline as well.
const ref = createSubjectRef({ name: ..., description: ..., image: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSubjectRef(dataConnect, createSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subject_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subject_insert);
});
```

## UpdateSubject
You can execute the `UpdateSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateSubject(vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;

interface UpdateSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
}
export const updateSubjectRef: UpdateSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSubject(dc: DataConnect, vars: UpdateSubjectVariables): MutationPromise<UpdateSubjectData, UpdateSubjectVariables>;

interface UpdateSubjectRef {
  ...
  (dc: DataConnect, vars: UpdateSubjectVariables): MutationRef<UpdateSubjectData, UpdateSubjectVariables>;
}
export const updateSubjectRef: UpdateSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSubjectRef:
```typescript
const name = updateSubjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateSubject` mutation requires an argument of type `UpdateSubjectVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSubjectVariables {
  subjectId: UUIDString;
  name?: string | null;
  description?: string | null;
  image?: string | null;
}
```
### Return Type
Recall that executing the `UpdateSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSubjectData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSubjectData {
  subject_update?: Subject_Key | null;
}
```
### Using `UpdateSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSubject, UpdateSubjectVariables } from '@firebasegen/default-connector';

// The `UpdateSubject` mutation requires an argument of type `UpdateSubjectVariables`:
const updateSubjectVars: UpdateSubjectVariables = {
  subjectId: ..., 
  name: ..., // optional
  description: ..., // optional
  image: ..., // optional
};

// Call the `updateSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSubject(updateSubjectVars);
// Variables can be defined inline as well.
const { data } = await updateSubject({ subjectId: ..., name: ..., description: ..., image: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSubject(dataConnect, updateSubjectVars);

console.log(data.subject_update);

// Or, you can use the `Promise` API.
updateSubject(updateSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.subject_update);
});
```

### Using `UpdateSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSubjectRef, UpdateSubjectVariables } from '@firebasegen/default-connector';

// The `UpdateSubject` mutation requires an argument of type `UpdateSubjectVariables`:
const updateSubjectVars: UpdateSubjectVariables = {
  subjectId: ..., 
  name: ..., // optional
  description: ..., // optional
  image: ..., // optional
};

// Call the `updateSubjectRef()` function to get a reference to the mutation.
const ref = updateSubjectRef(updateSubjectVars);
// Variables can be defined inline as well.
const ref = updateSubjectRef({ subjectId: ..., name: ..., description: ..., image: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSubjectRef(dataConnect, updateSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subject_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subject_update);
});
```

## DeleteSubject
You can execute the `DeleteSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteSubject(vars: DeleteSubjectVariables): MutationPromise<DeleteSubjectData, DeleteSubjectVariables>;

interface DeleteSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubjectVariables): MutationRef<DeleteSubjectData, DeleteSubjectVariables>;
}
export const deleteSubjectRef: DeleteSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSubject(dc: DataConnect, vars: DeleteSubjectVariables): MutationPromise<DeleteSubjectData, DeleteSubjectVariables>;

interface DeleteSubjectRef {
  ...
  (dc: DataConnect, vars: DeleteSubjectVariables): MutationRef<DeleteSubjectData, DeleteSubjectVariables>;
}
export const deleteSubjectRef: DeleteSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSubjectRef:
```typescript
const name = deleteSubjectRef.operationName;
console.log(name);
```

### Variables
The `DeleteSubject` mutation requires an argument of type `DeleteSubjectVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSubjectVariables {
  subjectId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSubjectData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSubjectData {
  subject_delete?: Subject_Key | null;
}
```
### Using `DeleteSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSubject, DeleteSubjectVariables } from '@firebasegen/default-connector';

// The `DeleteSubject` mutation requires an argument of type `DeleteSubjectVariables`:
const deleteSubjectVars: DeleteSubjectVariables = {
  subjectId: ..., 
};

// Call the `deleteSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSubject(deleteSubjectVars);
// Variables can be defined inline as well.
const { data } = await deleteSubject({ subjectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSubject(dataConnect, deleteSubjectVars);

console.log(data.subject_delete);

// Or, you can use the `Promise` API.
deleteSubject(deleteSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.subject_delete);
});
```

### Using `DeleteSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSubjectRef, DeleteSubjectVariables } from '@firebasegen/default-connector';

// The `DeleteSubject` mutation requires an argument of type `DeleteSubjectVariables`:
const deleteSubjectVars: DeleteSubjectVariables = {
  subjectId: ..., 
};

// Call the `deleteSubjectRef()` function to get a reference to the mutation.
const ref = deleteSubjectRef(deleteSubjectVars);
// Variables can be defined inline as well.
const ref = deleteSubjectRef({ subjectId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSubjectRef(dataConnect, deleteSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subject_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subject_delete);
});
```

## CreateChapter
You can execute the `CreateChapter` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createChapter(vars: CreateChapterVariables): MutationPromise<CreateChapterData, CreateChapterVariables>;

interface CreateChapterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateChapterVariables): MutationRef<CreateChapterData, CreateChapterVariables>;
}
export const createChapterRef: CreateChapterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createChapter(dc: DataConnect, vars: CreateChapterVariables): MutationPromise<CreateChapterData, CreateChapterVariables>;

interface CreateChapterRef {
  ...
  (dc: DataConnect, vars: CreateChapterVariables): MutationRef<CreateChapterData, CreateChapterVariables>;
}
export const createChapterRef: CreateChapterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createChapterRef:
```typescript
const name = createChapterRef.operationName;
console.log(name);
```

### Variables
The `CreateChapter` mutation requires an argument of type `CreateChapterVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateChapterVariables {
  name: string;
  description?: string | null;
  subjectId: UUIDString;
  schoolId: UUIDString;
  orderIndex?: number | null;
}
```
### Return Type
Recall that executing the `CreateChapter` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateChapterData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateChapterData {
  chapter_insert: Chapter_Key;
}
```
### Using `CreateChapter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createChapter, CreateChapterVariables } from '@firebasegen/default-connector';

// The `CreateChapter` mutation requires an argument of type `CreateChapterVariables`:
const createChapterVars: CreateChapterVariables = {
  name: ..., 
  description: ..., // optional
  subjectId: ..., 
  schoolId: ..., 
  orderIndex: ..., // optional
};

// Call the `createChapter()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createChapter(createChapterVars);
// Variables can be defined inline as well.
const { data } = await createChapter({ name: ..., description: ..., subjectId: ..., schoolId: ..., orderIndex: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createChapter(dataConnect, createChapterVars);

console.log(data.chapter_insert);

// Or, you can use the `Promise` API.
createChapter(createChapterVars).then((response) => {
  const data = response.data;
  console.log(data.chapter_insert);
});
```

### Using `CreateChapter`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createChapterRef, CreateChapterVariables } from '@firebasegen/default-connector';

// The `CreateChapter` mutation requires an argument of type `CreateChapterVariables`:
const createChapterVars: CreateChapterVariables = {
  name: ..., 
  description: ..., // optional
  subjectId: ..., 
  schoolId: ..., 
  orderIndex: ..., // optional
};

// Call the `createChapterRef()` function to get a reference to the mutation.
const ref = createChapterRef(createChapterVars);
// Variables can be defined inline as well.
const ref = createChapterRef({ name: ..., description: ..., subjectId: ..., schoolId: ..., orderIndex: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createChapterRef(dataConnect, createChapterVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.chapter_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.chapter_insert);
});
```

## UpdateChapter
You can execute the `UpdateChapter` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateChapter(vars: UpdateChapterVariables): MutationPromise<UpdateChapterData, UpdateChapterVariables>;

interface UpdateChapterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateChapterVariables): MutationRef<UpdateChapterData, UpdateChapterVariables>;
}
export const updateChapterRef: UpdateChapterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateChapter(dc: DataConnect, vars: UpdateChapterVariables): MutationPromise<UpdateChapterData, UpdateChapterVariables>;

interface UpdateChapterRef {
  ...
  (dc: DataConnect, vars: UpdateChapterVariables): MutationRef<UpdateChapterData, UpdateChapterVariables>;
}
export const updateChapterRef: UpdateChapterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateChapterRef:
```typescript
const name = updateChapterRef.operationName;
console.log(name);
```

### Variables
The `UpdateChapter` mutation requires an argument of type `UpdateChapterVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateChapterVariables {
  chapterId: UUIDString;
  name?: string | null;
  description?: string | null;
  orderIndex?: number | null;
}
```
### Return Type
Recall that executing the `UpdateChapter` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateChapterData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateChapterData {
  chapter_update?: Chapter_Key | null;
}
```
### Using `UpdateChapter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateChapter, UpdateChapterVariables } from '@firebasegen/default-connector';

// The `UpdateChapter` mutation requires an argument of type `UpdateChapterVariables`:
const updateChapterVars: UpdateChapterVariables = {
  chapterId: ..., 
  name: ..., // optional
  description: ..., // optional
  orderIndex: ..., // optional
};

// Call the `updateChapter()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateChapter(updateChapterVars);
// Variables can be defined inline as well.
const { data } = await updateChapter({ chapterId: ..., name: ..., description: ..., orderIndex: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateChapter(dataConnect, updateChapterVars);

console.log(data.chapter_update);

// Or, you can use the `Promise` API.
updateChapter(updateChapterVars).then((response) => {
  const data = response.data;
  console.log(data.chapter_update);
});
```

### Using `UpdateChapter`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateChapterRef, UpdateChapterVariables } from '@firebasegen/default-connector';

// The `UpdateChapter` mutation requires an argument of type `UpdateChapterVariables`:
const updateChapterVars: UpdateChapterVariables = {
  chapterId: ..., 
  name: ..., // optional
  description: ..., // optional
  orderIndex: ..., // optional
};

// Call the `updateChapterRef()` function to get a reference to the mutation.
const ref = updateChapterRef(updateChapterVars);
// Variables can be defined inline as well.
const ref = updateChapterRef({ chapterId: ..., name: ..., description: ..., orderIndex: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateChapterRef(dataConnect, updateChapterVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.chapter_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.chapter_update);
});
```

## DeleteChapter
You can execute the `DeleteChapter` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteChapter(vars: DeleteChapterVariables): MutationPromise<DeleteChapterData, DeleteChapterVariables>;

interface DeleteChapterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteChapterVariables): MutationRef<DeleteChapterData, DeleteChapterVariables>;
}
export const deleteChapterRef: DeleteChapterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteChapter(dc: DataConnect, vars: DeleteChapterVariables): MutationPromise<DeleteChapterData, DeleteChapterVariables>;

interface DeleteChapterRef {
  ...
  (dc: DataConnect, vars: DeleteChapterVariables): MutationRef<DeleteChapterData, DeleteChapterVariables>;
}
export const deleteChapterRef: DeleteChapterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteChapterRef:
```typescript
const name = deleteChapterRef.operationName;
console.log(name);
```

### Variables
The `DeleteChapter` mutation requires an argument of type `DeleteChapterVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteChapterVariables {
  chapterId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteChapter` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteChapterData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteChapterData {
  chapter_delete?: Chapter_Key | null;
}
```
### Using `DeleteChapter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteChapter, DeleteChapterVariables } from '@firebasegen/default-connector';

// The `DeleteChapter` mutation requires an argument of type `DeleteChapterVariables`:
const deleteChapterVars: DeleteChapterVariables = {
  chapterId: ..., 
};

// Call the `deleteChapter()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteChapter(deleteChapterVars);
// Variables can be defined inline as well.
const { data } = await deleteChapter({ chapterId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteChapter(dataConnect, deleteChapterVars);

console.log(data.chapter_delete);

// Or, you can use the `Promise` API.
deleteChapter(deleteChapterVars).then((response) => {
  const data = response.data;
  console.log(data.chapter_delete);
});
```

### Using `DeleteChapter`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteChapterRef, DeleteChapterVariables } from '@firebasegen/default-connector';

// The `DeleteChapter` mutation requires an argument of type `DeleteChapterVariables`:
const deleteChapterVars: DeleteChapterVariables = {
  chapterId: ..., 
};

// Call the `deleteChapterRef()` function to get a reference to the mutation.
const ref = deleteChapterRef(deleteChapterVars);
// Variables can be defined inline as well.
const ref = deleteChapterRef({ chapterId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteChapterRef(dataConnect, deleteChapterVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.chapter_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.chapter_delete);
});
```

## CreateLesson
You can execute the `CreateLesson` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createLesson(vars: CreateLessonVariables): MutationPromise<CreateLessonData, CreateLessonVariables>;

interface CreateLessonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLessonVariables): MutationRef<CreateLessonData, CreateLessonVariables>;
}
export const createLessonRef: CreateLessonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLesson(dc: DataConnect, vars: CreateLessonVariables): MutationPromise<CreateLessonData, CreateLessonVariables>;

interface CreateLessonRef {
  ...
  (dc: DataConnect, vars: CreateLessonVariables): MutationRef<CreateLessonData, CreateLessonVariables>;
}
export const createLessonRef: CreateLessonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLessonRef:
```typescript
const name = createLessonRef.operationName;
console.log(name);
```

### Variables
The `CreateLesson` mutation requires an argument of type `CreateLessonVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLessonVariables {
  name: string;
  description?: string | null;
  content?: string | null;
  chapterId: UUIDString;
  subjectId: UUIDString;
  schoolId: UUIDString;
  orderIndex?: number | null;
}
```
### Return Type
Recall that executing the `CreateLesson` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLessonData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLessonData {
  lesson_insert: Lesson_Key;
}
```
### Using `CreateLesson`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLesson, CreateLessonVariables } from '@firebasegen/default-connector';

// The `CreateLesson` mutation requires an argument of type `CreateLessonVariables`:
const createLessonVars: CreateLessonVariables = {
  name: ..., 
  description: ..., // optional
  content: ..., // optional
  chapterId: ..., 
  subjectId: ..., 
  schoolId: ..., 
  orderIndex: ..., // optional
};

// Call the `createLesson()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLesson(createLessonVars);
// Variables can be defined inline as well.
const { data } = await createLesson({ name: ..., description: ..., content: ..., chapterId: ..., subjectId: ..., schoolId: ..., orderIndex: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLesson(dataConnect, createLessonVars);

console.log(data.lesson_insert);

// Or, you can use the `Promise` API.
createLesson(createLessonVars).then((response) => {
  const data = response.data;
  console.log(data.lesson_insert);
});
```

### Using `CreateLesson`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLessonRef, CreateLessonVariables } from '@firebasegen/default-connector';

// The `CreateLesson` mutation requires an argument of type `CreateLessonVariables`:
const createLessonVars: CreateLessonVariables = {
  name: ..., 
  description: ..., // optional
  content: ..., // optional
  chapterId: ..., 
  subjectId: ..., 
  schoolId: ..., 
  orderIndex: ..., // optional
};

// Call the `createLessonRef()` function to get a reference to the mutation.
const ref = createLessonRef(createLessonVars);
// Variables can be defined inline as well.
const ref = createLessonRef({ name: ..., description: ..., content: ..., chapterId: ..., subjectId: ..., schoolId: ..., orderIndex: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLessonRef(dataConnect, createLessonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lesson_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lesson_insert);
});
```

## UpdateLesson
You can execute the `UpdateLesson` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateLesson(vars: UpdateLessonVariables): MutationPromise<UpdateLessonData, UpdateLessonVariables>;

interface UpdateLessonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLessonVariables): MutationRef<UpdateLessonData, UpdateLessonVariables>;
}
export const updateLessonRef: UpdateLessonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLesson(dc: DataConnect, vars: UpdateLessonVariables): MutationPromise<UpdateLessonData, UpdateLessonVariables>;

interface UpdateLessonRef {
  ...
  (dc: DataConnect, vars: UpdateLessonVariables): MutationRef<UpdateLessonData, UpdateLessonVariables>;
}
export const updateLessonRef: UpdateLessonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLessonRef:
```typescript
const name = updateLessonRef.operationName;
console.log(name);
```

### Variables
The `UpdateLesson` mutation requires an argument of type `UpdateLessonVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateLessonVariables {
  lessonId: UUIDString;
  name?: string | null;
  description?: string | null;
  content?: string | null;
  orderIndex?: number | null;
}
```
### Return Type
Recall that executing the `UpdateLesson` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLessonData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLessonData {
  lesson_update?: Lesson_Key | null;
}
```
### Using `UpdateLesson`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLesson, UpdateLessonVariables } from '@firebasegen/default-connector';

// The `UpdateLesson` mutation requires an argument of type `UpdateLessonVariables`:
const updateLessonVars: UpdateLessonVariables = {
  lessonId: ..., 
  name: ..., // optional
  description: ..., // optional
  content: ..., // optional
  orderIndex: ..., // optional
};

// Call the `updateLesson()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLesson(updateLessonVars);
// Variables can be defined inline as well.
const { data } = await updateLesson({ lessonId: ..., name: ..., description: ..., content: ..., orderIndex: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLesson(dataConnect, updateLessonVars);

console.log(data.lesson_update);

// Or, you can use the `Promise` API.
updateLesson(updateLessonVars).then((response) => {
  const data = response.data;
  console.log(data.lesson_update);
});
```

### Using `UpdateLesson`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLessonRef, UpdateLessonVariables } from '@firebasegen/default-connector';

// The `UpdateLesson` mutation requires an argument of type `UpdateLessonVariables`:
const updateLessonVars: UpdateLessonVariables = {
  lessonId: ..., 
  name: ..., // optional
  description: ..., // optional
  content: ..., // optional
  orderIndex: ..., // optional
};

// Call the `updateLessonRef()` function to get a reference to the mutation.
const ref = updateLessonRef(updateLessonVars);
// Variables can be defined inline as well.
const ref = updateLessonRef({ lessonId: ..., name: ..., description: ..., content: ..., orderIndex: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLessonRef(dataConnect, updateLessonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lesson_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lesson_update);
});
```

## DeleteLesson
You can execute the `DeleteLesson` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteLesson(vars: DeleteLessonVariables): MutationPromise<DeleteLessonData, DeleteLessonVariables>;

interface DeleteLessonRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLessonVariables): MutationRef<DeleteLessonData, DeleteLessonVariables>;
}
export const deleteLessonRef: DeleteLessonRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteLesson(dc: DataConnect, vars: DeleteLessonVariables): MutationPromise<DeleteLessonData, DeleteLessonVariables>;

interface DeleteLessonRef {
  ...
  (dc: DataConnect, vars: DeleteLessonVariables): MutationRef<DeleteLessonData, DeleteLessonVariables>;
}
export const deleteLessonRef: DeleteLessonRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteLessonRef:
```typescript
const name = deleteLessonRef.operationName;
console.log(name);
```

### Variables
The `DeleteLesson` mutation requires an argument of type `DeleteLessonVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteLessonVariables {
  lessonId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteLesson` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteLessonData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteLessonData {
  lesson_delete?: Lesson_Key | null;
}
```
### Using `DeleteLesson`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteLesson, DeleteLessonVariables } from '@firebasegen/default-connector';

// The `DeleteLesson` mutation requires an argument of type `DeleteLessonVariables`:
const deleteLessonVars: DeleteLessonVariables = {
  lessonId: ..., 
};

// Call the `deleteLesson()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteLesson(deleteLessonVars);
// Variables can be defined inline as well.
const { data } = await deleteLesson({ lessonId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteLesson(dataConnect, deleteLessonVars);

console.log(data.lesson_delete);

// Or, you can use the `Promise` API.
deleteLesson(deleteLessonVars).then((response) => {
  const data = response.data;
  console.log(data.lesson_delete);
});
```

### Using `DeleteLesson`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteLessonRef, DeleteLessonVariables } from '@firebasegen/default-connector';

// The `DeleteLesson` mutation requires an argument of type `DeleteLessonVariables`:
const deleteLessonVars: DeleteLessonVariables = {
  lessonId: ..., 
};

// Call the `deleteLessonRef()` function to get a reference to the mutation.
const ref = deleteLessonRef(deleteLessonVars);
// Variables can be defined inline as well.
const ref = deleteLessonRef({ lessonId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteLessonRef(dataConnect, deleteLessonVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lesson_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lesson_delete);
});
```

## CreateTeacher
You can execute the `CreateTeacher` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createTeacher(vars: CreateTeacherVariables): MutationPromise<CreateTeacherData, CreateTeacherVariables>;

interface CreateTeacherRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTeacherVariables): MutationRef<CreateTeacherData, CreateTeacherVariables>;
}
export const createTeacherRef: CreateTeacherRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTeacher(dc: DataConnect, vars: CreateTeacherVariables): MutationPromise<CreateTeacherData, CreateTeacherVariables>;

interface CreateTeacherRef {
  ...
  (dc: DataConnect, vars: CreateTeacherVariables): MutationRef<CreateTeacherData, CreateTeacherVariables>;
}
export const createTeacherRef: CreateTeacherRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTeacherRef:
```typescript
const name = createTeacherRef.operationName;
console.log(name);
```

### Variables
The `CreateTeacher` mutation requires an argument of type `CreateTeacherVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTeacherVariables {
  teacherId: string;
  userId: string;
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateTeacher` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTeacherData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTeacherData {
  teacher_insert: Teacher_Key;
}
```
### Using `CreateTeacher`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTeacher, CreateTeacherVariables } from '@firebasegen/default-connector';

// The `CreateTeacher` mutation requires an argument of type `CreateTeacherVariables`:
const createTeacherVars: CreateTeacherVariables = {
  teacherId: ..., 
  userId: ..., 
  schoolId: ..., 
};

// Call the `createTeacher()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTeacher(createTeacherVars);
// Variables can be defined inline as well.
const { data } = await createTeacher({ teacherId: ..., userId: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTeacher(dataConnect, createTeacherVars);

console.log(data.teacher_insert);

// Or, you can use the `Promise` API.
createTeacher(createTeacherVars).then((response) => {
  const data = response.data;
  console.log(data.teacher_insert);
});
```

### Using `CreateTeacher`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTeacherRef, CreateTeacherVariables } from '@firebasegen/default-connector';

// The `CreateTeacher` mutation requires an argument of type `CreateTeacherVariables`:
const createTeacherVars: CreateTeacherVariables = {
  teacherId: ..., 
  userId: ..., 
  schoolId: ..., 
};

// Call the `createTeacherRef()` function to get a reference to the mutation.
const ref = createTeacherRef(createTeacherVars);
// Variables can be defined inline as well.
const ref = createTeacherRef({ teacherId: ..., userId: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTeacherRef(dataConnect, createTeacherVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacher_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacher_insert);
});
```

## UpdateTeacher
You can execute the `UpdateTeacher` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateTeacher(vars: UpdateTeacherVariables): MutationPromise<UpdateTeacherData, UpdateTeacherVariables>;

interface UpdateTeacherRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTeacherVariables): MutationRef<UpdateTeacherData, UpdateTeacherVariables>;
}
export const updateTeacherRef: UpdateTeacherRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTeacher(dc: DataConnect, vars: UpdateTeacherVariables): MutationPromise<UpdateTeacherData, UpdateTeacherVariables>;

interface UpdateTeacherRef {
  ...
  (dc: DataConnect, vars: UpdateTeacherVariables): MutationRef<UpdateTeacherData, UpdateTeacherVariables>;
}
export const updateTeacherRef: UpdateTeacherRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTeacherRef:
```typescript
const name = updateTeacherRef.operationName;
console.log(name);
```

### Variables
The `UpdateTeacher` mutation requires an argument of type `UpdateTeacherVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTeacherVariables {
  teacherId: UUIDString;
  teacherIdString: string;
}
```
### Return Type
Recall that executing the `UpdateTeacher` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTeacherData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTeacherData {
  teacher_update?: Teacher_Key | null;
}
```
### Using `UpdateTeacher`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTeacher, UpdateTeacherVariables } from '@firebasegen/default-connector';

// The `UpdateTeacher` mutation requires an argument of type `UpdateTeacherVariables`:
const updateTeacherVars: UpdateTeacherVariables = {
  teacherId: ..., 
  teacherIdString: ..., 
};

// Call the `updateTeacher()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTeacher(updateTeacherVars);
// Variables can be defined inline as well.
const { data } = await updateTeacher({ teacherId: ..., teacherIdString: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTeacher(dataConnect, updateTeacherVars);

console.log(data.teacher_update);

// Or, you can use the `Promise` API.
updateTeacher(updateTeacherVars).then((response) => {
  const data = response.data;
  console.log(data.teacher_update);
});
```

### Using `UpdateTeacher`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTeacherRef, UpdateTeacherVariables } from '@firebasegen/default-connector';

// The `UpdateTeacher` mutation requires an argument of type `UpdateTeacherVariables`:
const updateTeacherVars: UpdateTeacherVariables = {
  teacherId: ..., 
  teacherIdString: ..., 
};

// Call the `updateTeacherRef()` function to get a reference to the mutation.
const ref = updateTeacherRef(updateTeacherVars);
// Variables can be defined inline as well.
const ref = updateTeacherRef({ teacherId: ..., teacherIdString: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTeacherRef(dataConnect, updateTeacherVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacher_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacher_update);
});
```

## DeleteTeacher
You can execute the `DeleteTeacher` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteTeacher(vars: DeleteTeacherVariables): MutationPromise<DeleteTeacherData, DeleteTeacherVariables>;

interface DeleteTeacherRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTeacherVariables): MutationRef<DeleteTeacherData, DeleteTeacherVariables>;
}
export const deleteTeacherRef: DeleteTeacherRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTeacher(dc: DataConnect, vars: DeleteTeacherVariables): MutationPromise<DeleteTeacherData, DeleteTeacherVariables>;

interface DeleteTeacherRef {
  ...
  (dc: DataConnect, vars: DeleteTeacherVariables): MutationRef<DeleteTeacherData, DeleteTeacherVariables>;
}
export const deleteTeacherRef: DeleteTeacherRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTeacherRef:
```typescript
const name = deleteTeacherRef.operationName;
console.log(name);
```

### Variables
The `DeleteTeacher` mutation requires an argument of type `DeleteTeacherVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTeacherVariables {
  teacherId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTeacher` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTeacherData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTeacherData {
  teacher_delete?: Teacher_Key | null;
}
```
### Using `DeleteTeacher`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTeacher, DeleteTeacherVariables } from '@firebasegen/default-connector';

// The `DeleteTeacher` mutation requires an argument of type `DeleteTeacherVariables`:
const deleteTeacherVars: DeleteTeacherVariables = {
  teacherId: ..., 
};

// Call the `deleteTeacher()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTeacher(deleteTeacherVars);
// Variables can be defined inline as well.
const { data } = await deleteTeacher({ teacherId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTeacher(dataConnect, deleteTeacherVars);

console.log(data.teacher_delete);

// Or, you can use the `Promise` API.
deleteTeacher(deleteTeacherVars).then((response) => {
  const data = response.data;
  console.log(data.teacher_delete);
});
```

### Using `DeleteTeacher`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTeacherRef, DeleteTeacherVariables } from '@firebasegen/default-connector';

// The `DeleteTeacher` mutation requires an argument of type `DeleteTeacherVariables`:
const deleteTeacherVars: DeleteTeacherVariables = {
  teacherId: ..., 
};

// Call the `deleteTeacherRef()` function to get a reference to the mutation.
const ref = deleteTeacherRef(deleteTeacherVars);
// Variables can be defined inline as well.
const ref = deleteTeacherRef({ teacherId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTeacherRef(dataConnect, deleteTeacherVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacher_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacher_delete);
});
```

## AssignSubjectToClass
You can execute the `AssignSubjectToClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
assignSubjectToClass(vars: AssignSubjectToClassVariables): MutationPromise<AssignSubjectToClassData, AssignSubjectToClassVariables>;

interface AssignSubjectToClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignSubjectToClassVariables): MutationRef<AssignSubjectToClassData, AssignSubjectToClassVariables>;
}
export const assignSubjectToClassRef: AssignSubjectToClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignSubjectToClass(dc: DataConnect, vars: AssignSubjectToClassVariables): MutationPromise<AssignSubjectToClassData, AssignSubjectToClassVariables>;

interface AssignSubjectToClassRef {
  ...
  (dc: DataConnect, vars: AssignSubjectToClassVariables): MutationRef<AssignSubjectToClassData, AssignSubjectToClassVariables>;
}
export const assignSubjectToClassRef: AssignSubjectToClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignSubjectToClassRef:
```typescript
const name = assignSubjectToClassRef.operationName;
console.log(name);
```

### Variables
The `AssignSubjectToClass` mutation requires an argument of type `AssignSubjectToClassVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignSubjectToClassVariables {
  classId: UUIDString;
  subjectId: UUIDString;
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `AssignSubjectToClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignSubjectToClassData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignSubjectToClassData {
  classSubject_upsert: ClassSubject_Key;
}
```
### Using `AssignSubjectToClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignSubjectToClass, AssignSubjectToClassVariables } from '@firebasegen/default-connector';

// The `AssignSubjectToClass` mutation requires an argument of type `AssignSubjectToClassVariables`:
const assignSubjectToClassVars: AssignSubjectToClassVariables = {
  classId: ..., 
  subjectId: ..., 
  schoolId: ..., 
};

// Call the `assignSubjectToClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignSubjectToClass(assignSubjectToClassVars);
// Variables can be defined inline as well.
const { data } = await assignSubjectToClass({ classId: ..., subjectId: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignSubjectToClass(dataConnect, assignSubjectToClassVars);

console.log(data.classSubject_upsert);

// Or, you can use the `Promise` API.
assignSubjectToClass(assignSubjectToClassVars).then((response) => {
  const data = response.data;
  console.log(data.classSubject_upsert);
});
```

### Using `AssignSubjectToClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignSubjectToClassRef, AssignSubjectToClassVariables } from '@firebasegen/default-connector';

// The `AssignSubjectToClass` mutation requires an argument of type `AssignSubjectToClassVariables`:
const assignSubjectToClassVars: AssignSubjectToClassVariables = {
  classId: ..., 
  subjectId: ..., 
  schoolId: ..., 
};

// Call the `assignSubjectToClassRef()` function to get a reference to the mutation.
const ref = assignSubjectToClassRef(assignSubjectToClassVars);
// Variables can be defined inline as well.
const ref = assignSubjectToClassRef({ classId: ..., subjectId: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignSubjectToClassRef(dataConnect, assignSubjectToClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.classSubject_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.classSubject_upsert);
});
```

## RemoveSubjectFromClass
You can execute the `RemoveSubjectFromClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
removeSubjectFromClass(vars: RemoveSubjectFromClassVariables): MutationPromise<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;

interface RemoveSubjectFromClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveSubjectFromClassVariables): MutationRef<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;
}
export const removeSubjectFromClassRef: RemoveSubjectFromClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeSubjectFromClass(dc: DataConnect, vars: RemoveSubjectFromClassVariables): MutationPromise<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;

interface RemoveSubjectFromClassRef {
  ...
  (dc: DataConnect, vars: RemoveSubjectFromClassVariables): MutationRef<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;
}
export const removeSubjectFromClassRef: RemoveSubjectFromClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeSubjectFromClassRef:
```typescript
const name = removeSubjectFromClassRef.operationName;
console.log(name);
```

### Variables
The `RemoveSubjectFromClass` mutation requires an argument of type `RemoveSubjectFromClassVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveSubjectFromClassVariables {
  classId: UUIDString;
  subjectId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveSubjectFromClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveSubjectFromClassData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveSubjectFromClassData {
  classSubject_delete?: ClassSubject_Key | null;
}
```
### Using `RemoveSubjectFromClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeSubjectFromClass, RemoveSubjectFromClassVariables } from '@firebasegen/default-connector';

// The `RemoveSubjectFromClass` mutation requires an argument of type `RemoveSubjectFromClassVariables`:
const removeSubjectFromClassVars: RemoveSubjectFromClassVariables = {
  classId: ..., 
  subjectId: ..., 
};

// Call the `removeSubjectFromClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeSubjectFromClass(removeSubjectFromClassVars);
// Variables can be defined inline as well.
const { data } = await removeSubjectFromClass({ classId: ..., subjectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeSubjectFromClass(dataConnect, removeSubjectFromClassVars);

console.log(data.classSubject_delete);

// Or, you can use the `Promise` API.
removeSubjectFromClass(removeSubjectFromClassVars).then((response) => {
  const data = response.data;
  console.log(data.classSubject_delete);
});
```

### Using `RemoveSubjectFromClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeSubjectFromClassRef, RemoveSubjectFromClassVariables } from '@firebasegen/default-connector';

// The `RemoveSubjectFromClass` mutation requires an argument of type `RemoveSubjectFromClassVariables`:
const removeSubjectFromClassVars: RemoveSubjectFromClassVariables = {
  classId: ..., 
  subjectId: ..., 
};

// Call the `removeSubjectFromClassRef()` function to get a reference to the mutation.
const ref = removeSubjectFromClassRef(removeSubjectFromClassVars);
// Variables can be defined inline as well.
const ref = removeSubjectFromClassRef({ classId: ..., subjectId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeSubjectFromClassRef(dataConnect, removeSubjectFromClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.classSubject_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.classSubject_delete);
});
```

## AssignTeacherToClass
You can execute the `AssignTeacherToClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
assignTeacherToClass(vars: AssignTeacherToClassVariables): MutationPromise<AssignTeacherToClassData, AssignTeacherToClassVariables>;

interface AssignTeacherToClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignTeacherToClassVariables): MutationRef<AssignTeacherToClassData, AssignTeacherToClassVariables>;
}
export const assignTeacherToClassRef: AssignTeacherToClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignTeacherToClass(dc: DataConnect, vars: AssignTeacherToClassVariables): MutationPromise<AssignTeacherToClassData, AssignTeacherToClassVariables>;

interface AssignTeacherToClassRef {
  ...
  (dc: DataConnect, vars: AssignTeacherToClassVariables): MutationRef<AssignTeacherToClassData, AssignTeacherToClassVariables>;
}
export const assignTeacherToClassRef: AssignTeacherToClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignTeacherToClassRef:
```typescript
const name = assignTeacherToClassRef.operationName;
console.log(name);
```

### Variables
The `AssignTeacherToClass` mutation requires an argument of type `AssignTeacherToClassVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignTeacherToClassVariables {
  teacherId: UUIDString;
  classId: UUIDString;
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `AssignTeacherToClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignTeacherToClassData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignTeacherToClassData {
  teacherClass_upsert: TeacherClass_Key;
}
```
### Using `AssignTeacherToClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignTeacherToClass, AssignTeacherToClassVariables } from '@firebasegen/default-connector';

// The `AssignTeacherToClass` mutation requires an argument of type `AssignTeacherToClassVariables`:
const assignTeacherToClassVars: AssignTeacherToClassVariables = {
  teacherId: ..., 
  classId: ..., 
  schoolId: ..., 
};

// Call the `assignTeacherToClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignTeacherToClass(assignTeacherToClassVars);
// Variables can be defined inline as well.
const { data } = await assignTeacherToClass({ teacherId: ..., classId: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignTeacherToClass(dataConnect, assignTeacherToClassVars);

console.log(data.teacherClass_upsert);

// Or, you can use the `Promise` API.
assignTeacherToClass(assignTeacherToClassVars).then((response) => {
  const data = response.data;
  console.log(data.teacherClass_upsert);
});
```

### Using `AssignTeacherToClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignTeacherToClassRef, AssignTeacherToClassVariables } from '@firebasegen/default-connector';

// The `AssignTeacherToClass` mutation requires an argument of type `AssignTeacherToClassVariables`:
const assignTeacherToClassVars: AssignTeacherToClassVariables = {
  teacherId: ..., 
  classId: ..., 
  schoolId: ..., 
};

// Call the `assignTeacherToClassRef()` function to get a reference to the mutation.
const ref = assignTeacherToClassRef(assignTeacherToClassVars);
// Variables can be defined inline as well.
const ref = assignTeacherToClassRef({ teacherId: ..., classId: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignTeacherToClassRef(dataConnect, assignTeacherToClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacherClass_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherClass_upsert);
});
```

## RemoveTeacherFromClass
You can execute the `RemoveTeacherFromClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
removeTeacherFromClass(vars: RemoveTeacherFromClassVariables): MutationPromise<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;

interface RemoveTeacherFromClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTeacherFromClassVariables): MutationRef<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;
}
export const removeTeacherFromClassRef: RemoveTeacherFromClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeTeacherFromClass(dc: DataConnect, vars: RemoveTeacherFromClassVariables): MutationPromise<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;

interface RemoveTeacherFromClassRef {
  ...
  (dc: DataConnect, vars: RemoveTeacherFromClassVariables): MutationRef<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;
}
export const removeTeacherFromClassRef: RemoveTeacherFromClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeTeacherFromClassRef:
```typescript
const name = removeTeacherFromClassRef.operationName;
console.log(name);
```

### Variables
The `RemoveTeacherFromClass` mutation requires an argument of type `RemoveTeacherFromClassVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveTeacherFromClassVariables {
  teacherId: UUIDString;
  classId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveTeacherFromClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveTeacherFromClassData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveTeacherFromClassData {
  teacherClass_delete?: TeacherClass_Key | null;
}
```
### Using `RemoveTeacherFromClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeTeacherFromClass, RemoveTeacherFromClassVariables } from '@firebasegen/default-connector';

// The `RemoveTeacherFromClass` mutation requires an argument of type `RemoveTeacherFromClassVariables`:
const removeTeacherFromClassVars: RemoveTeacherFromClassVariables = {
  teacherId: ..., 
  classId: ..., 
};

// Call the `removeTeacherFromClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeTeacherFromClass(removeTeacherFromClassVars);
// Variables can be defined inline as well.
const { data } = await removeTeacherFromClass({ teacherId: ..., classId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeTeacherFromClass(dataConnect, removeTeacherFromClassVars);

console.log(data.teacherClass_delete);

// Or, you can use the `Promise` API.
removeTeacherFromClass(removeTeacherFromClassVars).then((response) => {
  const data = response.data;
  console.log(data.teacherClass_delete);
});
```

### Using `RemoveTeacherFromClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeTeacherFromClassRef, RemoveTeacherFromClassVariables } from '@firebasegen/default-connector';

// The `RemoveTeacherFromClass` mutation requires an argument of type `RemoveTeacherFromClassVariables`:
const removeTeacherFromClassVars: RemoveTeacherFromClassVariables = {
  teacherId: ..., 
  classId: ..., 
};

// Call the `removeTeacherFromClassRef()` function to get a reference to the mutation.
const ref = removeTeacherFromClassRef(removeTeacherFromClassVars);
// Variables can be defined inline as well.
const ref = removeTeacherFromClassRef({ teacherId: ..., classId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeTeacherFromClassRef(dataConnect, removeTeacherFromClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacherClass_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherClass_delete);
});
```

## AssignTeacherToSubject
You can execute the `AssignTeacherToSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
assignTeacherToSubject(vars: AssignTeacherToSubjectVariables): MutationPromise<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;

interface AssignTeacherToSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignTeacherToSubjectVariables): MutationRef<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;
}
export const assignTeacherToSubjectRef: AssignTeacherToSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignTeacherToSubject(dc: DataConnect, vars: AssignTeacherToSubjectVariables): MutationPromise<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;

interface AssignTeacherToSubjectRef {
  ...
  (dc: DataConnect, vars: AssignTeacherToSubjectVariables): MutationRef<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;
}
export const assignTeacherToSubjectRef: AssignTeacherToSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignTeacherToSubjectRef:
```typescript
const name = assignTeacherToSubjectRef.operationName;
console.log(name);
```

### Variables
The `AssignTeacherToSubject` mutation requires an argument of type `AssignTeacherToSubjectVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignTeacherToSubjectVariables {
  teacherId: UUIDString;
  subjectId: UUIDString;
  schoolId: UUIDString;
}
```
### Return Type
Recall that executing the `AssignTeacherToSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignTeacherToSubjectData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignTeacherToSubjectData {
  teacherSubject_upsert: TeacherSubject_Key;
}
```
### Using `AssignTeacherToSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignTeacherToSubject, AssignTeacherToSubjectVariables } from '@firebasegen/default-connector';

// The `AssignTeacherToSubject` mutation requires an argument of type `AssignTeacherToSubjectVariables`:
const assignTeacherToSubjectVars: AssignTeacherToSubjectVariables = {
  teacherId: ..., 
  subjectId: ..., 
  schoolId: ..., 
};

// Call the `assignTeacherToSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignTeacherToSubject(assignTeacherToSubjectVars);
// Variables can be defined inline as well.
const { data } = await assignTeacherToSubject({ teacherId: ..., subjectId: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignTeacherToSubject(dataConnect, assignTeacherToSubjectVars);

console.log(data.teacherSubject_upsert);

// Or, you can use the `Promise` API.
assignTeacherToSubject(assignTeacherToSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.teacherSubject_upsert);
});
```

### Using `AssignTeacherToSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignTeacherToSubjectRef, AssignTeacherToSubjectVariables } from '@firebasegen/default-connector';

// The `AssignTeacherToSubject` mutation requires an argument of type `AssignTeacherToSubjectVariables`:
const assignTeacherToSubjectVars: AssignTeacherToSubjectVariables = {
  teacherId: ..., 
  subjectId: ..., 
  schoolId: ..., 
};

// Call the `assignTeacherToSubjectRef()` function to get a reference to the mutation.
const ref = assignTeacherToSubjectRef(assignTeacherToSubjectVars);
// Variables can be defined inline as well.
const ref = assignTeacherToSubjectRef({ teacherId: ..., subjectId: ..., schoolId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignTeacherToSubjectRef(dataConnect, assignTeacherToSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacherSubject_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherSubject_upsert);
});
```

## RemoveTeacherFromSubject
You can execute the `RemoveTeacherFromSubject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
removeTeacherFromSubject(vars: RemoveTeacherFromSubjectVariables): MutationPromise<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;

interface RemoveTeacherFromSubjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTeacherFromSubjectVariables): MutationRef<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;
}
export const removeTeacherFromSubjectRef: RemoveTeacherFromSubjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeTeacherFromSubject(dc: DataConnect, vars: RemoveTeacherFromSubjectVariables): MutationPromise<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;

interface RemoveTeacherFromSubjectRef {
  ...
  (dc: DataConnect, vars: RemoveTeacherFromSubjectVariables): MutationRef<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;
}
export const removeTeacherFromSubjectRef: RemoveTeacherFromSubjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeTeacherFromSubjectRef:
```typescript
const name = removeTeacherFromSubjectRef.operationName;
console.log(name);
```

### Variables
The `RemoveTeacherFromSubject` mutation requires an argument of type `RemoveTeacherFromSubjectVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveTeacherFromSubjectVariables {
  teacherId: UUIDString;
  subjectId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveTeacherFromSubject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveTeacherFromSubjectData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveTeacherFromSubjectData {
  teacherSubject_delete?: TeacherSubject_Key | null;
}
```
### Using `RemoveTeacherFromSubject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeTeacherFromSubject, RemoveTeacherFromSubjectVariables } from '@firebasegen/default-connector';

// The `RemoveTeacherFromSubject` mutation requires an argument of type `RemoveTeacherFromSubjectVariables`:
const removeTeacherFromSubjectVars: RemoveTeacherFromSubjectVariables = {
  teacherId: ..., 
  subjectId: ..., 
};

// Call the `removeTeacherFromSubject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeTeacherFromSubject(removeTeacherFromSubjectVars);
// Variables can be defined inline as well.
const { data } = await removeTeacherFromSubject({ teacherId: ..., subjectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeTeacherFromSubject(dataConnect, removeTeacherFromSubjectVars);

console.log(data.teacherSubject_delete);

// Or, you can use the `Promise` API.
removeTeacherFromSubject(removeTeacherFromSubjectVars).then((response) => {
  const data = response.data;
  console.log(data.teacherSubject_delete);
});
```

### Using `RemoveTeacherFromSubject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeTeacherFromSubjectRef, RemoveTeacherFromSubjectVariables } from '@firebasegen/default-connector';

// The `RemoveTeacherFromSubject` mutation requires an argument of type `RemoveTeacherFromSubjectVariables`:
const removeTeacherFromSubjectVars: RemoveTeacherFromSubjectVariables = {
  teacherId: ..., 
  subjectId: ..., 
};

// Call the `removeTeacherFromSubjectRef()` function to get a reference to the mutation.
const ref = removeTeacherFromSubjectRef(removeTeacherFromSubjectVars);
// Variables can be defined inline as well.
const ref = removeTeacherFromSubjectRef({ teacherId: ..., subjectId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeTeacherFromSubjectRef(dataConnect, removeTeacherFromSubjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.teacherSubject_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.teacherSubject_delete);
});
```

