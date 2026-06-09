import { useState , useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import authservice from './Appwrite/auth';
import { login , logout } from "./store/slice";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
function App() {

const [loading , setLoading] = useState(true)
const dispatch = useDispatch()
useEffect(()=>{
  authservice.isLoogin()
    .then((data)=>{
      if(data){
        dispatch(login(data))
      }
      else{
        dispatch(logout())
      }
    })
    .catch(()=>{
      dispatch(logout())
    })
    .finally(()=> setLoading(false))
} ,
[])
 if(loading){
  return(
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <div className="inline-block mb-4">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-white text-lg font-semibold tracking-wide">Loading...</p>
      </div>
    </div>
  )
 }
 else
 {
  return(
    <>
      <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-950 via-slate-900 to-purple-950">
        <Header />
        <main className="flex-1 w-full py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
 }
}

export default App
