import React from 'react'
import { Link  , useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {login as stateLogin} from "../store/slice"
import { useDispatch } from 'react-redux'
import Button from './Button';
import Input from './Input';
import Logo from './Logo';
import authservice from '../Appwrite/auth'
import { useForm } from 'react-hook-form'
function LoginComponents() {
const navigate = useNavigate()
const dispatch = useDispatch()
 const {register,handleSubmit} = useForm()
 const [error , setError] = useState("")

// hamesha isi trh se login components bnane hai  like 1 error state .
const Login = async(data)=> {
    setError("")
    try {
      const session = await authservice.login(data)
      if (!session) {
        setError("Login failed. Please check your credentials.")
        return
      }

      const userData = await authservice.isLoogin()
      if (!userData) {
        setError("Login succeeded but fetching user failed. Please refresh and try again.")
        return
      }

      dispatch(stateLogin(userData))
      navigate("/")
    } catch (error) {
        const message = error?.message || String(error)
        setError(message)
        console.error("Login error:", error)
    }
}

  return (
     <div
    className='flex items-center justify-center w-full min-h-screen px-4'
    >
        <div className={`mx-auto w-full max-w-lg bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-900/50`}>
        <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight text-white">🔐 Sign in</h2>
        <p className="mt-3 text-center text-sm text-gray-300">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-purple-400 transition-all duration-200 hover:text-purple-300 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-400 mt-6 text-center font-semibold bg-red-500/20 py-2 rounded-lg">{error}</p>}
        <form onSubmit={handleSubmit(Login)} className='mt-8'>
         <div className=' space-y-5'>
             <Input 
              label = "Email"
              type = "email"
              {...register("email" , {
                required : true , 
                validate : {
                    matchPatern : (value)=>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address"
                }
              }  )}
             />
            
             <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
       

         </div>
        </form>
        </div>
    </div>
  )
}

export default LoginComponents
