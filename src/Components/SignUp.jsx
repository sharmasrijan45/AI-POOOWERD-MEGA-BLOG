import React, {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/slice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import authservice from './../Appwrite/auth';

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userAccount = await authservice.createAcc(data)
            if (!userAccount) {
                setError("Signup failed. Please try again.")
                return
            }

            const session = await authservice.login(data)
            if (!session) {
                setError("Signup succeeded but login failed. Please sign in manually.")
                return
            }

            const userData = await authservice.isLoogin()
            if (!userData) {
                setError("Signup succeeded but fetching user failed.")
                return
            }

            dispatch(login(userData))
            navigate("/")
        } catch (error) {
            const message = error?.message || String(error)
            setError(message)
            console.error("Signup error:", error)
        }
    }

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4">
            <div className={`mx-auto w-full max-w-lg bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-900/50`}>
            <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold leading-tight text-white">Create Account</h2>
                <p className="mt-3 text-center text-sm text-gray-300">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-purple-400 transition-all duration-200 hover:text-purple-300 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-400 mt-6 text-center font-semibold bg-red-500/20 py-2 rounded-lg">{error}</p>}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup
