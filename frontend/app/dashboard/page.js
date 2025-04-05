"use client"

import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const DashboardPage = () => {
  const {user} = useAuth();
  // Check if user is null or undefined
  if (!user) {

  }
  console.log(user);
  return (
    <div className='flex flex-col items-center justify-center h-screen text-white'>
      <h1 className='text-4xl font-bold'>Dashboard Home DashboardPage</h1>
      <p className='text-lg'>Welcome to the Dashboard Home page of our website.</p>
      <Link href="/dashboard/blogs" className='px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600'>
        Get Started
      </Link>
    {/* User token is: {user.value} */}
    </div>
  )
}

export default DashboardPage;