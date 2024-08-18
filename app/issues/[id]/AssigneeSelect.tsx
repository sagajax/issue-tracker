'use client'
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => 
            await axios.get('/api/users').then((res) => res.data),
        staleTime: 60 * 1000,
        retry: 3,
    });

    if (isLoading) return <Skeleton />;
    if (error) return null;

    return (
        <Select.Root 
            defaultValue={issue.assignedToUserId || "unassigned"}
            onValueChange={(userId) => {
                // Send null to the backend if "Unassigned" is selected
                axios.patch(`/api/issue/${issue.id}`, { assignedToUserId: userId === "unassigned" ? null : userId });
            }}
        >
            <Select.Trigger placeholder='Assign...' />

            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="unassigned">Unassigned</Select.Item>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect
