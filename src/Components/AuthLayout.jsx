import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
export default function Protection ({children , authentication = true}) {

const location = useLocation()
const authstatus = useSelector(state => state.auth.status)  // authentication status from store 
const shouldRedirect = authstatus !== authentication
const currentPath = `${location.pathname}${location.search}`
const from = location.state?.from
const signedInRedirectPath = from && !["/login", "/signup"].includes(from) ? from : "/all-posts"
const redirectPath = authentication ? "/login" : signedInRedirectPath

   if (shouldRedirect) {
    return (
      <Navigate
        to={redirectPath}
        replace
        state={authentication ? { from: currentPath } : undefined}
      />
    )
   }
   return <>{children}</>
}


