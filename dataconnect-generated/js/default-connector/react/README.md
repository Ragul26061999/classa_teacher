# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`default-connector/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/default-connector/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
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

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `default`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `default` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetCurrentUser
You can execute the `GetCurrentUser` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
```

### Variables
The `GetCurrentUser` Query has no variables.
### Return Type
Recall that calling the `GetCurrentUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCurrentUser` Query is of type `GetCurrentUserData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCurrentUser`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useGetCurrentUser } from '@firebasegen/default-connector/react'

export default function GetCurrentUserComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCurrentUser();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCurrentUser(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCurrentUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCurrentUser(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.user);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetSchoolById
You can execute the `GetSchoolById` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetSchoolById(dc: DataConnect, vars: GetSchoolByIdVariables, options?: useDataConnectQueryOptions<GetSchoolByIdData>): UseDataConnectQueryResult<GetSchoolByIdData, GetSchoolByIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetSchoolById(vars: GetSchoolByIdVariables, options?: useDataConnectQueryOptions<GetSchoolByIdData>): UseDataConnectQueryResult<GetSchoolByIdData, GetSchoolByIdVariables>;
```

### Variables
The `GetSchoolById` Query requires an argument of type `GetSchoolByIdVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetSchoolByIdVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `GetSchoolById` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetSchoolById` Query is of type `GetSchoolByIdData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetSchoolById`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetSchoolByIdVariables } from '@firebasegen/default-connector';
import { useGetSchoolById } from '@firebasegen/default-connector/react'

export default function GetSchoolByIdComponent() {
  // The `useGetSchoolById` Query hook requires an argument of type `GetSchoolByIdVariables`:
  const getSchoolByIdVars: GetSchoolByIdVariables = {
    schoolId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetSchoolById(getSchoolByIdVars);
  // Variables can be defined inline as well.
  const query = useGetSchoolById({ schoolId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetSchoolById(dataConnect, getSchoolByIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetSchoolById(getSchoolByIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetSchoolById(dataConnect, getSchoolByIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.school);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListClassesBySchool
You can execute the `ListClassesBySchool` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListClassesBySchool(dc: DataConnect, vars: ListClassesBySchoolVariables, options?: useDataConnectQueryOptions<ListClassesBySchoolData>): UseDataConnectQueryResult<ListClassesBySchoolData, ListClassesBySchoolVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListClassesBySchool(vars: ListClassesBySchoolVariables, options?: useDataConnectQueryOptions<ListClassesBySchoolData>): UseDataConnectQueryResult<ListClassesBySchoolData, ListClassesBySchoolVariables>;
```

### Variables
The `ListClassesBySchool` Query requires an argument of type `ListClassesBySchoolVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListClassesBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `ListClassesBySchool` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListClassesBySchool` Query is of type `ListClassesBySchoolData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListClassesBySchool`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListClassesBySchoolVariables } from '@firebasegen/default-connector';
import { useListClassesBySchool } from '@firebasegen/default-connector/react'

export default function ListClassesBySchoolComponent() {
  // The `useListClassesBySchool` Query hook requires an argument of type `ListClassesBySchoolVariables`:
  const listClassesBySchoolVars: ListClassesBySchoolVariables = {
    schoolId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListClassesBySchool(listClassesBySchoolVars);
  // Variables can be defined inline as well.
  const query = useListClassesBySchool({ schoolId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListClassesBySchool(dataConnect, listClassesBySchoolVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListClassesBySchool(listClassesBySchoolVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListClassesBySchool(dataConnect, listClassesBySchoolVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.classes);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListSubjectsBySchool
You can execute the `ListSubjectsBySchool` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListSubjectsBySchool(dc: DataConnect, vars: ListSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListSubjectsBySchoolData>): UseDataConnectQueryResult<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListSubjectsBySchool(vars: ListSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListSubjectsBySchoolData>): UseDataConnectQueryResult<ListSubjectsBySchoolData, ListSubjectsBySchoolVariables>;
```

### Variables
The `ListSubjectsBySchool` Query requires an argument of type `ListSubjectsBySchoolVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListSubjectsBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `ListSubjectsBySchool` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListSubjectsBySchool` Query is of type `ListSubjectsBySchoolData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListSubjectsBySchool`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListSubjectsBySchoolVariables } from '@firebasegen/default-connector';
import { useListSubjectsBySchool } from '@firebasegen/default-connector/react'

export default function ListSubjectsBySchoolComponent() {
  // The `useListSubjectsBySchool` Query hook requires an argument of type `ListSubjectsBySchoolVariables`:
  const listSubjectsBySchoolVars: ListSubjectsBySchoolVariables = {
    schoolId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListSubjectsBySchool(listSubjectsBySchoolVars);
  // Variables can be defined inline as well.
  const query = useListSubjectsBySchool({ schoolId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListSubjectsBySchool(dataConnect, listSubjectsBySchoolVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListSubjectsBySchool(listSubjectsBySchoolVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListSubjectsBySchool(dataConnect, listSubjectsBySchoolVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.subjects);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListChaptersBySubject
You can execute the `ListChaptersBySubject` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListChaptersBySubject(dc: DataConnect, vars: ListChaptersBySubjectVariables, options?: useDataConnectQueryOptions<ListChaptersBySubjectData>): UseDataConnectQueryResult<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListChaptersBySubject(vars: ListChaptersBySubjectVariables, options?: useDataConnectQueryOptions<ListChaptersBySubjectData>): UseDataConnectQueryResult<ListChaptersBySubjectData, ListChaptersBySubjectVariables>;
```

### Variables
The `ListChaptersBySubject` Query requires an argument of type `ListChaptersBySubjectVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListChaptersBySubjectVariables {
  subjectId: UUIDString;
}
```
### Return Type
Recall that calling the `ListChaptersBySubject` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListChaptersBySubject` Query is of type `ListChaptersBySubjectData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListChaptersBySubject`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListChaptersBySubjectVariables } from '@firebasegen/default-connector';
import { useListChaptersBySubject } from '@firebasegen/default-connector/react'

export default function ListChaptersBySubjectComponent() {
  // The `useListChaptersBySubject` Query hook requires an argument of type `ListChaptersBySubjectVariables`:
  const listChaptersBySubjectVars: ListChaptersBySubjectVariables = {
    subjectId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListChaptersBySubject(listChaptersBySubjectVars);
  // Variables can be defined inline as well.
  const query = useListChaptersBySubject({ subjectId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListChaptersBySubject(dataConnect, listChaptersBySubjectVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListChaptersBySubject(listChaptersBySubjectVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListChaptersBySubject(dataConnect, listChaptersBySubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.chapters);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListLessonsByChapter
You can execute the `ListLessonsByChapter` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListLessonsByChapter(dc: DataConnect, vars: ListLessonsByChapterVariables, options?: useDataConnectQueryOptions<ListLessonsByChapterData>): UseDataConnectQueryResult<ListLessonsByChapterData, ListLessonsByChapterVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListLessonsByChapter(vars: ListLessonsByChapterVariables, options?: useDataConnectQueryOptions<ListLessonsByChapterData>): UseDataConnectQueryResult<ListLessonsByChapterData, ListLessonsByChapterVariables>;
```

### Variables
The `ListLessonsByChapter` Query requires an argument of type `ListLessonsByChapterVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListLessonsByChapterVariables {
  chapterId: UUIDString;
}
```
### Return Type
Recall that calling the `ListLessonsByChapter` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListLessonsByChapter` Query is of type `ListLessonsByChapterData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListLessonsByChapter`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListLessonsByChapterVariables } from '@firebasegen/default-connector';
import { useListLessonsByChapter } from '@firebasegen/default-connector/react'

export default function ListLessonsByChapterComponent() {
  // The `useListLessonsByChapter` Query hook requires an argument of type `ListLessonsByChapterVariables`:
  const listLessonsByChapterVars: ListLessonsByChapterVariables = {
    chapterId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListLessonsByChapter(listLessonsByChapterVars);
  // Variables can be defined inline as well.
  const query = useListLessonsByChapter({ chapterId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListLessonsByChapter(dataConnect, listLessonsByChapterVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListLessonsByChapter(listLessonsByChapterVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListLessonsByChapter(dataConnect, listLessonsByChapterVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.lessons);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTeachersBySchool
You can execute the `ListTeachersBySchool` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListTeachersBySchool(dc: DataConnect, vars: ListTeachersBySchoolVariables, options?: useDataConnectQueryOptions<ListTeachersBySchoolData>): UseDataConnectQueryResult<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTeachersBySchool(vars: ListTeachersBySchoolVariables, options?: useDataConnectQueryOptions<ListTeachersBySchoolData>): UseDataConnectQueryResult<ListTeachersBySchoolData, ListTeachersBySchoolVariables>;
```

### Variables
The `ListTeachersBySchool` Query requires an argument of type `ListTeachersBySchoolVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTeachersBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTeachersBySchool` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTeachersBySchool` Query is of type `ListTeachersBySchoolData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTeachersBySchool`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTeachersBySchoolVariables } from '@firebasegen/default-connector';
import { useListTeachersBySchool } from '@firebasegen/default-connector/react'

export default function ListTeachersBySchoolComponent() {
  // The `useListTeachersBySchool` Query hook requires an argument of type `ListTeachersBySchoolVariables`:
  const listTeachersBySchoolVars: ListTeachersBySchoolVariables = {
    schoolId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTeachersBySchool(listTeachersBySchoolVars);
  // Variables can be defined inline as well.
  const query = useListTeachersBySchool({ schoolId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTeachersBySchool(dataConnect, listTeachersBySchoolVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTeachersBySchool(listTeachersBySchoolVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTeachersBySchool(dataConnect, listTeachersBySchoolVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.teachers);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListClassSubjectsBySchool
You can execute the `ListClassSubjectsBySchool` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListClassSubjectsBySchool(dc: DataConnect, vars: ListClassSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListClassSubjectsBySchoolData>): UseDataConnectQueryResult<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListClassSubjectsBySchool(vars: ListClassSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListClassSubjectsBySchoolData>): UseDataConnectQueryResult<ListClassSubjectsBySchoolData, ListClassSubjectsBySchoolVariables>;
```

### Variables
The `ListClassSubjectsBySchool` Query requires an argument of type `ListClassSubjectsBySchoolVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListClassSubjectsBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `ListClassSubjectsBySchool` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListClassSubjectsBySchool` Query is of type `ListClassSubjectsBySchoolData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListClassSubjectsBySchool`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListClassSubjectsBySchoolVariables } from '@firebasegen/default-connector';
import { useListClassSubjectsBySchool } from '@firebasegen/default-connector/react'

export default function ListClassSubjectsBySchoolComponent() {
  // The `useListClassSubjectsBySchool` Query hook requires an argument of type `ListClassSubjectsBySchoolVariables`:
  const listClassSubjectsBySchoolVars: ListClassSubjectsBySchoolVariables = {
    schoolId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListClassSubjectsBySchool(listClassSubjectsBySchoolVars);
  // Variables can be defined inline as well.
  const query = useListClassSubjectsBySchool({ schoolId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListClassSubjectsBySchool(dataConnect, listClassSubjectsBySchoolVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListClassSubjectsBySchool(listClassSubjectsBySchoolVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListClassSubjectsBySchool(dataConnect, listClassSubjectsBySchoolVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.classSubjects);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTeacherClassesBySchool
You can execute the `ListTeacherClassesBySchool` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListTeacherClassesBySchool(dc: DataConnect, vars: ListTeacherClassesBySchoolVariables, options?: useDataConnectQueryOptions<ListTeacherClassesBySchoolData>): UseDataConnectQueryResult<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTeacherClassesBySchool(vars: ListTeacherClassesBySchoolVariables, options?: useDataConnectQueryOptions<ListTeacherClassesBySchoolData>): UseDataConnectQueryResult<ListTeacherClassesBySchoolData, ListTeacherClassesBySchoolVariables>;
```

### Variables
The `ListTeacherClassesBySchool` Query requires an argument of type `ListTeacherClassesBySchoolVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTeacherClassesBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTeacherClassesBySchool` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTeacherClassesBySchool` Query is of type `ListTeacherClassesBySchoolData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTeacherClassesBySchool`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTeacherClassesBySchoolVariables } from '@firebasegen/default-connector';
import { useListTeacherClassesBySchool } from '@firebasegen/default-connector/react'

export default function ListTeacherClassesBySchoolComponent() {
  // The `useListTeacherClassesBySchool` Query hook requires an argument of type `ListTeacherClassesBySchoolVariables`:
  const listTeacherClassesBySchoolVars: ListTeacherClassesBySchoolVariables = {
    schoolId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTeacherClassesBySchool(listTeacherClassesBySchoolVars);
  // Variables can be defined inline as well.
  const query = useListTeacherClassesBySchool({ schoolId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTeacherClassesBySchool(dataConnect, listTeacherClassesBySchoolVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTeacherClassesBySchool(listTeacherClassesBySchoolVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTeacherClassesBySchool(dataConnect, listTeacherClassesBySchoolVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.teacherClasses);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListTeacherSubjectsBySchool
You can execute the `ListTeacherSubjectsBySchool` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useListTeacherSubjectsBySchool(dc: DataConnect, vars: ListTeacherSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListTeacherSubjectsBySchoolData>): UseDataConnectQueryResult<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListTeacherSubjectsBySchool(vars: ListTeacherSubjectsBySchoolVariables, options?: useDataConnectQueryOptions<ListTeacherSubjectsBySchoolData>): UseDataConnectQueryResult<ListTeacherSubjectsBySchoolData, ListTeacherSubjectsBySchoolVariables>;
```

### Variables
The `ListTeacherSubjectsBySchool` Query requires an argument of type `ListTeacherSubjectsBySchoolVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListTeacherSubjectsBySchoolVariables {
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `ListTeacherSubjectsBySchool` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListTeacherSubjectsBySchool` Query is of type `ListTeacherSubjectsBySchoolData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListTeacherSubjectsBySchool`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListTeacherSubjectsBySchoolVariables } from '@firebasegen/default-connector';
import { useListTeacherSubjectsBySchool } from '@firebasegen/default-connector/react'

export default function ListTeacherSubjectsBySchoolComponent() {
  // The `useListTeacherSubjectsBySchool` Query hook requires an argument of type `ListTeacherSubjectsBySchoolVariables`:
  const listTeacherSubjectsBySchoolVars: ListTeacherSubjectsBySchoolVariables = {
    schoolId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListTeacherSubjectsBySchool(listTeacherSubjectsBySchoolVars);
  // Variables can be defined inline as well.
  const query = useListTeacherSubjectsBySchool({ schoolId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListTeacherSubjectsBySchool(dataConnect, listTeacherSubjectsBySchoolVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListTeacherSubjectsBySchool(listTeacherSubjectsBySchoolVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListTeacherSubjectsBySchool(dataConnect, listTeacherSubjectsBySchoolVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.teacherSubjects);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `default` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## UpsertUser
You can execute the `UpsertUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertUser(options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;
```

### Variables
The `UpsertUser` Mutation requires an argument of type `UpsertUserVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpsertUserVariables {
  email: string;
  displayName?: string | null;
  role?: string | null;
}
```
### Return Type
Recall that calling the `UpsertUser` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertUser` Mutation is of type `UpsertUserData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertUser`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertUserVariables } from '@firebasegen/default-connector';
import { useUpsertUser } from '@firebasegen/default-connector/react'

export default function UpsertUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertUser();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertUser(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertUser(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertUser` Mutation requires an argument of type `UpsertUserVariables`:
  const upsertUserVars: UpsertUserVariables = {
    email: ..., 
    displayName: ..., // optional
    role: ..., // optional
  };
  mutation.mutate(upsertUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ email: ..., displayName: ..., role: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertUserVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateSchool
You can execute the `CreateSchool` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateSchool(options?: useDataConnectMutationOptions<CreateSchoolData, FirebaseError, CreateSchoolVariables>): UseDataConnectMutationResult<CreateSchoolData, CreateSchoolVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateSchool(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSchoolData, FirebaseError, CreateSchoolVariables>): UseDataConnectMutationResult<CreateSchoolData, CreateSchoolVariables>;
```

### Variables
The `CreateSchool` Mutation requires an argument of type `CreateSchoolVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateSchoolVariables {
  name: string;
  address?: string | null;
  contact?: string | null;
  isBranch?: boolean | null;
  mainBranchId?: UUIDString | null;
}
```
### Return Type
Recall that calling the `CreateSchool` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateSchool` Mutation is of type `CreateSchoolData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateSchoolData {
  school_insert: School_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateSchool`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateSchoolVariables } from '@firebasegen/default-connector';
import { useCreateSchool } from '@firebasegen/default-connector/react'

export default function CreateSchoolComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateSchool();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateSchool(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateSchool(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateSchool(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateSchool` Mutation requires an argument of type `CreateSchoolVariables`:
  const createSchoolVars: CreateSchoolVariables = {
    name: ..., 
    address: ..., // optional
    contact: ..., // optional
    isBranch: ..., // optional
    mainBranchId: ..., // optional
  };
  mutation.mutate(createSchoolVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., address: ..., contact: ..., isBranch: ..., mainBranchId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createSchoolVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.school_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateSchool
You can execute the `UpdateSchool` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateSchool(options?: useDataConnectMutationOptions<UpdateSchoolData, FirebaseError, UpdateSchoolVariables>): UseDataConnectMutationResult<UpdateSchoolData, UpdateSchoolVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateSchool(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSchoolData, FirebaseError, UpdateSchoolVariables>): UseDataConnectMutationResult<UpdateSchoolData, UpdateSchoolVariables>;
```

### Variables
The `UpdateSchool` Mutation requires an argument of type `UpdateSchoolVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateSchoolVariables {
  schoolId: UUIDString;
  name?: string | null;
  address?: string | null;
  contact?: string | null;
}
```
### Return Type
Recall that calling the `UpdateSchool` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateSchool` Mutation is of type `UpdateSchoolData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateSchoolData {
  school_update?: School_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateSchool`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateSchoolVariables } from '@firebasegen/default-connector';
import { useUpdateSchool } from '@firebasegen/default-connector/react'

export default function UpdateSchoolComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateSchool();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateSchool(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateSchool(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateSchool(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateSchool` Mutation requires an argument of type `UpdateSchoolVariables`:
  const updateSchoolVars: UpdateSchoolVariables = {
    schoolId: ..., 
    name: ..., // optional
    address: ..., // optional
    contact: ..., // optional
  };
  mutation.mutate(updateSchoolVars);
  // Variables can be defined inline as well.
  mutation.mutate({ schoolId: ..., name: ..., address: ..., contact: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateSchoolVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.school_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateClass
You can execute the `CreateClass` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateClass(options?: useDataConnectMutationOptions<CreateClassData, FirebaseError, CreateClassVariables>): UseDataConnectMutationResult<CreateClassData, CreateClassVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateClass(dc: DataConnect, options?: useDataConnectMutationOptions<CreateClassData, FirebaseError, CreateClassVariables>): UseDataConnectMutationResult<CreateClassData, CreateClassVariables>;
```

### Variables
The `CreateClass` Mutation requires an argument of type `CreateClassVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateClassVariables {
  name: string;
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `CreateClass` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateClass` Mutation is of type `CreateClassData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateClassData {
  class_insert: Class_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateClass`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateClassVariables } from '@firebasegen/default-connector';
import { useCreateClass } from '@firebasegen/default-connector/react'

export default function CreateClassComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateClass();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateClass(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateClass(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateClass(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateClass` Mutation requires an argument of type `CreateClassVariables`:
  const createClassVars: CreateClassVariables = {
    name: ..., 
    schoolId: ..., 
  };
  mutation.mutate(createClassVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., schoolId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createClassVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.class_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateClass
You can execute the `UpdateClass` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateClass(options?: useDataConnectMutationOptions<UpdateClassData, FirebaseError, UpdateClassVariables>): UseDataConnectMutationResult<UpdateClassData, UpdateClassVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateClass(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateClassData, FirebaseError, UpdateClassVariables>): UseDataConnectMutationResult<UpdateClassData, UpdateClassVariables>;
```

### Variables
The `UpdateClass` Mutation requires an argument of type `UpdateClassVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateClassVariables {
  classId: UUIDString;
  name: string;
}
```
### Return Type
Recall that calling the `UpdateClass` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateClass` Mutation is of type `UpdateClassData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateClassData {
  class_update?: Class_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateClass`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateClassVariables } from '@firebasegen/default-connector';
import { useUpdateClass } from '@firebasegen/default-connector/react'

export default function UpdateClassComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateClass();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateClass(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateClass(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateClass(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateClass` Mutation requires an argument of type `UpdateClassVariables`:
  const updateClassVars: UpdateClassVariables = {
    classId: ..., 
    name: ..., 
  };
  mutation.mutate(updateClassVars);
  // Variables can be defined inline as well.
  mutation.mutate({ classId: ..., name: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateClassVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.class_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteClass
You can execute the `DeleteClass` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteClass(options?: useDataConnectMutationOptions<DeleteClassData, FirebaseError, DeleteClassVariables>): UseDataConnectMutationResult<DeleteClassData, DeleteClassVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteClass(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteClassData, FirebaseError, DeleteClassVariables>): UseDataConnectMutationResult<DeleteClassData, DeleteClassVariables>;
```

### Variables
The `DeleteClass` Mutation requires an argument of type `DeleteClassVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteClassVariables {
  classId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteClass` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteClass` Mutation is of type `DeleteClassData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteClassData {
  class_delete?: Class_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteClass`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteClassVariables } from '@firebasegen/default-connector';
import { useDeleteClass } from '@firebasegen/default-connector/react'

export default function DeleteClassComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteClass();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteClass(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteClass(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteClass(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteClass` Mutation requires an argument of type `DeleteClassVariables`:
  const deleteClassVars: DeleteClassVariables = {
    classId: ..., 
  };
  mutation.mutate(deleteClassVars);
  // Variables can be defined inline as well.
  mutation.mutate({ classId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteClassVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.class_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateSubject
You can execute the `CreateSubject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateSubject(options?: useDataConnectMutationOptions<CreateSubjectData, FirebaseError, CreateSubjectVariables>): UseDataConnectMutationResult<CreateSubjectData, CreateSubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSubjectData, FirebaseError, CreateSubjectVariables>): UseDataConnectMutationResult<CreateSubjectData, CreateSubjectVariables>;
```

### Variables
The `CreateSubject` Mutation requires an argument of type `CreateSubjectVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateSubjectVariables {
  name: string;
  description?: string | null;
  image?: string | null;
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `CreateSubject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateSubject` Mutation is of type `CreateSubjectData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateSubjectData {
  subject_insert: Subject_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateSubject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateSubjectVariables } from '@firebasegen/default-connector';
import { useCreateSubject } from '@firebasegen/default-connector/react'

export default function CreateSubjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateSubject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateSubject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateSubject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateSubject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateSubject` Mutation requires an argument of type `CreateSubjectVariables`:
  const createSubjectVars: CreateSubjectVariables = {
    name: ..., 
    description: ..., // optional
    image: ..., // optional
    schoolId: ..., 
  };
  mutation.mutate(createSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., description: ..., image: ..., schoolId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createSubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subject_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateSubject
You can execute the `UpdateSubject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateSubject(options?: useDataConnectMutationOptions<UpdateSubjectData, FirebaseError, UpdateSubjectVariables>): UseDataConnectMutationResult<UpdateSubjectData, UpdateSubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateSubject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateSubjectData, FirebaseError, UpdateSubjectVariables>): UseDataConnectMutationResult<UpdateSubjectData, UpdateSubjectVariables>;
```

### Variables
The `UpdateSubject` Mutation requires an argument of type `UpdateSubjectVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateSubjectVariables {
  subjectId: UUIDString;
  name?: string | null;
  description?: string | null;
  image?: string | null;
}
```
### Return Type
Recall that calling the `UpdateSubject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateSubject` Mutation is of type `UpdateSubjectData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateSubjectData {
  subject_update?: Subject_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateSubject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateSubjectVariables } from '@firebasegen/default-connector';
import { useUpdateSubject } from '@firebasegen/default-connector/react'

export default function UpdateSubjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateSubject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateSubject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateSubject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateSubject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateSubject` Mutation requires an argument of type `UpdateSubjectVariables`:
  const updateSubjectVars: UpdateSubjectVariables = {
    subjectId: ..., 
    name: ..., // optional
    description: ..., // optional
    image: ..., // optional
  };
  mutation.mutate(updateSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ subjectId: ..., name: ..., description: ..., image: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateSubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subject_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteSubject
You can execute the `DeleteSubject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteSubject(options?: useDataConnectMutationOptions<DeleteSubjectData, FirebaseError, DeleteSubjectVariables>): UseDataConnectMutationResult<DeleteSubjectData, DeleteSubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteSubject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteSubjectData, FirebaseError, DeleteSubjectVariables>): UseDataConnectMutationResult<DeleteSubjectData, DeleteSubjectVariables>;
```

### Variables
The `DeleteSubject` Mutation requires an argument of type `DeleteSubjectVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteSubjectVariables {
  subjectId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteSubject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteSubject` Mutation is of type `DeleteSubjectData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteSubjectData {
  subject_delete?: Subject_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteSubject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteSubjectVariables } from '@firebasegen/default-connector';
import { useDeleteSubject } from '@firebasegen/default-connector/react'

export default function DeleteSubjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteSubject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteSubject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteSubject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteSubject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteSubject` Mutation requires an argument of type `DeleteSubjectVariables`:
  const deleteSubjectVars: DeleteSubjectVariables = {
    subjectId: ..., 
  };
  mutation.mutate(deleteSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ subjectId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteSubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.subject_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateChapter
You can execute the `CreateChapter` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateChapter(options?: useDataConnectMutationOptions<CreateChapterData, FirebaseError, CreateChapterVariables>): UseDataConnectMutationResult<CreateChapterData, CreateChapterVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateChapter(dc: DataConnect, options?: useDataConnectMutationOptions<CreateChapterData, FirebaseError, CreateChapterVariables>): UseDataConnectMutationResult<CreateChapterData, CreateChapterVariables>;
```

### Variables
The `CreateChapter` Mutation requires an argument of type `CreateChapterVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateChapterVariables {
  name: string;
  description?: string | null;
  subjectId: UUIDString;
  schoolId: UUIDString;
  orderIndex?: number | null;
}
```
### Return Type
Recall that calling the `CreateChapter` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateChapter` Mutation is of type `CreateChapterData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateChapterData {
  chapter_insert: Chapter_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateChapter`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateChapterVariables } from '@firebasegen/default-connector';
import { useCreateChapter } from '@firebasegen/default-connector/react'

export default function CreateChapterComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateChapter();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateChapter(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateChapter(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateChapter(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateChapter` Mutation requires an argument of type `CreateChapterVariables`:
  const createChapterVars: CreateChapterVariables = {
    name: ..., 
    description: ..., // optional
    subjectId: ..., 
    schoolId: ..., 
    orderIndex: ..., // optional
  };
  mutation.mutate(createChapterVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., description: ..., subjectId: ..., schoolId: ..., orderIndex: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createChapterVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.chapter_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateChapter
You can execute the `UpdateChapter` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateChapter(options?: useDataConnectMutationOptions<UpdateChapterData, FirebaseError, UpdateChapterVariables>): UseDataConnectMutationResult<UpdateChapterData, UpdateChapterVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateChapter(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateChapterData, FirebaseError, UpdateChapterVariables>): UseDataConnectMutationResult<UpdateChapterData, UpdateChapterVariables>;
```

### Variables
The `UpdateChapter` Mutation requires an argument of type `UpdateChapterVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateChapterVariables {
  chapterId: UUIDString;
  name?: string | null;
  description?: string | null;
  orderIndex?: number | null;
}
```
### Return Type
Recall that calling the `UpdateChapter` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateChapter` Mutation is of type `UpdateChapterData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateChapterData {
  chapter_update?: Chapter_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateChapter`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateChapterVariables } from '@firebasegen/default-connector';
import { useUpdateChapter } from '@firebasegen/default-connector/react'

export default function UpdateChapterComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateChapter();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateChapter(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateChapter(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateChapter(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateChapter` Mutation requires an argument of type `UpdateChapterVariables`:
  const updateChapterVars: UpdateChapterVariables = {
    chapterId: ..., 
    name: ..., // optional
    description: ..., // optional
    orderIndex: ..., // optional
  };
  mutation.mutate(updateChapterVars);
  // Variables can be defined inline as well.
  mutation.mutate({ chapterId: ..., name: ..., description: ..., orderIndex: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateChapterVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.chapter_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteChapter
You can execute the `DeleteChapter` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteChapter(options?: useDataConnectMutationOptions<DeleteChapterData, FirebaseError, DeleteChapterVariables>): UseDataConnectMutationResult<DeleteChapterData, DeleteChapterVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteChapter(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteChapterData, FirebaseError, DeleteChapterVariables>): UseDataConnectMutationResult<DeleteChapterData, DeleteChapterVariables>;
```

### Variables
The `DeleteChapter` Mutation requires an argument of type `DeleteChapterVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteChapterVariables {
  chapterId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteChapter` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteChapter` Mutation is of type `DeleteChapterData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteChapterData {
  chapter_delete?: Chapter_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteChapter`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteChapterVariables } from '@firebasegen/default-connector';
import { useDeleteChapter } from '@firebasegen/default-connector/react'

export default function DeleteChapterComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteChapter();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteChapter(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteChapter(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteChapter(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteChapter` Mutation requires an argument of type `DeleteChapterVariables`:
  const deleteChapterVars: DeleteChapterVariables = {
    chapterId: ..., 
  };
  mutation.mutate(deleteChapterVars);
  // Variables can be defined inline as well.
  mutation.mutate({ chapterId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteChapterVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.chapter_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateLesson
You can execute the `CreateLesson` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateLesson(options?: useDataConnectMutationOptions<CreateLessonData, FirebaseError, CreateLessonVariables>): UseDataConnectMutationResult<CreateLessonData, CreateLessonVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateLesson(dc: DataConnect, options?: useDataConnectMutationOptions<CreateLessonData, FirebaseError, CreateLessonVariables>): UseDataConnectMutationResult<CreateLessonData, CreateLessonVariables>;
```

### Variables
The `CreateLesson` Mutation requires an argument of type `CreateLessonVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateLesson` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateLesson` Mutation is of type `CreateLessonData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateLessonData {
  lesson_insert: Lesson_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateLesson`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateLessonVariables } from '@firebasegen/default-connector';
import { useCreateLesson } from '@firebasegen/default-connector/react'

export default function CreateLessonComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateLesson();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateLesson(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateLesson(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateLesson(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateLesson` Mutation requires an argument of type `CreateLessonVariables`:
  const createLessonVars: CreateLessonVariables = {
    name: ..., 
    description: ..., // optional
    content: ..., // optional
    chapterId: ..., 
    subjectId: ..., 
    schoolId: ..., 
    orderIndex: ..., // optional
  };
  mutation.mutate(createLessonVars);
  // Variables can be defined inline as well.
  mutation.mutate({ name: ..., description: ..., content: ..., chapterId: ..., subjectId: ..., schoolId: ..., orderIndex: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createLessonVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.lesson_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateLesson
You can execute the `UpdateLesson` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateLesson(options?: useDataConnectMutationOptions<UpdateLessonData, FirebaseError, UpdateLessonVariables>): UseDataConnectMutationResult<UpdateLessonData, UpdateLessonVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateLesson(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLessonData, FirebaseError, UpdateLessonVariables>): UseDataConnectMutationResult<UpdateLessonData, UpdateLessonVariables>;
```

### Variables
The `UpdateLesson` Mutation requires an argument of type `UpdateLessonVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateLessonVariables {
  lessonId: UUIDString;
  name?: string | null;
  description?: string | null;
  content?: string | null;
  orderIndex?: number | null;
}
```
### Return Type
Recall that calling the `UpdateLesson` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateLesson` Mutation is of type `UpdateLessonData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateLessonData {
  lesson_update?: Lesson_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateLesson`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateLessonVariables } from '@firebasegen/default-connector';
import { useUpdateLesson } from '@firebasegen/default-connector/react'

export default function UpdateLessonComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateLesson();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateLesson(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateLesson(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateLesson(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateLesson` Mutation requires an argument of type `UpdateLessonVariables`:
  const updateLessonVars: UpdateLessonVariables = {
    lessonId: ..., 
    name: ..., // optional
    description: ..., // optional
    content: ..., // optional
    orderIndex: ..., // optional
  };
  mutation.mutate(updateLessonVars);
  // Variables can be defined inline as well.
  mutation.mutate({ lessonId: ..., name: ..., description: ..., content: ..., orderIndex: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateLessonVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.lesson_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteLesson
You can execute the `DeleteLesson` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteLesson(options?: useDataConnectMutationOptions<DeleteLessonData, FirebaseError, DeleteLessonVariables>): UseDataConnectMutationResult<DeleteLessonData, DeleteLessonVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteLesson(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteLessonData, FirebaseError, DeleteLessonVariables>): UseDataConnectMutationResult<DeleteLessonData, DeleteLessonVariables>;
```

### Variables
The `DeleteLesson` Mutation requires an argument of type `DeleteLessonVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteLessonVariables {
  lessonId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteLesson` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteLesson` Mutation is of type `DeleteLessonData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteLessonData {
  lesson_delete?: Lesson_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteLesson`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteLessonVariables } from '@firebasegen/default-connector';
import { useDeleteLesson } from '@firebasegen/default-connector/react'

export default function DeleteLessonComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteLesson();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteLesson(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteLesson(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteLesson(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteLesson` Mutation requires an argument of type `DeleteLessonVariables`:
  const deleteLessonVars: DeleteLessonVariables = {
    lessonId: ..., 
  };
  mutation.mutate(deleteLessonVars);
  // Variables can be defined inline as well.
  mutation.mutate({ lessonId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteLessonVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.lesson_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateTeacher
You can execute the `CreateTeacher` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateTeacher(options?: useDataConnectMutationOptions<CreateTeacherData, FirebaseError, CreateTeacherVariables>): UseDataConnectMutationResult<CreateTeacherData, CreateTeacherVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateTeacher(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTeacherData, FirebaseError, CreateTeacherVariables>): UseDataConnectMutationResult<CreateTeacherData, CreateTeacherVariables>;
```

### Variables
The `CreateTeacher` Mutation requires an argument of type `CreateTeacherVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateTeacherVariables {
  teacherId: string;
  userId: string;
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `CreateTeacher` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateTeacher` Mutation is of type `CreateTeacherData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateTeacherData {
  teacher_insert: Teacher_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateTeacher`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateTeacherVariables } from '@firebasegen/default-connector';
import { useCreateTeacher } from '@firebasegen/default-connector/react'

export default function CreateTeacherComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateTeacher();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateTeacher(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTeacher(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateTeacher(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateTeacher` Mutation requires an argument of type `CreateTeacherVariables`:
  const createTeacherVars: CreateTeacherVariables = {
    teacherId: ..., 
    userId: ..., 
    schoolId: ..., 
  };
  mutation.mutate(createTeacherVars);
  // Variables can be defined inline as well.
  mutation.mutate({ teacherId: ..., userId: ..., schoolId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createTeacherVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.teacher_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateTeacher
You can execute the `UpdateTeacher` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateTeacher(options?: useDataConnectMutationOptions<UpdateTeacherData, FirebaseError, UpdateTeacherVariables>): UseDataConnectMutationResult<UpdateTeacherData, UpdateTeacherVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateTeacher(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTeacherData, FirebaseError, UpdateTeacherVariables>): UseDataConnectMutationResult<UpdateTeacherData, UpdateTeacherVariables>;
```

### Variables
The `UpdateTeacher` Mutation requires an argument of type `UpdateTeacherVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateTeacherVariables {
  teacherId: UUIDString;
  teacherIdString: string;
}
```
### Return Type
Recall that calling the `UpdateTeacher` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateTeacher` Mutation is of type `UpdateTeacherData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateTeacherData {
  teacher_update?: Teacher_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateTeacher`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateTeacherVariables } from '@firebasegen/default-connector';
import { useUpdateTeacher } from '@firebasegen/default-connector/react'

export default function UpdateTeacherComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateTeacher();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateTeacher(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTeacher(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateTeacher(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateTeacher` Mutation requires an argument of type `UpdateTeacherVariables`:
  const updateTeacherVars: UpdateTeacherVariables = {
    teacherId: ..., 
    teacherIdString: ..., 
  };
  mutation.mutate(updateTeacherVars);
  // Variables can be defined inline as well.
  mutation.mutate({ teacherId: ..., teacherIdString: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateTeacherVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.teacher_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteTeacher
You can execute the `DeleteTeacher` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteTeacher(options?: useDataConnectMutationOptions<DeleteTeacherData, FirebaseError, DeleteTeacherVariables>): UseDataConnectMutationResult<DeleteTeacherData, DeleteTeacherVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteTeacher(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTeacherData, FirebaseError, DeleteTeacherVariables>): UseDataConnectMutationResult<DeleteTeacherData, DeleteTeacherVariables>;
```

### Variables
The `DeleteTeacher` Mutation requires an argument of type `DeleteTeacherVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteTeacherVariables {
  teacherId: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteTeacher` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteTeacher` Mutation is of type `DeleteTeacherData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteTeacherData {
  teacher_delete?: Teacher_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteTeacher`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteTeacherVariables } from '@firebasegen/default-connector';
import { useDeleteTeacher } from '@firebasegen/default-connector/react'

export default function DeleteTeacherComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteTeacher();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteTeacher(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTeacher(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteTeacher(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteTeacher` Mutation requires an argument of type `DeleteTeacherVariables`:
  const deleteTeacherVars: DeleteTeacherVariables = {
    teacherId: ..., 
  };
  mutation.mutate(deleteTeacherVars);
  // Variables can be defined inline as well.
  mutation.mutate({ teacherId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteTeacherVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.teacher_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AssignSubjectToClass
You can execute the `AssignSubjectToClass` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useAssignSubjectToClass(options?: useDataConnectMutationOptions<AssignSubjectToClassData, FirebaseError, AssignSubjectToClassVariables>): UseDataConnectMutationResult<AssignSubjectToClassData, AssignSubjectToClassVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAssignSubjectToClass(dc: DataConnect, options?: useDataConnectMutationOptions<AssignSubjectToClassData, FirebaseError, AssignSubjectToClassVariables>): UseDataConnectMutationResult<AssignSubjectToClassData, AssignSubjectToClassVariables>;
```

### Variables
The `AssignSubjectToClass` Mutation requires an argument of type `AssignSubjectToClassVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AssignSubjectToClassVariables {
  classId: UUIDString;
  subjectId: UUIDString;
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `AssignSubjectToClass` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AssignSubjectToClass` Mutation is of type `AssignSubjectToClassData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AssignSubjectToClassData {
  classSubject_upsert: ClassSubject_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AssignSubjectToClass`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AssignSubjectToClassVariables } from '@firebasegen/default-connector';
import { useAssignSubjectToClass } from '@firebasegen/default-connector/react'

export default function AssignSubjectToClassComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAssignSubjectToClass();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAssignSubjectToClass(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignSubjectToClass(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignSubjectToClass(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAssignSubjectToClass` Mutation requires an argument of type `AssignSubjectToClassVariables`:
  const assignSubjectToClassVars: AssignSubjectToClassVariables = {
    classId: ..., 
    subjectId: ..., 
    schoolId: ..., 
  };
  mutation.mutate(assignSubjectToClassVars);
  // Variables can be defined inline as well.
  mutation.mutate({ classId: ..., subjectId: ..., schoolId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(assignSubjectToClassVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.classSubject_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RemoveSubjectFromClass
You can execute the `RemoveSubjectFromClass` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useRemoveSubjectFromClass(options?: useDataConnectMutationOptions<RemoveSubjectFromClassData, FirebaseError, RemoveSubjectFromClassVariables>): UseDataConnectMutationResult<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRemoveSubjectFromClass(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveSubjectFromClassData, FirebaseError, RemoveSubjectFromClassVariables>): UseDataConnectMutationResult<RemoveSubjectFromClassData, RemoveSubjectFromClassVariables>;
```

### Variables
The `RemoveSubjectFromClass` Mutation requires an argument of type `RemoveSubjectFromClassVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RemoveSubjectFromClassVariables {
  classId: UUIDString;
  subjectId: UUIDString;
}
```
### Return Type
Recall that calling the `RemoveSubjectFromClass` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RemoveSubjectFromClass` Mutation is of type `RemoveSubjectFromClassData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RemoveSubjectFromClassData {
  classSubject_delete?: ClassSubject_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RemoveSubjectFromClass`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RemoveSubjectFromClassVariables } from '@firebasegen/default-connector';
import { useRemoveSubjectFromClass } from '@firebasegen/default-connector/react'

export default function RemoveSubjectFromClassComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRemoveSubjectFromClass();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRemoveSubjectFromClass(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveSubjectFromClass(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveSubjectFromClass(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRemoveSubjectFromClass` Mutation requires an argument of type `RemoveSubjectFromClassVariables`:
  const removeSubjectFromClassVars: RemoveSubjectFromClassVariables = {
    classId: ..., 
    subjectId: ..., 
  };
  mutation.mutate(removeSubjectFromClassVars);
  // Variables can be defined inline as well.
  mutation.mutate({ classId: ..., subjectId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(removeSubjectFromClassVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.classSubject_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AssignTeacherToClass
You can execute the `AssignTeacherToClass` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useAssignTeacherToClass(options?: useDataConnectMutationOptions<AssignTeacherToClassData, FirebaseError, AssignTeacherToClassVariables>): UseDataConnectMutationResult<AssignTeacherToClassData, AssignTeacherToClassVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAssignTeacherToClass(dc: DataConnect, options?: useDataConnectMutationOptions<AssignTeacherToClassData, FirebaseError, AssignTeacherToClassVariables>): UseDataConnectMutationResult<AssignTeacherToClassData, AssignTeacherToClassVariables>;
```

### Variables
The `AssignTeacherToClass` Mutation requires an argument of type `AssignTeacherToClassVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AssignTeacherToClassVariables {
  teacherId: UUIDString;
  classId: UUIDString;
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `AssignTeacherToClass` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AssignTeacherToClass` Mutation is of type `AssignTeacherToClassData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AssignTeacherToClassData {
  teacherClass_upsert: TeacherClass_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AssignTeacherToClass`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AssignTeacherToClassVariables } from '@firebasegen/default-connector';
import { useAssignTeacherToClass } from '@firebasegen/default-connector/react'

export default function AssignTeacherToClassComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAssignTeacherToClass();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAssignTeacherToClass(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignTeacherToClass(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignTeacherToClass(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAssignTeacherToClass` Mutation requires an argument of type `AssignTeacherToClassVariables`:
  const assignTeacherToClassVars: AssignTeacherToClassVariables = {
    teacherId: ..., 
    classId: ..., 
    schoolId: ..., 
  };
  mutation.mutate(assignTeacherToClassVars);
  // Variables can be defined inline as well.
  mutation.mutate({ teacherId: ..., classId: ..., schoolId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(assignTeacherToClassVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.teacherClass_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RemoveTeacherFromClass
You can execute the `RemoveTeacherFromClass` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useRemoveTeacherFromClass(options?: useDataConnectMutationOptions<RemoveTeacherFromClassData, FirebaseError, RemoveTeacherFromClassVariables>): UseDataConnectMutationResult<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRemoveTeacherFromClass(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveTeacherFromClassData, FirebaseError, RemoveTeacherFromClassVariables>): UseDataConnectMutationResult<RemoveTeacherFromClassData, RemoveTeacherFromClassVariables>;
```

### Variables
The `RemoveTeacherFromClass` Mutation requires an argument of type `RemoveTeacherFromClassVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RemoveTeacherFromClassVariables {
  teacherId: UUIDString;
  classId: UUIDString;
}
```
### Return Type
Recall that calling the `RemoveTeacherFromClass` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RemoveTeacherFromClass` Mutation is of type `RemoveTeacherFromClassData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RemoveTeacherFromClassData {
  teacherClass_delete?: TeacherClass_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RemoveTeacherFromClass`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RemoveTeacherFromClassVariables } from '@firebasegen/default-connector';
import { useRemoveTeacherFromClass } from '@firebasegen/default-connector/react'

export default function RemoveTeacherFromClassComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRemoveTeacherFromClass();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRemoveTeacherFromClass(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveTeacherFromClass(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveTeacherFromClass(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRemoveTeacherFromClass` Mutation requires an argument of type `RemoveTeacherFromClassVariables`:
  const removeTeacherFromClassVars: RemoveTeacherFromClassVariables = {
    teacherId: ..., 
    classId: ..., 
  };
  mutation.mutate(removeTeacherFromClassVars);
  // Variables can be defined inline as well.
  mutation.mutate({ teacherId: ..., classId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(removeTeacherFromClassVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.teacherClass_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AssignTeacherToSubject
You can execute the `AssignTeacherToSubject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useAssignTeacherToSubject(options?: useDataConnectMutationOptions<AssignTeacherToSubjectData, FirebaseError, AssignTeacherToSubjectVariables>): UseDataConnectMutationResult<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAssignTeacherToSubject(dc: DataConnect, options?: useDataConnectMutationOptions<AssignTeacherToSubjectData, FirebaseError, AssignTeacherToSubjectVariables>): UseDataConnectMutationResult<AssignTeacherToSubjectData, AssignTeacherToSubjectVariables>;
```

### Variables
The `AssignTeacherToSubject` Mutation requires an argument of type `AssignTeacherToSubjectVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AssignTeacherToSubjectVariables {
  teacherId: UUIDString;
  subjectId: UUIDString;
  schoolId: UUIDString;
}
```
### Return Type
Recall that calling the `AssignTeacherToSubject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AssignTeacherToSubject` Mutation is of type `AssignTeacherToSubjectData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AssignTeacherToSubjectData {
  teacherSubject_upsert: TeacherSubject_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AssignTeacherToSubject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AssignTeacherToSubjectVariables } from '@firebasegen/default-connector';
import { useAssignTeacherToSubject } from '@firebasegen/default-connector/react'

export default function AssignTeacherToSubjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAssignTeacherToSubject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAssignTeacherToSubject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignTeacherToSubject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAssignTeacherToSubject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAssignTeacherToSubject` Mutation requires an argument of type `AssignTeacherToSubjectVariables`:
  const assignTeacherToSubjectVars: AssignTeacherToSubjectVariables = {
    teacherId: ..., 
    subjectId: ..., 
    schoolId: ..., 
  };
  mutation.mutate(assignTeacherToSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ teacherId: ..., subjectId: ..., schoolId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(assignTeacherToSubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.teacherSubject_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RemoveTeacherFromSubject
You can execute the `RemoveTeacherFromSubject` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useRemoveTeacherFromSubject(options?: useDataConnectMutationOptions<RemoveTeacherFromSubjectData, FirebaseError, RemoveTeacherFromSubjectVariables>): UseDataConnectMutationResult<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRemoveTeacherFromSubject(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveTeacherFromSubjectData, FirebaseError, RemoveTeacherFromSubjectVariables>): UseDataConnectMutationResult<RemoveTeacherFromSubjectData, RemoveTeacherFromSubjectVariables>;
```

### Variables
The `RemoveTeacherFromSubject` Mutation requires an argument of type `RemoveTeacherFromSubjectVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RemoveTeacherFromSubjectVariables {
  teacherId: UUIDString;
  subjectId: UUIDString;
}
```
### Return Type
Recall that calling the `RemoveTeacherFromSubject` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RemoveTeacherFromSubject` Mutation is of type `RemoveTeacherFromSubjectData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RemoveTeacherFromSubjectData {
  teacherSubject_delete?: TeacherSubject_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RemoveTeacherFromSubject`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RemoveTeacherFromSubjectVariables } from '@firebasegen/default-connector';
import { useRemoveTeacherFromSubject } from '@firebasegen/default-connector/react'

export default function RemoveTeacherFromSubjectComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRemoveTeacherFromSubject();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRemoveTeacherFromSubject(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveTeacherFromSubject(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRemoveTeacherFromSubject(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRemoveTeacherFromSubject` Mutation requires an argument of type `RemoveTeacherFromSubjectVariables`:
  const removeTeacherFromSubjectVars: RemoveTeacherFromSubjectVariables = {
    teacherId: ..., 
    subjectId: ..., 
  };
  mutation.mutate(removeTeacherFromSubjectVars);
  // Variables can be defined inline as well.
  mutation.mutate({ teacherId: ..., subjectId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(removeTeacherFromSubjectVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.teacherSubject_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

