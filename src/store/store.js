import { configureStore } from "@reduxjs/toolkit";
import authslice from './Slice';


const store = configureStore({

reducer : {
    
    auth : authslice
}

})



export default store