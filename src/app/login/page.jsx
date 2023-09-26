"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image'

import { signIn } from "next-auth/react";
import ava from  "../assets/tracking.jpg";
import Swal from "sweetalert2";



export default function Login() {
    const router = useRouter();
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            if (res.status) {
                router.replace('home'); // Replace with the actual URL of your home page
            } else {
                // Authentication failed, handle error
                Swal.fire({
                    icon: "error",
                    title: "Invalid Credentials",
                    text: data.result,
                  });
                setError('Invalid Credentials');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    return (
        <>
            <div className="flex flex-col items-center md:flex-row md:h-screen">
                <div className="flex justify-center w-full md:w-1/2">
                    <div className="md:w-2/2 ">
                    <Image
                        className='max-w-none '
                        src={ava}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <h1 className="text-2xl font-bold">Welcome back!</h1>
                            <p className="mt-2 text-gray-600">
                                Please sign in to your account.
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" >

                            <div>
                                <label htmlFor="email" className="block font-bold text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email" value={email}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block font-bold text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="submit" onClick={handleSubmit}
                                    className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                                >
                                    Sign In
                                </button>
                            </div>               
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


