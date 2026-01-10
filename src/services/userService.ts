import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, FirebaseUser, db } from '@/lib/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: 'lead' | 'member';
  vertical: string;
  createdAt: Date;
  lastLoginAt: Date;
}

/**
 * Creates or updates a user profile in Firestore
 */
export const createUserProfile = async (user: FirebaseUser, profileData: Partial<Pick<UserProfile, 'name' | 'role' | 'vertical'>>) => {
  if (!user.uid) {
    throw new Error('User ID is required to create profile');
  }

  const userProfileRef = doc(db, 'users', user.uid);
  
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    name: profileData.name || user.displayName || 'User',
    role: profileData.role || 'member',
    vertical: profileData.vertical || '',
    createdAt: new Date(), // This will be converted to Timestamp by Firestore
    lastLoginAt: new Date()
  };

  try {
    await setDoc(userProfileRef, userProfile, { merge: true });
    return userProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

/**
 * Updates a user profile in Firestore
 */
export const updateUserProfile = async (uid: string, profileUpdates: Partial<Omit<UserProfile, 'uid' | 'email' | 'createdAt'>>) => {
  const userProfileRef = doc(db, 'users', uid);
  
  try {
    await updateDoc(userProfileRef, {
      ...profileUpdates,
      lastLoginAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Gets a user profile from Firestore
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userProfileRef = doc(db, 'users', uid);
  
  try {
    const docSnap = await getDoc(userProfileRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        uid: data.uid,
        email: data.email,
        name: data.name,
        role: data.role,
        vertical: data.vertical,
        createdAt: data.createdAt.toDate(),
        lastLoginAt: data.lastLoginAt.toDate()
      } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};