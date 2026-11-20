'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { LoaderCircle, ShieldCheck } from 'lucide-react';
import { TextField } from '@/components';
import { postToApi, storeAdminAuth } from '@/lib/urep-api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError('');
    setIsSubmitting(true);
    try {
      const admin = await postToApi<{
        id: string;
        name: string;
        email: string;
        access_token: string;
        token_type: string;
        expires_in: number;
      }>('/api/auth/admin/login', { email, password });
      storeAdminAuth(admin);
      router.push('/admin');
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
      <Link href="/" className="absolute left-5 top-5 z-20 flex items-center gap-3 sm:left-10 sm:top-7">
        <Image
          src="/fmyd_logo1.png"
          alt="Federal Ministry of Youth Development Logo"
          width={64}
          height={64}
          className="h-12 w-auto object-contain sm:h-14"
          priority
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-tight tracking-tight text-gray-900 sm:text-base">
            Unified Registration Portal
          </span>
          <span className="text-[11px] font-medium leading-none text-gray-500">
            Federal Ministry of Youth Development
          </span>
        </div>
      </Link>

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-[#277B12] sm:h-20 sm:w-20">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome to Unified Registration Portal
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign in with your provisioned administrator account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-1">
            <TextField
              id="admin-email"
              type="email"
              label="Email Address"
              placeholder="admin@example.gov.ng"
              value={email}
              onChange={setEmail}
              required
            />
            <TextField
              id="admin-password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              required
            />

            {apiError && (
              <p role="alert" className="mt-3 text-center text-sm text-red-600">{apiError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#277B12] px-4 py-2.5 font-semibold text-white transition hover:bg-[#1b5c0d] focus:outline-none focus:ring-2 focus:ring-[#277B12] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && <LoaderCircle size={16} className="animate-spin" />}
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
