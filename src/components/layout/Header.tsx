'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        Pradeep Interiors
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            href="/portfolio"
                            className={`${isActive('/portfolio') ? 'text-accent font-semibold' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/shop"
                            className={`${isActive('/shop') ? 'text-accent font-semibold' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/calculator"
                            className={`${isActive('/calculator') ? 'text-accent font-semibold' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Calculator
                        </Link>
                        <Link
                            href="/consultation"
                            className={`${isActive('/consultation') ? 'text-accent font-semibold' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Consultation
                        </Link>
                        <Link
                            href="/design-ideas"
                            className={`${isActive('/design-ideas') ? 'text-accent font-semibold' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Design Ideas
                        </Link>
                        <Link
                            href="/test-api"
                            className={`${isActive('/test-api') ? 'text-accent font-semibold' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Test API
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="text-gray-600 hover:text-primary"
                        >
                            Login
                        </Link>
                        <Link
                            href="/cart"
                            className="relative text-gray-600 hover:text-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                0
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Mobile navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t">
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/portfolio"
                                    className={`${isActive('/portfolio') ? 'text-accent font-semibold' : 'text-gray-600'} block`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shop"
                                    className={`${isActive('/shop') ? 'text-accent font-semibold' : 'text-gray-600'} block`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/calculator"
                                    className={`${isActive('/calculator') ? 'text-accent font-semibold' : 'text-gray-600'} block`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Calculator
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/consultation"
                                    className={`${isActive('/consultation') ? 'text-accent font-semibold' : 'text-gray-600'} block`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Consultation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/design-ideas"
                                    className={`${isActive('/design-ideas') ? 'text-accent font-semibold' : 'text-gray-600'} block`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Design Ideas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/test-api"
                                    className={`${isActive('/test-api') ? 'text-accent font-semibold' : 'text-gray-600'} block`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Test API
                                </Link>
                            </li>
                            <li className="border-t pt-4 mt-4">
                                <Link
                                    href="/login"
                                    className="text-gray-600 block"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cart"
                                    className="text-gray-600 block"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Cart (0)
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
} 