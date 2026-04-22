import { useState , useEffect } from "react"
import { useDispatch } from "react-redux"
import authservice, { Authservice } from './Appwrite/auth';
import { login , logout } from "./store/slice";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
function App() {


const [loading , setLoading] = useState(true)
const dispatch = useDispatch()
 
useEffect(()=> {
authservice.isLoogin().then((data)=>{

  if(data){
    dispatch(login([userData]))
  }
  else{
    dispatch(logout())
  }
}).finally(()=>{setLoading(false)})
  
} , [])

 if(loading){
  return(
  <div> loading</div>
    
  )
 }
 else
 {
  return(
    <>
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
    <Header />
    <Footer />
    </div>
    </>
  )
 }
}

export default App
