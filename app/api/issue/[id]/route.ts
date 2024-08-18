import { authOptions } from "@/app/auth/authOptions";
import {  patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    console.log('PATCH request received');
  
    try {
      const session = await getServerSession(authOptions);
    //   console.log('Session:', session);
  
      if (!session) {
        console.log('Unauthorized access attempt');
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const body = await req.json();
      console.log('Request body:', body);
  
      const validation = patchIssueSchema.safeParse(body);
      if (!validation.success) {
        console.log('Validation failed:', validation.error.format());
        return NextResponse.json(validation.error.format(), { status: 400 });
      }
  
      const { assignedToUserId, title, description } = body;
  
      if (assignedToUserId) {
        const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });
        // console.log('User:', user);
  
        if (!user) {
          console.log('Invalid User ID');
          return NextResponse.json({ error: "Invalid User" }, { status: 400 });
        }
      }
  
      const issueId = parseInt(params.id, 10);
      if (isNaN(issueId)) {
        console.log('Invalid Issue ID:', params.id);
        return NextResponse.json({ error: "Invalid Issue ID" }, { status: 400 });
      }
  
      const issue = await prisma.issue.findUnique({ where: { id: issueId } });
    //   console.log('Issue:', issue);
      
      if (!issue) {
        console.log('Issue not found');
        return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
      }
      //clear no errors till this point
      const updatedIssue = await prisma.issue.update({
        where: { id: issueId },
        data: {
          title,
          description,
          assignedToUserId
        },
      });
  
      console.log('Updated Issue:', updatedIssue);
      return NextResponse.json(updatedIssue);
  
    } catch (error) {
      console.error('Error in PATCH request:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  
  



//Delete an issue
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }
  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });
  return NextResponse.json({});
}
