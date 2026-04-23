import React from 'react'
import {Container , Logo , Logoutbtn} from '../index'
import { Link , useNavigate} from 'react-router-dom'
import { useSelector  } from 'react-redux'
export default function Header() {
const authStatus = useSelector((state)=> state.auth.status )
const navigate = useNavigate() //navigation bar 

const navItems = [
 {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  }
]

  return (
    <header className=' py-3 shadow bggr500'></header>
  )
}
