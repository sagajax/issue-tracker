'use client';

import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    const currentPath =usePathname()
    console.log(currentPath)
    const links = [
        {label:'Dashboard' , href:'/'},
        {label:'Issues' , href:'/issues/list'},
    ]
  return (
    <nav className='flex space-x-6 px-5 border-b mb-5 h-14 items-center' >
        <Link  href='/'><AiFillBug/></Link>
        <ul className=' flex space-x-6'>
            {links.map(link =>
             <Link
                key={link.href}
                className={classNames(
                    {
                        'text-blue-600': currentPath === link.href,
                        'text-zinc-500': currentPath !== link.href,
                        'hover:text-zinc-800 transition-colors': true,
                    }
            )}
                href={link.href}>{link.label}</Link> )}
        </ul>
    </nav>
  )
}

export default NavBar 