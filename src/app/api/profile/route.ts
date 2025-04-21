import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const { collegeName, year, department } = await req.json();
    
    // Get the Clerk client instance
    const clerk = await clerkClient();
    
    // Save metadata to Clerk user
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        collegeName,
        year,
        department
      }
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { message: 'Error saving profile data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the Clerk client instance
    const clerk = await clerkClient();
    
    const user = await clerk.users.getUser(userId);
    const profileData = user.publicMetadata;
    
    return NextResponse.json({ profile: profileData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { message: 'Error fetching profile data' },
      { status: 500 }
    );
  }
}