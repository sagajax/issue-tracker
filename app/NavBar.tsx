'use client';

import { Avatar, Box, Container, DropdownMenu, Flex,Text } from '@radix-ui/themes';
import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { useSession } from 'next-auth/react';
import Skeleton from './components/Skeleton';
const NavBar = () => {
    
  
    return (
        <nav className='px-5 border-b mb-5 py-3 '>
            <Container>
            <Flex justify={'between'}>
                <Flex align={'center'} gap={'3'}>
                <Link href='/'><AiFillBug/></Link>
                <NavLinks/>
                </Flex>
                <AuthStatus/>
            </Flex>
            </Container> 
            
            
        </nav>
    );
};

const NavLinks= () =>{
    const currentPath = usePathname();
    
    console.log(currentPath)
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }, // Decided to keep '/issues/list'
    ];
    return(
    <ul className='flex space-x-6'>
    {links.map(link =>
    <li key={link.href}>
        <Link
            
            className={classNames({
                "nav-link":true,
                '!text-zinc-900': currentPath === link.href,
                
            })}
            href={link.href}>{link.label}</Link> </li>)}
</ul>
    )
};

const AuthStatus = () => {
    const {status,data : session} =useSession();
    if (status === 'loading') return <Skeleton width="3"/>;
    if(status === 'unauthenticated')
        return <Link  className='nav-link' href="/api/auth/signin"> Login</Link>
    return (
    <Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                            <Avatar 
                            src={session!.user!.image!} 
                            fallback="?"
                            size="3"
                            radius='full'
                            className='cursor-pointer'
                            />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                    <DropdownMenu.Label>
                            <Text size={'2'}>
                            {session!.user!.email}
                            </Text>
                            
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Log out</Link>
                    </DropdownMenu.Item>
            </DropdownMenu.Content>                
        </DropdownMenu.Root>
    </Box>
 )

}

export default NavBar;
