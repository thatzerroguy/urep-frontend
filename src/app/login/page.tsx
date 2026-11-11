'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TextField } from '../../components';
import { useRouter } from "next/navigation";

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
        console.log('Login attempt with:', { email, password, rememberMe });
    };

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col bg-white relative">
            {/* Top-left corner branding */}
            <Link href="/" className="absolute top-5 left-5 sm:top-7 sm:left-10 flex items-center gap-3 z-20 group">
                <Image
                    src="/fmyd_logo1.png"
                    alt="Federal Ministry of Youth Development Logo"
                    width={64}
                    height={64}
                    className="h-12 sm:h-14 w-auto object-contain"
                    priority
                />
                <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm sm:text-base tracking-tight leading-tight group-hover:text-[#277B12] transition-colors">
                        Unified Registration Portal
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium leading-none">
                        Federal Ministry of Youth Development
                    </span>
                </div>
            </Link>

            {/* Center Auth Form */}
            <div className="flex flex-1 items-center justify-center px-4">
                <div className="w-full max-w-sm">
                    {/* Centered Brand Emblem & Heading */}
                    <div className="flex flex-col items-center text-center mb-6">
                        <Image
                            src="/fmyd_logo1.png"
                            alt="Federal Ministry of Youth Development"
                            width={72}
                            height={72}
                            className="h-16 sm:h-20 w-auto object-contain mb-3"
                            priority
                        />
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome to Unified Registration Portal</h1>
                        <p className="text-sm text-gray-500 mt-1">Sign in to your youth portal account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-1">
                        <TextField
                            type="email"
                            label="Email Address"
                            placeholder="you@example.com"
                            value={email}
                            onChange={setEmail}
                            required
                            id="email"
                        />
                        <TextField
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={setPassword}
                            required
                            id="password"
                        />

                        <div className="flex justify-between items-center py-2">
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-[#277B12] focus:ring-[#277B12]"
                                />
                                Remember me
                            </label>
                            <Link href="/" className="text-sm text-[#277B12] hover:underline font-medium">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#277B12] text-white py-2.5 px-4 mt-4 rounded-lg font-semibold hover:bg-[#1b5c0d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#277B12] focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-[#277B12] hover:underline font-semibold">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
