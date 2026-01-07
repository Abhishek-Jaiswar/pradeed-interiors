import Link from 'next/link';

// Services data
const services = [
    {
        name: 'Residential Design',
        description: 'Comprehensive interior design services for your home, crafted to reflect your personality, lifestyle, and preferences.',
        features: [
            'Full home interior design',
            'Room-specific transformations',
            'Color and material consultations',
            'Custom furniture solutions',
            'Lighting and accessory curation'
        ],
        image: '/images/services/residential-design.jpg',
        href: '/services/residential'
    },
    {
        name: 'Commercial Design',
        description: 'Strategic interior design solutions for businesses that enhance brand identity, functionality, and customer experience.',
        features: [
            'Office space planning and design',
            'Retail store layouts and concepts',
            'Restaurant and hospitality design',
            'Corporate branding integration',
            'Employee-focused workspace solutions'
        ],
        image: '/images/services/commercial-design.jpg',
        href: '/services/commercial'
    },
    {
        name: '3D Visualization',
        description: 'Realistic 3D renderings that allow you to visualize your space before implementation, ensuring your complete satisfaction.',
        features: [
            'Photorealistic renderings',
            'Interactive virtual tours',
            'Multiple design option comparisons',
            'Material and finish visualization',
            'Lighting simulation'
        ],
        image: '/images/services/3d-visualization.jpg',
        href: '/services/interior-design#3d-visualization'
    },
    {
        name: 'Sustainable Design',
        description: 'Eco-friendly interior design solutions that minimize environmental impact while creating beautiful, healthy spaces.',
        features: [
            'Sustainable material selection',
            'Energy-efficient lighting design',
            'Indoor air quality improvement',
            'Water conservation solutions',
            'Waste reduction strategies'
        ],
        image: '/images/services/sustainable-design.jpg',
        href: '/services/interior-design#sustainable-design'
    }
];

// Process steps
const designProcess = [
    {
        title: 'Discovery',
        description: 'We begin by understanding your needs, preferences, budget, and timeline. This initial consultation helps us establish the foundation for your project.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: 'Concept Development',
        description: 'We create design concepts that align with your vision, including space planning, color schemes, material selections, and furniture layouts.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        )
    },
    {
        title: 'Design Development',
        description: 'We refine the selected concept into detailed designs with specific specifications for materials, finishes, furniture, lighting, and accessories.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        )
    },
    {
        title: '3D Visualization',
        description: 'We create detailed 3D renderings that bring your design to life, allowing you to visualize the finished space before implementation begins.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
        )
    },
    {
        title: 'Implementation',
        description: 'We oversee the execution of the design, coordinating with contractors, vendors, and craftspeople to ensure every detail is implemented correctly.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )
    },
    {
        title: 'Styling & Finishing',
        description: 'We add the finishing touches including accessories, artwork, and decorative elements that complete the design and bring personality to the space.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        )
    }
];

// Testimonials
const testimonials = [
    {
        quote: "Working with Pradeep Interiors transformed our home beyond our expectations. Their attention to detail and understanding of our lifestyle resulted in a design that perfectly suits our family.",
        author: "Rajesh & Shalini Mehra",
        title: "Residential Clients"
    },
    {
        quote: "Our restaurant's ambiance has received countless compliments since Pradeep Interiors redesigned the space. The increased foot traffic and longer customer stays have significantly boosted our revenue.",
        author: "Vivek Sharma",
        title: "Restaurant Owner"
    },
    {
        quote: "The 3D visualizations helped us make confident decisions about our office redesign. The final result matched the renderings perfectly, making the entire process stress-free.",
        author: "Priya Patel",
        title: "Corporate Client"
    }
];

export default function InteriorDesignPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Page Header */}
            <div className="mb-16">
                <div className="flex items-center mb-4">
                    <Link href="/services" className="text-primary hover:text-accent flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Services
                    </Link>
                </div>
                <h1 className="text-4xl font-bold mb-6">Interior Design Services</h1>
                <p className="text-xl text-gray-600 max-w-4xl">
                    Transform your spaces with our comprehensive interior design services.
                    We blend creativity, functionality, and your personal style to create
                    environments that inspire, comfort, and delight.
                </p>
            </div>

            {/* Services Grid */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold mb-10">Our Design Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-100 h-56 flex items-center justify-center">
                                {/* In a real implementation, this would be an actual image */}
                                <div className="text-gray-400 text-center p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {service.name} Image
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <h4 className="font-medium mb-2">What's Included:</h4>
                                <ul className="space-y-1 mb-6">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={service.href}
                                    className="inline-block bg-primary hover:bg-accent text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Design Process Section */}
            <div className="mb-20 bg-gray-50 rounded-xl p-10">
                <h2 className="text-3xl font-bold text-center mb-12">Our Design Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {designProcess.map((step, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-center mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                            <p className="text-gray-600 text-center">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3D Visualization Section */}
            <div id="3d-visualization" className="mb-20 scroll-mt-16">
                <div className="flex flex-col lg:flex-row gap-10 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold mb-6">3D Visualization</h2>
                        <p className="text-gray-600 mb-4">
                            Our advanced 3D visualization services allow you to experience your space before a single change is made.
                            This powerful tool helps eliminate uncertainty and ensures your complete satisfaction with the design before implementation.
                        </p>
                        <div className="space-y-4 mb-6">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Realistic Renderings</h3>
                                    <p className="text-gray-600">Photorealistic images that accurately showcase materials, lighting, and spatial relationships.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Virtual Walkthroughs</h3>
                                    <p className="text-gray-600">Interactive 360° tours that let you experience your space from every angle.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Design Confidence</h3>
                                    <p className="text-gray-600">Make informed decisions with the ability to compare different design options visually.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 bg-gray-100 rounded-xl h-96 flex items-center justify-center">
                        {/* In a real implementation, this would be a 3D visualization showcase */}
                        <div className="text-gray-400 text-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            3D Visualization Showcase
                        </div>
                    </div>
                </div>
            </div>

            {/* Sustainable Design Section */}
            <div id="sustainable-design" className="mb-20 scroll-mt-16">
                <div className="flex flex-col lg:flex-row-reverse gap-10 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold mb-6">Sustainable Design</h2>
                        <p className="text-gray-600 mb-4">
                            Our sustainable design approach creates spaces that are not only beautiful and functional but also environmentally responsible.
                            We incorporate eco-friendly materials, energy-efficient solutions, and wellness-focused elements to create healthy, sustainable interiors.
                        </p>
                        <div className="space-y-4 mb-6">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Eco-Friendly Materials</h3>
                                    <p className="text-gray-600">Carefully selected sustainable materials with low environmental impact.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Energy Efficiency</h3>
                                    <p className="text-gray-600">Solutions that reduce energy consumption and lower utility costs.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Healthy Living</h3>
                                    <p className="text-gray-600">Design elements that improve air quality and promote overall wellbeing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 bg-gray-100 rounded-xl h-96 flex items-center justify-center">
                        {/* In a real implementation, this would be a sustainable design showcase */}
                        <div className="text-gray-400 text-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Sustainable Design Showcase
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary opacity-50 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
                            <div>
                                <p className="font-bold">{testimonial.author}</p>
                                <p className="text-gray-500 text-sm">{testimonial.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Portfolio Showcase */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-6">Our Design Portfolio</h2>
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
                    Browse through our collection of completed projects to see our design expertise in action.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="group relative bg-gray-100 rounded-xl aspect-square overflow-hidden">
                            {/* In a real implementation, this would be an actual image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-gray-400 text-center p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Portfolio Image {item}
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                <div className="text-white">
                                    <h3 className="font-bold text-lg">Project Title {item}</h3>
                                    <p className="text-white/80">Residential Design</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link
                        href="/portfolio"
                        className="inline-block bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                        View Full Portfolio
                    </Link>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary text-white rounded-2xl p-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
                <p className="max-w-2xl mx-auto mb-8">
                    Contact us today to schedule a consultation and start your journey toward a beautifully designed space that perfectly reflects your style and meets your needs.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/consultation"
                        className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Book a Consultation
                    </Link>
                    <Link
                        href="/contact"
                        className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
} 