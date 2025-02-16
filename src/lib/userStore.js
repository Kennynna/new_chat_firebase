import { create } from 'zustand'
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
export const userStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    console.log('uid', uid);
    if (!uid) return set({ currentUser: null, isLoading: false })
    
    try {
      console.log('fetchUserInfo успешно')
      const docRef = doc(db, "users", uid);
      console.log('docRef', docRef);
      const docSnap = await getDoc(docRef);
      console.log('docSnap.data()', docSnap.data());
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false }) // существует ли такой документ в БД
      } else {
        set({ currentUser: null, isLoading: false })
      }
    } catch (error) {
      return set({ currentUser: null, isLoading: false })
    }
  }
}))


export const userStoreMessage = create((set) => ({
  message: [],
  isLoading: true,
  addMessage: (messageData) => set((state) => ({
    message: [...state.message, {
      date: messageData.date,
      id: messageData.id,
      message: messageData.message,
      name: messageData.name
    }]
  })),
}))