import Link from 'next/link';

// Service data
const services = [
    {
        name: 'Office Design',
        slug: 'office-design',
        description: 'Create productive, inspirational workspaces that reflect your company culture and enhance employee well-being.',
        features: [
            'Space planning and workflow optimization',
            'Ergonomic furniture selection',
            'Collaborative and private workspace design',
            'Branding integration throughout the space',
            'Acoustic solutions for noise control'
        ],
        image: '/images/services/office-design.jpg'
    },
    {
        name: 'Retail Store Design',
        slug: 'retail-store-design',
        description: 'Design engaging retail environments that enhance customer experience and increase sales through strategic layouts.',
        features: [
            'Customer journey mapping and store layout',
            'Visual merchandising strategies',
            'Lighting design for product highlighting',
            'Custom display solutions',
            'Brand-aligned interior concept development'
        ],
        image: '/images/services/retail-design.jpg'
    },
    {
        name: 'Restaurant Design',
        slug: 'restaurant-design',
        description: 'Create memorable dining experiences with thoughtfully designed restaurant interiors that complement your culinary concept.',
        features: [
            'Dining area layout and space optimization',
            'Kitchen workflow planning',
            'Ambiance and lighting design',
            'Custom furniture and fixture selection',
            'Branding integration and story-telling elements'
        ],
        image: '/images/services/restaurant-design.jpg'
    },
    {
        name: 'Corporate Branding',
        slug: 'corporate-branding',
        description: 'Integrate your brand identity into your physical space to create a cohesive experience for clients and employees.',
        features: [
            'Brand analysis and spatial interpretation',
            'Color and material selection aligned with brand identity',
            'Custom signage and environmental graphics',
            'Branded elements and feature walls',
            'Cohesive experience design across locations'
        ],
        image: '/images/services/corporate-branding.jpg'
    },
    {
        name: 'Hospitality Design',
        slug: 'hospitality-design',
        description: 'Design hotels, resorts, and other hospitality spaces that provide exceptional guest experiences and operational efficiency.',
        features: [
            'Guest room and suite design',
            'Lobby and public space planning',
            'Food and beverage venue design',
            'Amenity space development',
            'Durable and maintainable material selection'
        ],
        image: '/images/services/hospitality-design.jpg'
    }
];

// Commercial design benefits
const benefits = [
    {
        title: 'Increased Productivity',
        description: 'Well-designed commercial spaces can boost employee productivity and satisfaction.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        title: 'Enhanced Brand Image',
        description: 'Your space tells your brand story and creates lasting impressions on clients and visitors.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
        )
    },
    {
        title: 'Improved Customer Experience',
        description: 'Thoughtful design creates better customer experiences, leading to increased sales and loyalty.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
        )
    },
    {
        title: 'Optimized Space Usage',
        description: 'Maximize the potential of your commercial space with efficient planning and layout design.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        )
    }
];

// Process steps
const processSteps = [
    {
        number: '01',
        title: 'Discovery & Analysis',
        description: 'We analyze your business needs, brand, and operational requirements to understand your objectives.'
    },
    {
        number: '02',
        title: 'Concept Development',
        description: 'Our team creates design concepts that align with your brand and address your specific needs.'
    },
    {
        number: '03',
        title: 'Detailed Design',
        description: 'We develop detailed plans, material selections, and specifications for your commercial space.'
    },
    {
        number: '04',
        title: 'Implementation',
        description: 'Our team manages the entire implementation process, from procurement to installation.'
    },
    {
        number: '05',
        title: 'Handover & Support',
        description: 'We ensure a smooth transition and provide ongoing support for your new commercial space.'
    }
];

export default function CommercialServicesPage() {
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
                <h1 className="text-4xl font-bold mb-4">Commercial Services</h1>
                <p className="text-gray-600 max-w-3xl">
                    Create inspiring and productive commercial spaces that align with your brand identity and support your business goals.
                    Our commercial design services help businesses create environments that enhance productivity and customer experience.
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
                                href={`/services/commercial/${service.slug}`}
                                className="inline-block bg-primary hover:bg-accent text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Process Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Our Commercial Design Process</h2>
                <div className="relative">
                    {/* Process Line */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gray-200 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative z-10">
                                <div className="bg-primary text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {step.number}
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                                    <p className="text-gray-600 text-center">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Benefits of Professional Commercial Design</h2>
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

            {/* CTA Section */}
            <div className="bg-primary text-white rounded-2xl p-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business Space?</h2>
                <p className="max-w-2xl mx-auto mb-8">
                    Our expert designers can help you create a commercial space that enhances your brand and supports your business goals.
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
                        View Our Commercial Projects
                    </Link>
                </div>
            </div>
        </div>
    );
} 