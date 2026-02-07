'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/query/useAuth';

export default function LogoutButton() {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                router.push('/admin/login');
            },
            onError: () => {
                // Still redirect on error to be safe
                router.push('/admin/login');
            }
        });
    };

    return (
        <button
            onClick={handleLogout}
            disabled={logout.isPending}
            className={`text-gray-600 hover:text-red-600 flex items-center transition-colors ${logout.isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {logout.isPending ? (
                <svg className="animate-spin h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
            )}
            Logout
        </button>
    );
}