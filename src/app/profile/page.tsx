'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

interface ProfileData {
  collegeName?: string;
  year?: string;
  department?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
          if (response.status === 404) {
            // Profile not found, redirect to create profile
            router.push('/profile/new');
            return;
          }
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        setProfile(data.profile);
      } catch (err) {
        setError('Error loading profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
        <button
          onClick={() => router.push('/profile/new')}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create Profile
        </button>
      </div>
    );
  }

  if (!profile || (!profile.collegeName && !profile.year && !profile.department)) {
    router.push('/profile/new');
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <UserButton />
      </div>
      
      <div className="space-y-4">
        <div className="border-b pb-2">
          <h2 className="text-sm font-medium text-gray-500">College Name</h2>
          <p className="text-lg">{profile.collegeName}</p>
        </div>
        
        <div className="border-b pb-2">
          <h2 className="text-sm font-medium text-gray-500">Year</h2>
          <p className="text-lg">{profile.year}</p>
        </div>
        
        <div className="border-b pb-2">
          <h2 className="text-sm font-medium text-gray-500">Department</h2>
          <p className="text-lg">{profile.department}</p>
        </div>
      </div>
      
      <button
        onClick={() => router.push('/profile/edit')}
        className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Edit Profile
      </button>
    </div>
  );
}