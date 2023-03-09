import { auth ,db} from "../firebase"

import {doc,getDoc} from "firebase/firestore"
import React, { useContext, useEffect, useRef, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const UserInfo = useRef()

    function signup(email,password){
        createUserWithEmailAndPassword(auth,email,password)
        return
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    function logout(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribed = onAuthStateChanged(auth,async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribed
    },[])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        UserInfo
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}