import Link from 'next/link';

// Sample wardrobe types
const wardrobeTypes = [
    {
        name: 'Walk-in Wardrobes',
        description: 'Luxurious walk-in wardrobes that transform your dressing experience, with customized storage solutions for every item in your wardrobe.',
        features: [
            'Dedicated sections for different clothing types',
            'Integrated lighting for visibility',
            'Island storage for accessories',
            'Seating area for comfort',
            'Full-length and vanity mirrors'
        ],
        image: '/images/services/walk-in-wardrobe.jpg'
    },
    {
        name: 'Sliding Door Wardrobes',
        description: 'Space-efficient sliding door wardrobes that are perfect for smaller rooms or where floor space is limited.',
        features: [
            'Space-saving door mechanism',
            'Variety of door panel materials and finishes',
            'Mirror door options for visual expansion',
            'Custom internal organization systems',
            'Soft-close door mechanisms'
        ],
        image: '/images/services/sliding-wardrobe.jpg'
    },
    {
        name: 'Hinged Door Wardrobes',
        description: 'Traditional hinged door wardrobes that provide full access to your storage space with a timeless and elegant design.',
        features: [
            'Maximum interior access',
            'Classic or contemporary door designs',
            'Custom door handles and hardware',
            'Integrated drawers and shelving',
            'Various finish options'
        ],
        image: '/images/services/hinged-wardrobe.jpg'
    },
    {
        name: 'Fitted Wardrobes',
        description: 'Bespoke fitted wardrobes designed to perfectly integrate with your rooms architecture, utilizing every inch of available space.',
    features: [
            'Wall-to-wall and floor-to-ceiling designs',
            'Customized to work with sloped ceilings or awkward spaces',
            'Integrated with existing room features',
            'Maximized storage capacity',
            'Seamless design integration'
        ],
        image: '/images/services/fitted-wardrobe.jpg'
    }
];

// Material options
const materials = [
    {
        name: 'Hardwoods',
        options: ['Oak', 'Walnut', 'Maple', 'Cherry', 'Mahogany'],
        description: 'Premium hardwoods offer durability and a timeless aesthetic with beautiful natural grain patterns.'
    },
    {
        name: 'Engineered Woods',
        options: ['MDF', 'Plywood', 'Particleboard with Veneer'],
        description: 'Cost-effective options that provide stability and consistent performance with various finish options.'
    },
    {
        name: 'Finishes',
        options: ['Natural', 'Stained', 'Painted', 'High Gloss', 'Matte'],
        description: 'Various finish options to achieve your desired look, from natural wood grain to contemporary colors.'
    },
    {
        name: 'Glass & Mirrors',
        options: ['Clear Glass', 'Frosted Glass', 'Tinted Glass', 'Full-Length Mirrors', 'Decorative Glass'],
        description: 'Add light, visual space, and functionality to your wardrobe with strategic use of glass and mirrors.'
    },
    {
        name: 'Hardware',
        options: ['Brushed Nickel', 'Chrome', 'Brass', 'Matte Black', 'Custom Handles'],
        description: 'Quality hardware in various styles and finishes to complement your wardrobe design.'
    }
];

// FAQ items
const faqItems = [
    {
        question: 'How long does it take to design and install a custom wardrobe?',
        answer: 'The timeline for a custom wardrobe project typically ranges from 4-8 weeks. This includes initial consultation, design phase (1-2 weeks), material procurement (2-3 weeks), and installation (1-2 days for standard wardrobes, up to a week for complex walk-ins). We'll provide a specific timeline during your consultation based on your project's complexity and our current schedule.'
  },
    {
        question: 'Can you work with unusual room dimensions or sloped ceilings?',
        answer: 'Absolutely! One of the main advantages of custom wardrobes is their ability to fit perfectly into challenging spaces. Our designers specialize in creating solutions for rooms with sloped ceilings, awkward corners, or unusual dimensions. We'll measure your space precisely and design a wardrobe that maximizes every inch while maintaining aesthetic appeal.'
  },
    {
        question: 'What kind of warranty do you offer on custom wardrobes?',
        answer: 'We stand behind the quality of our craftsmanship and materials. All our custom wardrobes come with a 5-year warranty on craftsmanship and installation. Hardware components typically carry manufacturer warranties ranging from a lifetime to 2 years, depending on the specific items. We'll provide detailed warranty information for all components of your custom wardrobe.'
  },
    {
        question: 'Do you offer any storage accessories for inside the wardrobes?',
        answer: 'Yes, we offer a comprehensive range of internal storage accessories including pull-out racks for ties/belts/scarves, jewelry trays, shoe racks, pull-down hanging rails, trouser racks, drawer dividers, and more. During the design phase, we'll discuss your specific storage needs and recommend the best internal organization systems to maximize functionality.'
  },
    {
        question: 'Can I see samples of materials and finishes before making a decision?',
        answer: 'Absolutely! We have a showroom where you can view and touch various material samples, or our designer can bring samples to your home during the consultation. We understand that selecting materials is an important part of the process, and we want you to be confident in your choices before proceeding with manufacturing.'
    }
];

export default function BuiltInWardrobesPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Breadcrumb Navigation */}
            <div className="mb-6">
                <div className="flex items-center text-sm text-gray-500">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link href="/services" className="hover:text-primary">Services</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link href="/services/custom-furniture" className="hover:text-primary">Custom Furniture</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-700">Built-in Wardrobes</span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gray-50 rounded-xl p-8 md:p-12 mb-12">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold mb-4">Built-in Wardrobes</h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Custom-designed wardrobes that maximize storage while perfectly fitting your space and style preferences.
                            Our built-in wardrobes combine functionality with exquisite design to create storage solutions that enhance your living space.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Tailored to Your Space</h3>
                                    <p className="text-gray-600">Designed to fit your exact room dimensions, making use of every inch of available space.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Personalized Organization</h3>
                                    <p className="text-gray-600">Custom internal layouts designed around your wardrobe contents and lifestyle needs.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Premium Craftsmanship</h3>
                                    <p className="text-gray-600">Expertly crafted using quality materials for durability and a flawless finish.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/consultation"
                                className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Book a Consultation
                            </Link>
                            <Link
                                href="/portfolio?category=wardrobes"
                                className="border border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 bg-gray-200 rounded-xl h-80 flex items-center justify-center">
                        {/* In a real implementation, this would be an actual image */}
                        <div className="text-gray-400 text-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Hero Image: Built-in Wardrobe Showcase
                        </div>
                    </div>
                </div>
            </div>

            {/* Wardrobe Types Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Types of Built-in Wardrobes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {wardrobeTypes.map((type, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-100 h-56 flex items-center justify-center">
                                {/* In a real implementation, this would be an actual image */}
                                <div className="text-gray-400 text-center p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {type.name} Image
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{type.name}</h3>
                                <p className="text-gray-600 mb-4">{type.description}</p>
                                <h4 className="font-medium mb-2">Key Features:</h4>
                                <ul className="space-y-1 mb-4">
                                    {type.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Process Section */}
            <div className="bg-gray-50 rounded-xl p-10 mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Our Wardrobe Design Process</h2>
                <div className="max-w-4xl mx-auto">
                    {[
                        {
                            step: 1,
                            title: 'Initial Consultation',
                            description: 'We begin with an in-depth discussion about your storage needs, style preferences, and space constraints. Our designer will take measurements of your space and discuss your budget expectations.'
                        },
                        {
                            step: 2,
                            title: 'Design Proposal',
                            description: 'Based on your consultation, we create detailed designs and 3D renderings of your custom wardrobe, allowing you to visualize the final product. We'll present material samples and discuss finish options.'
            },
                        {
                            step: 3,
                            title: 'Refinement & Approval',
                            description: 'We refine the design based on your feedback until you're completely satisfied.Once approved, we'll finalize material selections and provide a detailed quote and timeline.'
            },
                        {
                            step: 4,
                            title: 'Precision Manufacturing',
                            description: 'Our skilled craftspeople manufacture your wardrobe components with meticulous attention to detail, ensuring precision and quality at every step.'
                        },
                        {
                            step: 5,
                            title: 'Professional Installation',
                            description: 'Our experienced installation team will fit your wardrobe with minimal disruption to your home. We ensure everything is perfectly installed and functioning correctly.'
                        },
                        {
                            step: 6,
                            title: 'Final Inspection & Handover',
                            description: 'We conduct a final inspection with you to ensure everything meets our high standards and your expectations. We'll provide care instructions to keep your wardrobe looking its best.'
            }
                    ].map((process, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-start mb-8 last:mb-0">
                            <div className="md:w-1/6 flex-shrink-0 mb-4 md:mb-0">
                                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                                    {process.step}
                                </div>
                            </div>
                            <div className="md:w-5/6">
                                <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                                <p className="text-gray-600">{process.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Materials Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-4">Materials & Finishes</h2>
                <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
                    We offer a wide range of high-quality materials and finishes to create your perfect wardrobe that matches your interior design theme.
                </p>
                <div className="space-y-8">
                    {materials.map((material, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xl font-bold mb-2">{material.name}</h3>
                            <p className="text-gray-600 mb-4">{material.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {material.options.map((option, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                        {option}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Wardrobe Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                            {/* In a real implementation, this would be an actual image */}
                            <div className="text-gray-400 text-center p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Wardrobe Gallery Image {item}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto space-y-6">
                    {faqItems.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-10">Client Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            quote: "The built-in wardrobe that Pradeep Interiors designed has completely transformed our bedroom. The attention to detail in maximizing our awkward corner space was remarkable.",
                            author: "Vikram & Neha Patel",
                            project: "Walk-in Wardrobe, Mumbai"
                        },
                        {
                            quote: "I never knew how much easier getting ready in the morning could be until I had my custom wardrobe installed. Everything has its place, and the lighting solutions inside are perfect.",
                            author: "Aisha Kapoor",
                            project: "Fitted Bedroom Wardrobe, Delhi"
                        }
                    ].map((testimonial, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary opacity-20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
                            <div>
                                <p className="font-bold">{testimonial.author}</p>
                                <p className="text-gray-500 text-sm">{testimonial.project}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary text-white rounded-2xl p-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Transform Your Space with a Custom Wardrobe</h2>
                <p className="max-w-2xl mx-auto mb-8">
                    Contact us today to schedule a consultation and start your journey towards an organized, stylish, and perfectly fitted wardrobe solution.
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