import { create } from 'zustand'
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { userStore } from './userStore';
export const useChatStore = create((set) => ({
  chat: null,
  user: null,
  friendName: null,
  isCurrentUserBlocked:false,
  changeChat: (chatId, user , friendName) => {
    const currentUser = userStore.getState().currentUser;

    //Проверка на блокировку

    if (user.blocked.includes(currentUser.id)) {
      return set ({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false

      })
    }

    //Проверка на блокировку

    else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true
      })
    }

    else{
      return set({
        friendName,
        chatId,
        user: user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true
      })
    }
  },

  changeBlock:() => {
    set(state => ({...state,isReceiverBlocked: !state.isReceiverBlocked})) 
  }
}))


