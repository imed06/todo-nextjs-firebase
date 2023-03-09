import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Layout(props) {
    const { children } = props
    return (
        <div className='flex flex-col relative bg-slate-900 min-h-screen text-white'>
            <Header />
            <main className='flex-1 flex p-4'>
                {children}
            </main>
            <Footer />
        </div>
    )
}
