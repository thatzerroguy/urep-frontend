'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {TextField} from '../../components';
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const navigateToRegisterPage = () => {
        router.push('/admin');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        navigateToRegisterPage();
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt with:', { email, password, rememberMe });
    };

    return (
        <div className={'w-screen bg-[#F3EFE5]'}>
            <div className={'mx-auto flex items-center px-1 h-20 bg-[#277B12] mb-4'}>
                <Image className={'mr-2'} src={'/images/fmyd_logo.png'} alt={'logo'} width={80} height={80} />
                <h1 className={'text-white text-2xl font-bold'}>Yopi Tracker</h1>
                <div className={'grow'}>
                    <div className={' flex items-center justify-center gap-2 md:gap-8'}>
                        <Link className={'text-white text-lg'} href= '/'>Home</Link>
                        <Link className={'text-white text-lg'} href= '/'>About</Link>
                        <Link className={'text-white text-lg'} href= '/'>Program</Link>
                        <Link className={'text-white text-lg'} href= '/'>Youth Policy</Link>
                        <Link className={'text-white text-lg'} href= '/'>Privacy Policy</Link>
                    </div>
                </div>
                <div>
                    <Link href="/login" className={' bg-white text-black hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 text-center md:mr-2 mb-2 md:mb-0'}>Login</Link>
                    <Link href={'/register'} className={' bg-[#277B12] text-white hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 text-center mb-2 md:mb-0 border-white border-2'}>Register</Link>
                </div>
            </div>
            <div className={'flex flex-col w-full min-h-screen bg-[#F3EFE5] p-8'}>

                {/* Main content */}
                <div className={'flex flex-col items-center justify-center flex-grow'}>
                    <div className={'max-w-3xl w-full px-8 py-16 bg-white rounded-xl shadow-2xl'}>
                        <h1 className={'text-3xl font-bold mb-2 text-black justify-start'}>Login to FMYD</h1>
                        <p className={'text-sm text-gray-500 justify-start mb-6'}> Hey, welcome back!</p>

                        <form onSubmit={handleSubmit}>
                            {/* Email field */}
                            <TextField
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={setEmail}
                                required
                                id="email"
                            />

                            {/* Password field */}
                            <TextField
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={setPassword}
                                required
                                id="password"
                            />

                            {/* Remember me checkbox and Forgot password link */}
                            <div className={'flex justify-between items-center mb-6'}>
                                <div className={'flex items-center'}>
                                    <input
                                        type="checkbox"
                                        id="remember-me"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className={'mr-2 h-4 w-4 text-[#277B12] focus:ring-[#277B12] border-gray-300 rounded'}
                                    />
                                    <label htmlFor="remember-me" className={'text-sm text-gray-700'}>
                                        Remember me
                                    </label>
                                </div>
                                <Link href="/" className={'text-sm text-[#277B12] hover:underline'}>
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Login button */}
                            <button
                                type="submit"
                                className={'w-full bg-[#277B12] text-white py-4 px-4 mb-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors'}
                            >
                                Login
                            </button>
                        </form>
                        <span className={'text-center justify-center text-sm text-gray-500'}>Dont have an account? <Link href="/register" className={'text-[#277B12] hover:underline'}>Register</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
