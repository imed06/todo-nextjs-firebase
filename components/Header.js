import React, { useState } from 'react'
import Model from './Model'

export default function Header() {
    const [open,setOpen] = useState(false)
  return (
    <>
    {open && <Model setOpen={setOpen}/>}
    <div className='sticky top-0 w-full left-0 flex items-center bg-inherit border-solid border-b border-white justify-between p-4'>
        <h1 className='text-3xl sm:text-6xl select-none'>TODO LIST</h1>
        <i onClick={()=>setOpen(true)} className="fa-solid fa-user text-xl sm:text-3xl duration-300 hover:opacity-40 cursor-pointer"></i>
    </div>
    </>
  )
}
