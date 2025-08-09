'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '@/lib/firebaseClient';
import { UserData } from '@/lib/userManagement';

interface TeacherData {
  uid: string;
  name: string;
  email: string;
  teacherId: string;
  userId: string;
  schoolId: string;
  subjects: string[];
  classes: string[];
  createdAt: Date | null;
  createdBy: string;
  [key: string]: unknown;
}
import { useAuthState } from 'react-firebase-hooks/auth';
const db = getFirestore();

// Helper function to safely get a value from Firestore document
const getSafeValue = (value: any, defaultValue: any = null) => {
  // Handle Firestore Timestamp
  if (value && typeof value.toDate === 'function') {
    return value.toDate();
  }
  // Handle DocumentReference
  if (value && typeof value.path === 'string') {
    return value.path.split('/').pop();
  }
  return value !== undefined ? value : defaultValue;
};

export default function TestPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authUser, authLoading] = useAuthState(auth);

  const fetchTeacherData = async (userId: string) => {
    if (!userId) return null;
    
    try {
      setTeacherLoading(true);
      
      // Query the teachers collection where userId matches the current user's UID
      const teachersRef = collection(db, 'teachers');
      const q = query(teachersRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log('No teacher data found for user:', userId);
        return null;
      }
      
      // Get the first matching document (should be only one per user)
      const teacherDoc = querySnapshot.docs[0];
      const teacherData = teacherDoc.data();
      
      // Helper function to extract ID from reference
      const getReferenceId = (ref: any) => {
        if (!ref) return '';
        if (typeof ref === 'string') return ref.split('/').pop() || '';
        if (ref.path) return ref.path.split('/').pop() || '';
        return '';
      };
      
      return {
        ...teacherData,
        uid: teacherDoc.id,
        name: teacherData.name || '',
        email: teacherData.email || '',
        teacherId: teacherData.teacherId || '',
        userId: teacherData.userId || '',
        schoolId: getReferenceId(teacherData.schoolId),
        subjects: (teacherData.subjects || []).map((s: any) => getReferenceId(s)),
        classes: (teacherData.classes || []).map((c: any) => getReferenceId(c)),
        createdAt: getSafeValue(teacherData.createdAt, null),
        createdBy: getReferenceId(teacherData.createdBy)
      } as TeacherData;
    } catch (err) {
      console.error('Error fetching teacher data:', err);
      return null;
    } finally {
      setTeacherLoading(false);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!authUser) {
        setLoading(false);
        setError('No user is currently logged in.');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', authUser.uid));
        
        if (!userDoc.exists()) {
          setError('User data not found.');
          setLoading(false);
          return;
        }

        const userDocData = userDoc.data();
        const userData: UserData = {
          ...userDocData,
          uid: userDoc.id,
          email: getSafeValue(userDocData?.email, authUser.email || ''),
          displayName: getSafeValue(userDocData?.displayName, authUser.displayName || 'User'),
          role: getSafeValue(userDocData?.role, 'student'),
          schoolId: getSafeValue(userDocData?.schoolId, null),
          isActive: userDocData?.isActive !== undefined ? userDocData.isActive : true,
          createdAt: getSafeValue(userDocData?.createdAt, null),
          updatedAt: getSafeValue(userDocData?.updatedAt, null)
        };
        
        setUser(userData);
        
        // If user is a teacher, fetch teacher data
        if (userData.role === 'teacher') {
          const teacherData = await fetchTeacherData(authUser.uid);
          setTeacherData(teacherData);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchCurrentUser();
    }
  }, [authUser, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Loading your profile...</h1>
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            {!authUser && (
              <p className="mt-2">Please <a href="/login" className="text-blue-600 hover:underline">sign in</a> to view your profile.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold mb-4">No User Data Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find your profile information.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and account information.</p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.displayName || 'Not provided'}</dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.email || 'Not provided'}</dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                <dd className="mt-1">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                      user.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'student' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {user.role}
                  </span>
                </dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Account Status</dt>
                <dd className="mt-1">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </dd>
              </div>
              
              {user.schoolId && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">School ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.schoolId}</dd>
                </div>
              )}
              
              {user.createdAt && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              )}
            </div>
          </div>
          
          <div className="px-4 py-4 bg-gray-50 text-right sm:px-6">
            <p className="text-xs text-gray-500">
              Last updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'Unknown'}
            </p>
          </div>
        </div>

        {/* Teacher Information Section */}
        {user.role === 'teacher' && (
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Teacher Information</h2>
            </div>
            
            {teacherLoading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ) : teacherData ? (
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{teacherData.name}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{teacherData.email}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Teacher ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{teacherData.teacherId}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">School ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{teacherData.schoolId}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Created By</dt>
                    <dd className="mt-1 text-sm text-gray-900">{teacherData.createdBy}</dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Created At</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {teacherData.createdAt ? new Date(teacherData.createdAt).toLocaleString() : 'N/A'}
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Subjects</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <div className="flex flex-wrap gap-2">
                        {teacherData.subjects.length > 0 ? (
                          teacherData.subjects.map((subjectId, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {subjectId}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No subjects assigned</span>
                        )}
                      </div>
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Classes</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <div className="flex flex-wrap gap-2">
                        {teacherData.classes.length > 0 ? (
                          teacherData.classes.map((classId, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {classId}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No classes assigned</span>
                        )}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-sm text-gray-500">No teacher information available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
