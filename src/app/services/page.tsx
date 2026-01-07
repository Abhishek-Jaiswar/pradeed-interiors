'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Service categories with their respective services
const serviceCategories = [
    {
        id: 'residential',
        name: 'Residential Services',
        description: 'Transform your home into a beautiful, functional living space that reflects your personal style and meets your needs.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        services: [
            { name: 'Home Interior Design', slug: 'home-interior-design' },
            { name: 'Space Planning', slug: 'space-planning' },
            { name: 'Furniture Selection', slug: 'furniture-selection' },
            { name: 'Color Consultation', slug: 'color-consultation' },
            { name: 'Lighting Design', slug: 'lighting-design' }
        ]
    },
    {
        id: 'commercial',
        name: 'Commercial Services',
        description: 'Create inspiring and productive commercial spaces that align with your brand identity and support your business goals.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        services: [
            { name: 'Office Design', slug: 'office-design' },
            { name: 'Retail Store Design', slug: 'retail-store-design' },
            { name: 'Restaurant Design', slug: 'restaurant-design' },
            { name: 'Corporate Branding', slug: 'corporate-branding' },
            { name: 'Hospitality Design', slug: 'hospitality-design' }
        ]
    },
    {
        id: 'renovation',
        name: 'Renovation Services',
        description: 'Modernize and enhance your existing spaces with our comprehensive renovation services for both residential and commercial properties.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
        services: [
            { name: 'Kitchen Remodeling', slug: 'kitchen-remodeling' },
            { name: 'Bathroom Renovation', slug: 'bathroom-renovation' },
            { name: 'Complete Home Renovation', slug: 'complete-home-renovation' },
            { name: 'Office Renovation', slug: 'office-renovation' },
            { name: 'Retail Space Renovation', slug: 'retail-space-renovation' }
        ]
    },
    {
        id: 'custom-furniture',
        name: 'Custom Furniture',
        description: 'Get bespoke furniture pieces tailored to your specific needs, style preferences, and space requirements.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
        services: [
            { name: 'Built-in Wardrobes', slug: 'built-in-wardrobes' },
            { name: 'Custom Tables', slug: 'custom-tables' },
            { name: 'Bespoke Seating', slug: 'bespoke-seating' },
            { name: 'Storage Solutions', slug: 'storage-solutions' },
            { name: 'Custom Office Furniture', slug: 'custom-office-furniture' }
        ]
    }
];

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);

    const selectedCategory = serviceCategories.find(cat => cat.id === activeCategory);

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Our Services</h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    At Pradeep Interiors, we offer a comprehensive range of interior design and renovation services
                    tailored to meet your specific needs and bring your vision to life.
                </p>
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {serviceCategories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeCategory === category.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Selected Category Details */}
            {selectedCategory && (
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                        <div className="md:w-1/3 flex justify-center">
                            {selectedCategory.icon}
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-bold mb-4">{selectedCategory.name}</h2>
                            <p className="text-gray-600 mb-6">
                                {selectedCategory.description}
                            </p>
                            <Link
                                href={`/services/${selectedCategory.id}`}
                                className="inline-block bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Explore {selectedCategory.name}
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedCategory.services.map(service => (
                            <div key={service.slug} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                                <Link
                                    href={`/services/${selectedCategory.id}/${service.slug}`}
                                    className="text-primary hover:text-accent font-medium flex items-center"
                                >
                                    Learn more
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Process Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Our Design Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        {
                            step: 1,
                            title: 'Consultation',
                            description: 'We begin with an in-depth consultation to understand your vision, needs, and budget.'
                        },
                        {
                            step: 2,
                            title: 'Design Concept',
                            description: 'Our team creates a comprehensive design concept with mood boards and space planning.'
                        },
                        {
                            step: 3,
                            title: 'Implementation',
                            description: 'We handle the entire execution process, from procurement to installation.'
                        },
                        {
                            step: 4,
                            title: 'Final Reveal',
                            description: 'Experience the transformation of your space with our final reveal and walkthrough.'
                        }
                    ].map(item => (
                        <div key={item.step} className="text-center">
                            <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                                {item.step}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary text-white rounded-2xl p-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
                <p className="max-w-2xl mx-auto mb-8">
                    Schedule a consultation with our expert designers to discuss your project needs and how we can help bring your vision to life.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/consultation" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Book a Consultation
                    </Link>
                    <Link href="/contact" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
} 