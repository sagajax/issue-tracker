'use client';
import { TextField,Button,TextArea } from '@radix-ui/themes';
import React from 'react'

const newIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        
        <TextField.Root placeholder='Title' />
        <TextArea placeholder="Description" />
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default newIssuePage