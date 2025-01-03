import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetail from './IssueDetail';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';

interface props{
    params:{id:string}
}

const IssueDetailPage = async ({params}:props) => {
    const session= await getServerSession(authOptions);

    const issue = await prisma.issue.findUnique({
        where:{
            id:parseInt(params.id)
        }
    });
    if(!issue){
        return notFound();
    }
    
    return (

    <Grid columns={{initial:'1' , sm:'5'}} gap='5'>
        <Box className='md:col-span-4'>
            <IssueDetail issue={issue}/>
        </Box>
        {session &&
        (
            < Box>    
            <Flex direction= 'column' gap='5'>
            <AssigneeSelect  issue={issue} />   
            <EditIssueButton issueID={issue.id}/>
            <DeleteIssueButton  issueId={issue.id}/>
            </Flex>
        </Box>
        )}
        
        
    </Grid>
  )
}

export default IssueDetailPage