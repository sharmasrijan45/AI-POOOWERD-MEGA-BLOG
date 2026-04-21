import { useState , useEffect } from "react"
import { useDispatch } from "react-redux"
import authservice, { Authservice } from './Appwrite/auth';
import { login , logout } from "./store/slice";
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

    <div>
      Loading....
    </div>
  )
 }
 else
 {
  return(
    <>
    
    </>
  )
 }
}

export default App
