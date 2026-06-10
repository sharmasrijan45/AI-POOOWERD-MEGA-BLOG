import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authservice from '../../Appwrite/auth'
import { logout } from '../../store/slice'
export default function Logoutbtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async ()=> {
        try {
            await authservice.logout()
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            dispatch(logout())
            navigate("/")
        }
    }
  return (
  <button onClick={handleLogout}  className='inline-block rounded-full border border-purple-500/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition duration-300 hover:bg-purple-600/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400'>
    LogOut
  </button>
  )
}
