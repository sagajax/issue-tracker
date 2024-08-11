import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import {IssueStatusBadge,Link} from '@/app/components/index'
import IssueAction from './IssueAction';
const IssuePage = async() => {
  const Issues = await prisma.issue.findMany();
  return (
    
    <>
    <IssueAction />
    
    
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>CreatedAt</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>
                {issue.title}
              </Link> 
                <div className='block md:hidden'>
                    <IssueStatusBadge status={issue.status} />
                </div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>
            <IssueStatusBadge status={issue.status} /> 
              </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </>
  )
}

export default IssuePage 