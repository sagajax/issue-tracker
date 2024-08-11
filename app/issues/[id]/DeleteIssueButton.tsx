'use client'; 
import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({issueId} : {issueId : number}) => {
  const router=useRouter();
  const [error,setError]= useState(false);
  const [isDeleting,setDeleting] = useState(false);
  const deleteIssue =async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issue/${issueId}`);
      router.push('/issues/list');
      router.refresh();  
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
    
  } 
  return (
    <> 
    <AlertDialog.Root>
      <AlertDialog.Trigger >
        <Button color='red' disabled={isDeleting} >
          Delete Issue
          {isDeleting && <Spinner/>} 
          </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Are you sure?</AlertDialog.Title>
        <AlertDialog.Description>
          Deleting this issue will remove it from the database and cannot be undone.
        </AlertDialog.Description>
        <Flex gap="3" mt="4">
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button 
              color='red'
              onClick={deleteIssue}  
            >
              Delete
            </Button>

          </AlertDialog.Action>
        </Flex>
        
      </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>
          There was an error deleting the issue. Please try again.
        </AlertDialog.Description>
          <Button variant='soft' color='gray' mt='2' onClick={() => {setError(false)}}>OK</Button>  
      </AlertDialog.Content>
    </AlertDialog.Root>
   </> 
  );
  
};

export default DeleteIssueButton