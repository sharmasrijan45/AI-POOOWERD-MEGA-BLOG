import { createSlice } from "@reduxjs/toolkit";

const toSerializable = (value) => {
    if (Array.isArray(value)) {
        return value.map(toSerializable)
    }

    if (value && typeof value === "object") {
        return Object.entries(value).reduce((acc, [key, item]) => {
            if (typeof item !== "function") {
                acc[key] = toSerializable(item)
            }

            return acc
        }, {})
    }

    return typeof value === "function" ? undefined : value
}

const initialState = {
    status : false , 
    userData : null
}

const authSlice = createSlice({

   name : "auth", 
   initialState , 
   reducers : { 
    login : {
        reducer : (state , action)=> {
            state.status = true ;
            state.userData = action.payload
        },
        prepare : (userData)=> ({
            payload : toSerializable(userData)
        })
    } ,
    logout : (state)=> {
        state.status = false 
        state.userData = null
    }
    }
})

export default authSlice.reducer
export const  { login , logout  } = authSlice.actions ;
