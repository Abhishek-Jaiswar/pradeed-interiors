'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll event to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Navigation items
    const navItems = [
        { name: 'Home', href: '/' },
        {
            name: 'Services',
            href: '#',
            dropdown: true,
            items: [
                { name: 'Residential Design', href: '/services/residential' },
                { name: 'Commercial Design', href: '/services/commercial' },
                { name: 'Renovation', href: '/services/renovation' },
                { name: 'Space Planning', href: '/services/space-planning' },
            ],
        },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Shop', href: '/shop' },
        { name: 'Design Ideas', href: '/design-ideas' },
        { name: 'Calculator', href: '/calculator' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                ? 'bg-white shadow-md py-2'
                : 'bg-white/95 backdrop-blur-sm py-4'
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="font-bold text-2xl">
                        <span className="text-primary">Pradeep Interiors</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-1 items-center">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.dropdown ? (
                                    <>
                                        <button
                                            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center text-gray-700 hover:text-primary`}
                                            onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                                            onMouseEnter={() => setServicesDropdownOpen(true)}
                                            onMouseLeave={() => setServicesDropdownOpen(false)}
                                        >
                                            {item.name}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-4 w-4 ml-1 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                        {/* Dropdown menu */}
                                        <div
                                            className={`absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all ${servicesDropdownOpen
                                                ? 'opacity-100 visible'
                                                : 'opacity-0 invisible'
                                                }`}
                                            onMouseEnter={() => setServicesDropdownOpen(true)}
                                            onMouseLeave={() => setServicesDropdownOpen(false)}
                                        >
                                            <div className="py-1">
                                                {item.items?.map((dropdownItem) => (
                                                    <Link
                                                        key={dropdownItem.name}
                                                        href={dropdownItem.href}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        {dropdownItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                                            pathname === item.href
                                            ? 'text-primary font-semibold'
                                            : 'text-gray-700 hover:text-primary'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link
                            href="/consultation"
                            className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
                        >
                            Book Consultation
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
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
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="flex flex-col py-2 space-y-1 bg-white rounded-lg shadow-lg">
                        {navItems.map((item) => (
                            <div key={item.name}>
                                {item.dropdown ? (
                                    <>
                                        <button
                                            onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                                            className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                        >
                                            {item.name}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-4 w-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                        <div
                                            className={`transition-all duration-300 overflow-hidden ${servicesDropdownOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                                                }`}
                                        >
                                            <div className="pl-4 pr-2 py-1 bg-gray-50">
                                                {item.items?.map((dropdownItem) => (
                                                    <Link
                                                        key={dropdownItem.name}
                                                        href={dropdownItem.href}
                                                        className={`block px-4 py-2 text-sm ${
                                                            pathname === dropdownItem.href
                                                                ? 'text-primary font-medium'
                                                                : 'text-gray-600 hover:text-primary'
                                                        }`}
                                                    >
                                                        {dropdownItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`block px-4 py-2 text-sm font-medium ${
                                            pathname === item.href
                                                ? 'text-primary bg-gray-50'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="px-4 py-2">
                            <Link
                                href="/consultation"
                                className="block w-full px-4 py-2 text-center rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90"
                            >
                                Book Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;