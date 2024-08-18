'use client'
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { 
        data: users, 
        error, 
        isLoading
     } = useUsers();

    if (isLoading) return <Skeleton />;
    if (error) return null;
    const assignIssue =  (userId : string) => {
        // Send null to the backend if "Unassigned" is selected
        axios
        .patch(`/api/issue/${issue.id}`,
             { assignedToUserId: userId === "unassigned" ? null : userId })
        .catch((error) => toast.error('Failed to update assignee'));
    }
    return (
        <>
        <Select.Root 
            defaultValue={issue.assignedToUserId || "unassigned"}
            onValueChange={assignIssue}
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
        <Toaster />
        </>
    )
};

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => 
        await axios
    .get('/api/users')
    .then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
});

export default AssigneeSelect
