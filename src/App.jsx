import React from 'react'
import List from "./components/list/List"
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import Login from "./components/login/Login"
import { Toaster } from 'react-hot-toast';
import { userStore } from "./lib/userStore"
import './index.css'
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import Loading from "./shared/Loading";
import { useChatStore } from "/src/lib/chatStore";
const App = () => {

  const { currentUser, fetchUserInfo, isLoading } = userStore()
  const { chatId } = useChatStore()
  console.log(currentUser);
  useEffect(() => {
    const onSub = onAuthStateChanged(auth, (user) => {
      console.log('Функция App в onAuthStateChanged', user);
      fetchUserInfo(user?.uid)
    })
    return () => {
      onSub()
    }
  }, [fetchUserInfo, isLoading])


  if (isLoading) return <Loading />
  if (!currentUser) return <Login />


  return (

    <>
      <div className='container px-5 '>
        {/*<h1 className="text-2xl font-bold mb-4"> name {currentUser?.username}  </h1>*/}
        <List user={currentUser} />
        {chatId && <Chat />}
        {currentUser && <Detail />}
        <Toaster />
      </div>

    </>
  )
}

export default App