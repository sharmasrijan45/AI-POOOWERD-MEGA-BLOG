import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../Appwrite/auth'
import { logout } from '../../store/slice'
export default function Logoutbtn() {
    const dispatch = useDispatch()
    const logout = ()=> {
authservice.logout().then(()=>{dispatch(logout())})
    }
  return (
  <button className='inline-block px-6 py-4 duration-200 hover:bg-blue-100 rounded h-full'>
    LogOut
  </button>
  )
}
