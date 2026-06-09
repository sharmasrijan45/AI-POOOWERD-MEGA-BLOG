import React from 'react'
import { Container, Logo, Logoutbtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Header() {
  const authStatus = useSelector((state) => state.auth.status)


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
    <header className='sticky top-0 z-50 border-b border-purple-500/30 bg-slate-950/95 shadow-2xl shadow-purple-950/30 backdrop-blur-sm'>
      <Container>
        <nav className='flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-4'>
            <Link to='/' className='block transition-transform duration-300 hover:scale-105'>
              <Logo />
            </Link>
            <p className='hidden text-sm text-slate-300 md:block'>A modern blogging platform for creators and teams.</p>
          </div>

          <ul className='flex flex-wrap items-center justify-center gap-2 md:gap-3'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className='rounded-full border border-purple-500/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition duration-300 hover:bg-purple-600/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400'
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null,
            )}
            {authStatus ? (
              <li>
                <Logoutbtn />
              </li>
            ) : null}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
