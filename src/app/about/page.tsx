import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
    // Team members data
    const teamMembers = [
        {
            name: 'Pradeep Kumar',
            role: 'Founder & Principal Designer',
            image: '/placeholder.jpg',
            bio: 'With over 15 years of experience in interior design, Pradeep founded the company with a vision to transform spaces into functional works of art that reflect each client\'s unique personality and lifestyle.',
        },
        {
            name: 'Ananya Sharma',
            role: 'Senior Designer',
            image: '/placeholder.jpg',
            bio: 'Ananya specializes in residential interiors with a focus on sustainable design. Her approach combines modern aesthetics with eco-friendly materials to create spaces that are both beautiful and environmentally conscious.',
        },
        {
            name: 'Rajiv Patel',
            role: 'Commercial Design Lead',
            image: '/placeholder.jpg',
            bio: 'Rajiv brings extensive experience in corporate and retail design. He excels at creating functional workspaces that enhance productivity while maintaining brand identity and aesthetic appeal.',
        },
        {
            name: 'Meera Desai',
            role: 'Design Consultant',
            image: '/placeholder.jpg',
            bio: 'With a keen eye for color and texture, Meera helps clients select the perfect materials, furnishings, and accessories to bring their design vision to life.',
        },
    ];

    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <div className="bg-primary text-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
                        Transforming spaces into beautiful, functional environments that reflect our clients' unique personalities and lifestyles.
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    Pradeep Interiors was founded in 2010 by Pradeep Kumar, a passionate interior designer with a vision to create spaces that are not just visually stunning but also functional and personalized to each client's unique needs.
                                </p>
                                <p className="text-gray-600">
                                    What began as a small design studio has now grown into a full-service interior design firm with a team of talented designers, project managers, and craftsmen who share a common goal: to transform houses into homes and spaces into experiences.
                                </p>
                                <p className="text-gray-600">
                                    Over the years, we have had the privilege of working on a diverse range of projects, from cozy residential spaces to impressive commercial establishments, each with its own unique challenges and creative solutions.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                            {/* Placeholder for company image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                Company Image Placeholder
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission and Vision */}
            <section className="py-16 bg-gray-50 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            We are guided by a clear mission and vision that shapes every project we undertake.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                            <p className="text-gray-600">
                                To create thoughtfully designed spaces that inspire, function efficiently, and reflect the unique personality and needs of each client. We are committed to delivering exceptional design solutions that enhance the way people live, work, and experience their surroundings.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                            <p className="text-gray-600">
                                To be recognized as a leading interior design firm that consistently pushes the boundaries of creativity, embraces innovation, and sets new standards for excellence in the industry. We aspire to create spaces that not only meet but exceed client expectations, leaving a lasting positive impact on how they interact with their environment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            These principles guide our approach to every project and interaction.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Integrity</h3>
                            <p className="text-gray-600">
                                We conduct our business with honesty, transparency, and ethical practices, building trust with our clients and partners.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Creativity</h3>
                            <p className="text-gray-600">
                                We embrace innovative thinking and creative problem-solving to deliver unique design solutions that stand out.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Collaboration</h3>
                            <p className="text-gray-600">
                                We value partnerships with our clients, understanding that the best results come from working together and listening to their needs.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Excellence</h3>
                            <p className="text-gray-600">
                                We strive for excellence in every aspect of our work, from the initial concept to the final execution and beyond.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="py-16 bg-gray-50 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Our talented team of designers and professionals brings diverse skills and experience to every project.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                                <div className="h-64 bg-gray-200 relative">
                                    {/* Placeholder for team member image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        Team Member Photo
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-primary font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-600 text-sm">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    Over the years, our dedication to excellence has been recognized through various awards and accolades in the interior design industry. While we take pride in these achievements, our greatest reward comes from the satisfaction of our clients and the spaces we've helped transform.
                                </p>
                                <div className="space-y-4 mt-6">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold">Best Residential Interior Design 2022</h4>
                                            <p className="text-gray-600 text-sm">India Design Awards</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold">Excellence in Commercial Design 2021</h4>
                                            <p className="text-gray-600 text-sm">Mumbai Architects Association</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold">Sustainable Design Award 2020</h4>
                                            <p className="text-gray-600 text-sm">Green Building Council</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold">Top 10 Interior Design Firms 2019</h4>
                                            <p className="text-gray-600 text-sm">Architectural Digest India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                                {/* Placeholder for award image */}
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    Award Image
                                </div>
                            </div>
                            <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                                {/* Placeholder for award image */}
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    Award Image
                                </div>
                            </div>
                            <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                                {/* Placeholder for award image */}
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    Award Image
                                </div>
                            </div>
                            <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                                {/* Placeholder for award image */}
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    Award Image
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-primary text-white px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
                    <p className="max-w-2xl mx-auto mb-8 opacity-90">
                        Let's work together to create a space that reflects your unique style and meets your specific needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/consultation" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                            Book a Consultation
                        </Link>
                        <Link href="/portfolio" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
                            View Our Portfolio
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
} 