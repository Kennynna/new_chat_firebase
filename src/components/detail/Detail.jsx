import React from 'react';
import './detail.css'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { auth } from '../../lib/firebase';
const Detail = () => {
  return (
    <div className='detail ml-2'>
    <DetailHeader/>
    </div>
  );
}

export default Detail;

const handleClickLogOut = async () =>{
   await auth.signOut();
}
export function DetailHeader () {
  return (
      <div className={'flex flex-col justify-between items-center h-full'}>
          <div className={'flex items-center gap-4 flex-col'}>
            <Avatar sx={{ width: 100, height: 100 }}/>
            <p>Status</p>
          </div>

          <Button style={{backgroundColor: 'red', color:'white', padding:'5px 20px'}} onClick={handleClickLogOut}>Выйти</Button>
      </div>
  )
}