import { create } from 'zustand'
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
export const userStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false })

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);


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