'use client';
import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useForm, Controller, } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';


type IssueFormData = z.infer<typeof IssueSchema>;



const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
                if(issue){
                    await axios.patch(`/api/issue/${issue.id}`, data);
                }
                else
                    await axios.post('/api/issue', data)
                 router.push('/issues/list')
                 router.refresh();

        } catch (error) {
            setIsSubmitting(false);
            setError("An unexpected error occurred")
        }

    })

    return (

        <div className='max-w-xl ' >
            {error && (
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            )}
            <form className='space-y-3'
                onSubmit={onSubmit}>

                <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')} />

                <ErrorMessage>
                    {errors.title?.message}
                </ ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE
                        defaultValue={issue?.description}
                        placeholder="Description" {...field} />} />


                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                    {isSubmitting && <Spinner />} 
                     </Button>
            </form >
        </div>

    )
}

export default IssueForm