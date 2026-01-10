import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  auth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  FirebaseUser,
  createUserWithEmailAndPassword
} from '@/lib/firebase';
import { 
  createUserProfile, 
  getUserProfile, 
  UserProfile 
} from '@/services/userService';

interface User {
  role: 'lead' | 'member';
  email: string;
  name: string;
  vertical: string;
  uid: string; // Firebase user ID
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, userData: Omit<User, 'uid'>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          const userProfile = await getUserProfile(firebaseUser.uid);
          if (userProfile) {
            setUser({
              uid: userProfile.uid,
              email: userProfile.email,
              name: userProfile.name,
              role: userProfile.role,
              vertical: userProfile.vertical
            });
          } else {
            // If no profile exists in Firestore, create a minimal user object
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'User',
              role: 'member', // Default role
              vertical: ''
            });
          }
        } catch (error) {
          console.error('Error getting user profile:', error);
          // Fallback to minimal user data
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'User',
            role: 'member', // Default role
            vertical: ''
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get user profile from Firestore
      const userProfile = await getUserProfile(firebaseUser.uid);
      if (userProfile) {
        setUser({
          uid: userProfile.uid,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role,
          vertical: userProfile.vertical
        });
      } else {
        // If no profile exists in Firestore, create a minimal user object
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'User',
          role: 'member', // Default role
          vertical: ''
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      // Re-throw the error so it can be handled by the calling component
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Note: setUser(null) is handled by the onAuthStateChanged listener
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, userData: Omit<User, 'uid'>) => {
    setIsLoading(true);
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Create user profile in Firestore
      await createUserProfile(firebaseUser, {
        name: userData.name,
        role: userData.role,
        vertical: userData.vertical
      });
      
      // Set user in context
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: userData.name,
        role: userData.role,
        vertical: userData.vertical
      });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};