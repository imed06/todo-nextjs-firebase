import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'

export default function Model(props) {
    const { setOpen } = props
    const [_document, set_document] = useState(null)
    const { logout } = useAuth()

    useEffect(() => {
        set_document(document)
    }, [])

    if (!_document) { return null }
    return ReactDom.createPortal(
        <div className='fixed inset-0 bg-white text-slate-900 flex flex-col text-2xl'>
            <div className='flex items-center justify-between border-b border-solid border-slate-900 p-4'>
                <h1 className='font-bold text-6xl'>MENU</h1>
                <i onClick={() => setOpen(false)} className="fa-solid fa-xmark cursor-pointer"></i>
            </div>
            <div className='flex flex-col gap-3 p-4 hover:bg-slate-900 hover:text-white' onClick={() => {
                logout()
                setOpen(false)
            }}>
                <h3 className='cursor-pointer'>logout</h3>
            </div>
        </div>,
        _document.getElementById('portal')
    )
}
