'use client';

import { Box, Container, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { useSession } from 'next-auth/react';
const NavBar = () => {
    const currentPath = usePathname();
    const {status,data : session} =useSession();
    console.log(currentPath)
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }, // Decided to keep '/issues/list'
    ];
  
    return (
        <nav className='px-5 border-b mb-5 py-3 '>
            <Container>
            <Flex justify={'between'}>
                <Flex align={'center'} gap={'3'}>
                <Link href='/'><AiFillBug/></Link>
                <ul className='flex space-x-6'>
                {links.map(link =>
                <li key={link.href}>
                    <Link
                        
                        className={classNames({
                            'text-blue-600': currentPath === link.href,
                            'text-zinc-500': currentPath !== link.href,
                            'hover:text-zinc-800 transition-colors': true,
                        })}
                        href={link.href}>{link.label}</Link> </li>)}
            </ul>
                </Flex>
                <Box>
                {status==="authenticated" && (
                    <Link href="/api/auth/signout">Log out</Link>
                )}
                {status ==="unauthenticated" && (
                    <Link href="/api/auth/signin"> Login</Link>
                )}

            </Box>
            </Flex>
            </Container> 
            
            
        </nav>
    );
}

export default NavBar;
