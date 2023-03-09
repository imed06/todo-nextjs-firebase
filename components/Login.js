import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [islogin, setLogin] = useState(true)
    const {login , signup ,currentUser} = useAuth()
    const handleSubmit = async () => {
        if (!email || !password) {
            setError('please enter email and password')
            return
        }
        if(!islogin){
            try{
                await login(email,password)
            }catch(err){
                setError('incorrect password or email')
            }
            return 
        }
            await signup(email,password)    
    }
    return (
        <div className='flex-1 flex justify-center items-center flex-col text-xs sm:text-sm gap-2 sm:gap-4'>
            <h1 className='text-3xl sm:text-6xl text-center text-amber-300 mb-2'>Hi , this is a little Todo app created with nextjs and firebase</h1>
            <h1 className='font-extrabold text-2xl sm:text-4xl'>{!islogin ? 'LOGIN' : 'Registration'}</h1>
            {error && <div className='w-full max-w-[40ch] text-rose-400 border py-2 border-rose-400 text-center'>{error}</div>}
            <input type="text" placeholder='Email address' className="border-b-2 outline-none focus:border-cyan-300  duration-300 text-slate-900 max-w-[40ch] w-full p-2" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' className="outline-none border-b-2 focus:border-cyan-300 duration-300 text-slate-900  max-w-[40ch] w-full p-2" onChange={e => setPassword(e.target.value)} />
            <button className='border border-white py-2 w-full max-w-[40ch] border-solid duration-300 relative after:absolute after:top-0 after:right-full
        after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900' onClick={handleSubmit}>
                <h2 className='relative z-20'>SUBMIT</h2>

            </button>
            <h2 className='relative z-20 cursor-pointer' onClick={() => setLogin(!islogin)}>{!islogin ? 'Login' : 'Register'}</h2>
        </div>
    )
}
