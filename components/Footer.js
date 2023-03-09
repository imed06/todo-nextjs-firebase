import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='p-2 px-6 text-sm sm:text-xl flex'>
      <div className='flex-1 text-slate-300'>
        <h3>Copyright @ 2023 . todo-nextjs</h3>
      </div>
      <div className='flex items-center'>
        <h3>Contact me via</h3>
        <a target="_blank" href="https://www.linkedin.com/in/imed-triki-4473bb221/">
          <i className="fa-brands fa-linkedin ml-2 cursor-pointer"></i>
        </a>
      </div>
    </div>
  )
}
