"use client"
import apiClient from '@/lib/apiClient';
import React, { useEffect } from 'react'
import EditAccountName from './EditAccountName';
import EditAccountNumber from './EditAccountNumber';
import EditBankName from './EditBankName';
import EditPhone from './EditPhoneNumber';

function UserDetails() {
    const [user, setUser] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const getUserDetails = async () => {
        setLoading(true);
        const res: any = await apiClient.get('user');
        if (res.ok) {
            setUser(res.data);
            console.log(res.data);
            setLoading(false);
        } else {
            console.error(res.data.error || "Failed to fetch user details");
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    if(loading) {
        return <div className='flex items-center justify-center h-screen'>Loading...</div>
    }
  return (
    <main className='w-full h-full bg-gray-100 py-10 '>

    <div className='w-5/6 md:w-3/5 mx-auto mb-10'>
        <h1 className='text-2xl font-medium text-center mb-5'>Payment Details</h1>

        <EditAccountName  />

        <EditAccountNumber />

        <EditBankName />

        <EditPhone />   
    </div>
    </main>
  )
}

export default UserDetails