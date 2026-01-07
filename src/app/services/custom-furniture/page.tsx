import Link from 'next/link';

// Service data
const services = [
    {
        name: 'Built-in Wardrobes',
        slug: 'built-in-wardrobes',
        description: 'Custom-designed wardrobes that maximize storage while perfectly fitting your space and style preferences.',
        features: [
            'Tailored to your exact space dimensions',
            'Customized internal organization systems',
            'Selection of door styles and hardware',
            'Integrated lighting options',
            'Choice of finishes and materials'
        ],
        image: '/images/services/wardrobe.jpg'
    },
    {
        name: 'Custom Tables',
        slug: 'custom-tables',
        description: 'Bespoke tables designed to your specifications, whether for dining, coffee, console, or work surfaces.',
        features: [
            'Custom dimensions to fit your space perfectly',
            'Selection of premium woods and materials',
            'Variety of edge profiles and leg styles',
            'Optional features like extensions or drawers',
            'Finishes matched to your existing decor'
        ],
        image: '/images/services/custom-table.jpg'
    },
    {
        name: 'Bespoke Seating',
        slug: 'bespoke-seating',
        description: 'Custom-crafted sofas, chairs, and benches designed for both comfort and aesthetic appeal.',
        features: [
            'Made-to-measure dimensions',
            'Premium upholstery options',
            'Custom cushion firmness and fill',
            'Decorative details like piping or tufting',
            'Coordinated with your interior design scheme'
        ],
        image: '/images/services/bespoke-seating.jpg'
    },
    {
        name: 'Storage Solutions',
        slug: 'storage-solutions',
        description: 'Innovative storage solutions designed to organize and declutter your space while enhancing its visual appeal.',
        features: [
            'Custom bookshelves and display units',
            'Built-in cabinets for specialized storage',
            'Multi-functional furniture pieces',
            'Space-saving designs for compact areas',
            'Integrated with existing architecture'
        ],
        image: '/images/services/storage-solutions.jpg'
    },
    {
        name: 'Custom Office Furniture',
        slug: 'custom-office-furniture',
        description: 'Ergonomic and aesthetically pleasing office furniture tailored to your work style and space.',
        features: [
            'Desks designed for your specific workflow',
            'Ergonomic seating for comfort during long work sessions',
            'Integrated cable management systems',
            'Custom storage for files and office supplies',
            'Conference and meeting tables for collaborative spaces'
        ],
        image: '/images/services/office-furniture.jpg'
    }
];

// Materials we use
const materials = [
    {
        name: 'Solid Hardwoods',
        description: 'Premium hardwoods like oak, walnut, maple, and cherry, selected for durability and beautiful grain patterns.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        )
    },
    {
        name: 'Metal Accents',
        description: 'Brass, steel, iron, and aluminum components that add strength and distinctive design elements.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        )
    },
    {
        name: 'Premium Upholstery',
        description: 'High-quality leathers, performance fabrics, and natural textiles selected for both beauty and durability.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        )
    },
    {
        name: 'Sustainable Materials',
        description: 'Eco-friendly options including reclaimed wood, bamboo, and other sustainable materials for environmentally-conscious clients.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    }
];

// Process steps
const processSteps = [
    {
        title: 'Consultation',
        description: 'We start with a thorough consultation to understand your needs, preferences, space constraints, and budget. We'll discuss functionality, aesthetics, and how the piece will integrate with your existing decor.'
  },
    {
        title: 'Design & Sketching',
        description: 'Our designers create preliminary sketches and 3D renderings of your custom furniture piece, allowing you to visualize the final product and make any necessary adjustments to the design.'
    },
    {
        title: 'Material Selection',
        description: 'We help you select the perfect materials, finishes, hardware, and upholstery (if applicable) that align with your style preferences, functional needs, and budget considerations.'
    },
    {
        title: 'Craftsmanship',
        description: 'Our skilled artisans carefully craft your furniture piece, paying meticulous attention to detail and employing traditional woodworking techniques alongside modern technology.'
    },
    {
        title: 'Finishing & Quality Control',
        description: 'Each piece undergoes multiple rounds of finishing and rigorous quality checks to ensure durability, functionality, and aesthetic perfection before delivery.'
    },
    {
        title: 'Delivery & Installation',
        description: 'We carefully deliver and install your custom furniture in your space, ensuring it fits perfectly and functions as designed. Our team provides care instructions for long-lasting enjoyment.'
    }
];

export default function CustomFurnitureServicesPage() {
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
                <h1 className="text-4xl font-bold mb-4">Custom Furniture</h1>
                <p className="text-gray-600 max-w-3xl">
                    Get bespoke furniture pieces tailored to your specific needs, style preferences, and space requirements.
                    Each piece is meticulously crafted by our skilled artisans, combining traditional craftsmanship with modern design aesthetics.
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
                                href={`/services/custom-furniture/${service.slug}`}
                                className="inline-block bg-primary hover:bg-accent text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Materials Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-4">Premium Materials</h2>
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                    We source only the highest quality materials for our custom furniture pieces, ensuring both beauty and longevity.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {materials.map((material, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-center mb-4">
                                {material.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center">{material.name}</h3>
                            <p className="text-gray-600 text-center">{material.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Process Section */}
            <div className="mb-16 bg-gray-50 rounded-xl p-10">
                <h2 className="text-3xl font-bold text-center mb-10">Our Custom Furniture Process</h2>
                <div className="space-y-8">
                    {processSteps.map((step, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="md:w-1/5 lg:w-1/6">
                                <div className="bg-primary text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center">
                                    {index + 1}
                                </div>
                            </div>
                            <div className="md:w-4/5 lg:w-5/6">
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Our Custom Furniture Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center">
                            {/* In a real implementation, this would be an actual image */}
                            <div className="text-gray-400 text-center p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Gallery Image {item}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link
                        href="/portfolio"
                        className="inline-block bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        View Full Portfolio
                    </Link>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "The custom dining table Pradeep Interiors crafted for us is not just functional furniture—it's a work of art. The attention to detail and quality of craftsmanship is exceptional.",
                            author: "Priya Sharma",
                            title: "Homeowner"
                        },
                        {
                            quote: "Our office needed specialized workstations that would maximize our unusual space. The custom solution provided exceeded our expectations both in functionality and aesthetics.",
                            author: "Raj Mehta",
                            title: "Business Owner"
                        },
                        {
                            quote: "The built-in wardrobe system transformed our bedroom. Not only does it provide ample storage, but it also enhances the overall design of the room perfectly.",
                            author: "Anita Desai",
                            title: "Interior Design Enthusiast"
                        }
                    ].map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary opacity-50 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
                            <div>
                                <p className="font-bold">{testimonial.author}</p>
                                <p className="text-gray-500 text-sm">{testimonial.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary text-white rounded-2xl p-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready for Your Custom Furniture Journey?</h2>
                <p className="max-w-2xl mx-auto mb-8">
                    Let us create a one-of-a-kind furniture piece that perfectly matches your style, needs, and space.
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