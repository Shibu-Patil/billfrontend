import React, { useContext } from 'react'
import { contextApi } from '../context/Context'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {globalState}=useContext(contextApi)
    console.log(globalState.token);
    
    if(!globalState.token){
      return  <Navigate to="/" replace></Navigate>
    }else{
        return <>{children}</>
    }

}

export default PrivateRoute