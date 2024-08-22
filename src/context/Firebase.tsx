// Import the functions you need from the SDKs you need
"use client"
import { initializeApp } from "firebase/app";
import { DocumentData, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getDocs, collection, query, where } from 'firebase/firestore';
import { ReactNode, createContext, useContext } from "react";

// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAw1cbY_jHTpnxZlNtYZTrKP2fNnDnMi7I",
  authDomain: "exam-prep-ddcaf.firebaseapp.com",
  projectId: "exam-prep-ddcaf",
  storageBucket: "exam-prep-ddcaf.appspot.com",
  messagingSenderId: "12616366256",
  appId: "1:12616366256:web:d769f8f8399b2966f4e375",
  measurementId: "G-PV7ESGCCXT"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firestore = getFirestore(app);
const storage = getStorage(app);

interface FirebaseContextType {
  fetchSyllabus: ( branch: string) => Promise<DocumentData[]>;
  getPdfURL: (path: string) => Promise<string>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {

  const fetchSyllabus = async (branch: string) => {
    const q = query(
      collection(firestore, 'syllabus'),
      where('branch', '==', branch),
    );
    
    const querySnapshot = await getDocs(q);
    const syllabusFiles = querySnapshot.docs.map(doc => doc.data());
    
    return syllabusFiles;
  };

  const getPdfURL = (path: string): Promise<string>   =>{
    return getDownloadURL(ref(storage, path))
  }



  return(
    <FirebaseContext.Provider value={{
      fetchSyllabus,
      getPdfURL,
    }} >
      {children}
    </FirebaseContext.Provider>
  )
}