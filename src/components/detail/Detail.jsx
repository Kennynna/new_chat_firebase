import React from 'react';
import './detail.css'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { auth } from '../../lib/firebase';
import { userStore } from '../../lib/userStore';
const Detail = () => {
  return (
    <div className='detail ml-2'>
      <DetailHeader />
    </div>
  );
}

export default Detail;

const handleClickLogOut = async () => {
  await auth.signOut();
}
export function DetailHeader() {

  const { currentUser } = userStore()
  return (
    <div className={'flex flex-col justify-center items-center h-full gap-20'}>
      <div className={'flex items-center gap-4 flex-col'}>
        <Avatar sx={{ width: 100, height: 100 }} />
        <p className='text-2xl'>{currentUser.username}</p>
      </div>

      <Button style={{ backgroundColor: 'red', color: 'white', padding: '5px 20px' }} onClick={handleClickLogOut}>Выйти из аккаунта</Button>
    </div>
  )
}