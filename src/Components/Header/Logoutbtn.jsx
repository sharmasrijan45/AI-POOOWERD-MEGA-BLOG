import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../Appwrite/auth'
import { logout } from '../../store/Slice'
export default function Logoutbtn() {
    const dispatch = useDispatch()
    const handleLogout = ()=> {
        authservice.logout().then(()=>{dispatch(logout())})
    }
  return (
  <button onClick={handleLogout}  className='inline-block px-6 py-4 duration-200 hover:bg-blue-100 rounded h-full'>
    LogOut
  </button>
  )
}
