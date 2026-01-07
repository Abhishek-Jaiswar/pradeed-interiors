import Link from 'next/link';

// Service data
const services = [
    {
        name: 'Kitchen Remodeling',
        slug: 'kitchen-remodeling',
        description: 'Transform your kitchen into a beautiful, functional space with our comprehensive kitchen remodeling services.',
        features: [
            'Custom cabinetry and storage solutions',
            'Countertop selection and installation',
            'Appliance upgrades and integration',
            'Lighting design and fixture selection',
            'Flooring replacement and backsplash installation'
        ],
        image: '/images/services/kitchen-remodeling.jpg'
    },
    {
        name: 'Bathroom Renovation',
        slug: 'bathroom-renovation',
        description: 'Create a luxurious and functional bathroom retreat with our expert renovation services.',
        features: [
            'Layout optimization and space planning',
            'Fixture selection and installation',
            'Tile work and waterproofing',
            'Vanity and storage solutions',
            'Lighting and ventilation improvements'
        ],
        image: '/images/services/bathroom-renovation.jpg'
    },
    {
        name: 'Complete Home Renovation',
        slug: 'complete-home-renovation',
        description: 'Comprehensive home renovation services to transform your entire living space according to your vision.',
        features: [
            'Structural modifications and layout changes',
            'Electrical and plumbing upgrades',
            'Flooring, wall, and ceiling renovations',
            'Custom built-ins and architectural details',
            'Complete interior design and styling'
        ],
        image: '/images/services/home-renovation.jpg'
    },
    {
        name: 'Office Renovation',
        slug: 'office-renovation',
        description: 'Revitalize your workplace with our office renovation services designed to enhance productivity and aesthetics.',
        features: [
            'Space planning and workflow optimization',
            'Custom workstations and furniture solutions',
            'Technology integration and smart office features',
            'Branding elements and graphics installation',
            'Lighting and acoustic improvements'
        ],
        image: '/images/services/office-renovation.jpg'
    },
    {
        name: 'Retail Space Renovation',
        slug: 'retail-space-renovation',
        description: 'Transform your retail environment to enhance customer experience and showcase your products effectively.',
        features: [
            'Store layout and customer flow planning',
            'Display systems and fixture design',
            'Lighting design for product highlighting',
            'Storefront and signage renovation',
            'Flooring and wall treatments'
        ],
        image: '/images/services/retail-renovation.jpg'
    }
];

// Renovation benefits
const benefits = [
    {
        title: 'Increased Property Value',
        description: 'Well-executed renovations can significantly increase the value of your property for future resale.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: 'Improved Functionality',
        description: 'Renovations allow you to optimize your space for better flow, storage, and usability.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        )
    },
    {
        title: 'Modern Updates',
        description: 'Upgrade dated systems and features to modern, energy-efficient, and technologically advanced alternatives.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: 'Customized Solutions',
        description: 'Create spaces that are specifically tailored to your unique needs, preferences, and lifestyle.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
        )
    }
];

// FAQ items
const faqItems = [
    {
        question: 'How long does a typical renovation project take?',
        answer: 'The timeline for renovation projects varies greatly depending on the scope and complexity. A bathroom renovation might take 3-4 weeks, while a complete home renovation could take 3-6 months. During your consultation, we'll provide a detailed timeline specific to your project.'
  },
    {
        question: 'Do I need to move out during the renovation?',
        answer: 'It depends on the extent of the renovation. For comprehensive home renovations, it's often more comfortable to relocate temporarily due to dust, noise, and potential utility interruptions.For smaller projects, it may be possible to remain in your home.We'll discuss logistics and recommendations during the planning phase.'
  },
    {
        question: 'How are renovation costs determined?',
        answer: 'Renovation costs are determined by several factors including the size of the space, quality of materials, complexity of the work required, and any structural changes needed. We provide detailed quotes broken down by labor, materials, and other expenses so you understand exactly what you're investing in.'
  },
    {
        question: 'Can you work with my existing furniture and decor?',
        answer: 'Absolutely! We can design renovations that incorporate your existing furniture, artwork, and decor. During the design phase, we'll discuss which items you'd like to keep and how to integrate them into the new design for a cohesive look.'
  },
    {
        question: 'Do you handle all necessary permits for renovation projects?',
        answer: 'Yes, we manage the entire permitting process. Our team is familiar with local building codes and regulations, and we'll handle all the necessary documentation and approvals to ensure your renovation is compliant with all requirements.'
  }
];

export default function RenovationServicesPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Page Header */}
            <div className="mb-12">
                <div className="flex items-center mb-4">
                    <Link href="/services" className="text-primary hover:text-accent flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Services
                    </Link>
                </div>
                <h1 className="text-4xl font-bold mb-4">Renovation Services</h1>
                <p className="text-gray-600 max-w-3xl">
                    Modernize and enhance your existing spaces with our comprehensive renovation services for both residential and commercial properties.
                    Our expert team handles everything from design through execution to transform your space.
                </p>
            </div>

            {/* Services List */}
            <div className="space-y-16 mb-16">
                {services.map((service, index) => (
                    <div
                        key={service.slug}
                        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                    >
                        <div className="md:w-1/2 bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                            {/* In a real implementation, this would be an actual image */}
                            <div className="text-gray-400 text-center p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Service Image Placeholder
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold mb-3">{service.name}</h2>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <h3 className="font-semibold text-lg mb-2">What's Included:</h3>
                            <ul className="space-y-2 mb-6">
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
                                href={`/services/renovation/${service.slug}`}
                                className="inline-block bg-primary hover:bg-accent text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Our Renovation Process */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Our Renovation Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-8 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
                            Consultation & Planning
                        </h3>
                        <p className="text-gray-600 ml-11">
                            We begin with a thorough consultation to understand your vision, needs, and budget. Our team will assess your space, discuss options, and develop a comprehensive plan for your renovation project.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                            Design & Material Selection
                        </h3>
                        <p className="text-gray-600 ml-11">
                            Our designers create detailed plans and help you select materials, fixtures, and finishes that align with your vision and budget. We'll present options and recommendations to ensure the best results.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">3</span>
                            Permitting & Preparation
                        </h3>
                        <p className="text-gray-600 ml-11">
                            We handle all necessary permits and approvals, ensuring your renovation complies with local building codes. We'll prepare your space for construction, including protection of areas not being renovated.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">4</span>
                            Construction & Installation
                        </h3>
                        <p className="text-gray-600 ml-11">
                            Our skilled craftsmen execute the renovation according to the approved plans. We maintain clear communication throughout the construction phase, with regular progress updates and quality checks.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl md:col-span-2">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">5</span>
                            Final Inspection & Handover
                        </h3>
                        <p className="text-gray-600 ml-11">
                            Once construction is complete, we conduct a thorough inspection to ensure everything meets our high standards. We'll walk you through your newly renovated space, address any questions, and provide maintenance tips before final handover.
                        </p>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Benefits of Professional Renovation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="flex justify-center mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {faqItems.map((item, index) => (
                        <div key={index} className={`p-6 ${index !== 0 ? 'border-t border-gray-200' : ''}`}>
                            <h3 className="text-lg font-bold mb-2">{item.question}</h3>
                            <p className="text-gray-600">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary text-white rounded-2xl p-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
                <p className="max-w-2xl mx-auto mb-8">
                    Our expert team is ready to help you bring your renovation vision to life. Schedule a consultation to discuss your project and get started.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/consultation"
                        className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Book a Consultation
                    </Link>
                    <Link
                        href="/portfolio"
                        className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        View Our Renovation Projects
                    </Link>
                </div>
            </div>
        </div>
    );
} 