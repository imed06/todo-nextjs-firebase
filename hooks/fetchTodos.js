import { useAuth } from '@/context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {db} from '../firebase'

export default function useFetchTodos() {
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    const [todos,setTodos] = useState({})
    const {currentUser} = useAuth()
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const docRef = doc(db,'users',currentUser.uid)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()){
                    setTodos(docSnap.data().todos)
                }
            }catch(e){
                setError('failed to fetch')
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])
  return {loading,error,todos,setTodos}
}
