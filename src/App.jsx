import List from "./components/list/List"
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/detail"
import Login from "./components/login/Login"
import toast, { Toaster } from 'react-hot-toast';
import { userStore } from "/src/lib/userStore"
import './index.css'
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
const App = () => {

  const { currentUser, fetchUserInfo, isLoading } = userStore()
  useEffect(() => {
    const onSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
      console.log(user.email)
      console.log(currentUser)
    })
    return () => {
      onSub()
    }
  }, [fetchUserInfo, isLoading])

  if (isLoading) return <h1>Loading...</h1>


  return (
    <>
      <div className='container px-5 py-3 '>
        <h1 className="text-2xl font-bold mb-4"> name {currentUser?.username}  </h1> 
        <List />
        <Chat />
        <Detail />
      </div>

      <div>
        <Login />
      </div>

      <Toaster />
    </>
  )
}

export default App