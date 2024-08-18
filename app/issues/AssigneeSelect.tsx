'use client'
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {
    const [user,setUsers]=useState<User[]>([]);
    useEffect(()=>{
        const fetchUsers = async ()=>{
            const {data} = await axios.get<User[]>('/api/users');
            setUsers(data);
        }
        fetchUsers();
    },[]);
  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign...'/>
            
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                {user.map((u)=>(
                    <Select.Item key={u.id} value={u.id}>{u.name}</Select.Item>
                ))}
                <Select.Item value='1'>Anyone</Select.Item>
                </Select.Group>
        </Select.Content>

    </Select.Root>
  )
}

export default AssigneeSelect