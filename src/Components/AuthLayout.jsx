import React from 'react'
import { useState , useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Protection ({children , authentication = true}) {

const navigate = useNavigate()
const [loader , setLoader] = useState(true)
  
const authstatus = useSelector(state => state.auth.status)  // authentication status from store 
  
useEffect(()=>{

if(authentication && authstatus !== authentication) {

    navigate("/login")
}else if( !authentication &&  authstatus !== authentication ) 
{
    navigate("/")
}
setLoader(false)

} , [authstatus , navigate , authentication])

   if (loader) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='inline-block mb-4'>
            <div className='w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin'></div>
          </div>
          <p className='text-white text-lg font-semibold'>Loading...</p>
        </div>
      </div>
    )
   }
   return <>{children}</>
}


