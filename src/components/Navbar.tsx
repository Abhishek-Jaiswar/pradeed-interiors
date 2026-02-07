'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navigation items
  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "#",
      dropdown: true,
      items: [
        { name: "Residential Design", href: "/services/residential" },
        { name: "Commercial Design", href: "/services/commercial" },
        { name: "Renovation", href: "/services/renovation" },
        { name: "Space Planning", href: "/services/space-planning" },
      ],
    },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Shop", href: "/shop" },
    { name: "Design Ideas", href: "/design-ideas" },
    { name: "Calculator", href: "/calculator" },
    { name: "Contact", href: "/contact" },
    { name: "Admin", href: "/admin/login", adminLink: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2 text-neutral-600"
          : " backdrop-blur-2xl bg-white py-2"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl">
            {isScrolled ? (
              <span className="text-primary">Pradeep Interiors</span>
            ) : (
              <span className="text-primary">Pradeep Interiors</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                        isScrolled
                          ? "text-gray-700 hover:text-primary"
                          : "text-neutral-600 hover:bg-white/20"
                      }`}
                      onClick={() =>
                        setServicesDropdownOpen(!servicesDropdownOpen)
                      }
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      {item.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ml-1 transition-transform ${
                          servicesDropdownOpen ? "rotate-180" : ""
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
                      className={`absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all ${
                        servicesDropdownOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
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
                      item.adminLink
                        ? isScrolled
                          ? "text-gray-500 hover:text-primary"
                          : "text-gray-300 hover:text-white"
                        : pathname === item.href
                          ? isScrolled
                            ? "text-primary"
                            : "text-neutral-700 bg-white/20"
                          : isScrolled
                            ? "text-gray-700 hover:text-primary"
                            : "text-primary hover:bg-white/20"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/consultation"
              className={`ml-4 px-4 py-2 rounded-md text-sm font-medium ${
                isScrolled
                  ? "bg-neutral-800 text-primary-foreground hover:bg-accent"
                  : " bg-green-900 text-primary-foreground hover:bg-secondary-100"
              } transition-colors`}
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
              className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"}`}
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
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col py-2 space-y-1 bg-white rounded-lg shadow-lg">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setServicesDropdownOpen(!servicesDropdownOpen)
                      }
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                    >
                      {item.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform ${
                          servicesDropdownOpen ? "rotate-180" : ""
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
                      className={`transition-all duration-300 overflow-hidden ${
                        servicesDropdownOpen ? "max-h-screen" : "max-h-0"
                      }`}
                    >
                      {item.items?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block pl-8 pr-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 ${
                      item.adminLink
                        ? "text-gray-800 hover:text-primary"
                        : pathname === item.href
                          ? "bg-gray-100 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/consultation"
              className="block mx-4 mt-2 px-4 py-2 bg-primary text-white text-center rounded-md hover:bg-accent"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};;

export default Navbar; 