import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock design ideas data - in a real app, this would come from a database or API
const designIdeas = [
    {
        id: '1',
        title: 'Modern Minimalist Living Room',
        description: 'A clean, uncluttered living room design that focuses on simplicity, functionality, and a neutral color palette with subtle accent pieces.',
        content: `
      <p>The modern minimalist style is defined by its simplicity, clean lines, and a monochromatic palette with color used as an accent. It usually combines an open floor plan, lots of light, and functional furniture, with minimal decorative elements.</p>
      
      <h3>Key Elements:</h3>
      <ul>
        <li><strong>Color Palette:</strong> Neutral colors like whites, beiges, and grays serve as the foundation, with occasional pops of color through accessories or statement pieces.</li>
        <li><strong>Furniture:</strong> Simple, clean-lined furniture with elevated legs to create a sense of space and movement. Focus on functionality and comfort.</li>
        <li><strong>Decluttered Space:</strong> Every item has its place and purpose. Storage solutions are integrated to maintain the clean aesthetic.</li>
        <li><strong>Natural Light:</strong> Large windows with minimal window treatments to maximize natural light.</li>
        <li><strong>Textures:</strong> While keeping colorful elements to a minimum, different textures are incorporated through materials like wood, glass, metal, and textiles to add depth and interest.</li>
      </ul>
      
      <h3>Design Tips:</h3>
      <ol>
        <li>Choose a focal point for your living room, such as a statement sofa, an architectural feature, or a piece of art.</li>
        <li>Incorporate plants to bring life and color into the space while maintaining the minimal aesthetic.</li>
        <li>Use multi-functional furniture that serves multiple purposes to maximize space and functionality.</li>
        <li>Consider the negative space as part of the design – empty space is a defining characteristic of minimalist design.</li>
        <li>Focus on quality over quantity – select fewer, higher-quality pieces that will stand the test of time.</li>
      </ol>
    `,
        images: [
            {
                url: '/images/design-ideas/modern-minimalist-1.jpg',
                alt: 'Bright minimalist living room with white sofa and wooden accents'
            },
            {
                url: '/images/design-ideas/modern-minimalist-2.jpg',
                alt: 'Minimalist living space with neutral color palette'
            },
            {
                url: '/images/design-ideas/modern-minimalist-3.jpg',
                alt: 'Clean and simple minimalist interior with statement chair'
            }
        ],
        tags: ['Minimalist', 'Modern', 'Living Room', 'Neutral', 'Clean Lines'],
        relatedIdeas: ['2', '3'],
        publishedDate: 'January 15, 2023'
    },
    {
        id: '2',
        title: 'Scandinavian-Inspired Home Office',
        description: 'A bright, functional home office design inspired by Scandinavian principles of simplicity, functionality, and connection to nature.',
        content: `
      <p>Scandinavian design is characterized by simplicity, minimalism, and functionality that emerged in the early 20th century in the Nordic countries. It emphasizes clean lines, craftsmanship, and understated elegance.</p>
      
      <h3>Key Elements:</h3>
      <ul>
        <li><strong>Color Palette:</strong> Predominantly white with accents of gray, black, and natural wood tones. Occasional pops of muted colors like pale pink, sage green, or light blue.</li>
        <li><strong>Natural Materials:</strong> Liberal use of light-colored woods like ash, beech, or pine. Natural textiles such as wool, linen, and leather.</li>
        <li><strong>Functional Furniture:</strong> Practical, space-saving furniture with clean lines and minimal ornamentation. Ergonomic design for maximum comfort.</li>
        <li><strong>Ample Light:</strong> Maximized natural light with minimal window coverings. Layered lighting with task lights for functionality.</li>
        <li><strong>Organic Elements:</strong> Integration of plants and natural materials to bring the outdoors in and create a calm, serene environment.</li>
      </ul>
      
      <h3>Home Office Tips:</h3>
      <ol>
        <li>Position your desk to take advantage of natural light – ideally facing or perpendicular to a window.</li>
        <li>Choose a chair that prioritizes comfort and proper ergonomics for long work sessions.</li>
        <li>Incorporate open shelving to display books, plants, and decorative items while maintaining organization.</li>
        <li>Use a cohesive color scheme with predominantly light colors to create a sense of spaciousness and calm.</li>
        <li>Add texture through a warm rug, woven storage baskets, or a textured throw for visual interest and comfort.</li>
      </ol>
    `,
        images: [
            {
                url: '/images/design-ideas/scandinavian-office-1.jpg',
                alt: 'Bright home office with white desk and wooden chair'
            },
            {
                url: '/images/design-ideas/scandinavian-office-2.jpg',
                alt: 'Scandinavian workspace with minimal decoration and natural light'
            },
            {
                url: '/images/design-ideas/scandinavian-office-3.jpg',
                alt: 'Home office with light wood furniture and green plants'
            }
        ],
        tags: ['Scandinavian', 'Home Office', 'Functional', 'Natural Light', 'Minimalist'],
        relatedIdeas: ['1', '3'],
        publishedDate: 'February 22, 2023'
    },
    {
        id: '3',
        title: 'Luxurious Contemporary Bathroom',
        description: 'An elegant bathroom design that combines contemporary aesthetics with luxurious materials and fixtures for a spa-like experience.',
        content: `
      <p>Luxury contemporary bathroom design combines sleek modern aesthetics with high-end materials and features to create a spa-like retreat within your home. The focus is on creating a space that offers both visual beauty and unparalleled comfort.</p>
      
      <h3>Key Elements:</h3>
      <ul>
        <li><strong>Premium Materials:</strong> High-quality materials like marble, granite, or quartz for countertops and wall treatments. Porcelain or natural stone tiles for flooring.</li>
        <li><strong>Statement Fixtures:</strong> Designer faucets, showerheads, and hardware in finishes like brushed gold, matte black, or polished chrome.</li>
        <li><strong>Freestanding Tub:</strong> A sculptural freestanding bathtub as a centerpiece for larger bathrooms.</li>
        <li><strong>Walk-in Shower:</strong> Frameless glass shower enclosures with built-in niches, multiple shower heads, and possibly steam features.</li>
        <li><strong>Elegant Lighting:</strong> Layered lighting scheme with ambient, task, and accent lighting. Statement chandelier or pendant lights to add drama.</li>
      </ul>
      
      <h3>Design Tips:</h3>
      <ol>
        <li>Choose a cohesive color palette – neutral tones like whites, grays, and blacks create a timeless foundation that can be accented with metallic finishes.</li>
        <li>Invest in quality fixtures that combine beauty and functionality – they're the jewelry of your bathroom.</li>
        <li>Incorporate smart technology like programmable shower systems, heated floors, or backlit mirrors with integrated LED lighting.</li>
        <li>Consider a floating vanity to create a sense of spaciousness and make cleaning easier.</li>
        <li>Add finishing touches with high-end accessories like plush towels, elegant dispensers, and perhaps a small stool or chair for comfort.</li>
      </ol>
    `,
        images: [
            {
                url: '/images/design-ideas/luxury-bathroom-1.jpg',
                alt: 'Modern bathroom with marble surfaces and freestanding tub'
            },
            {
                url: '/images/design-ideas/luxury-bathroom-2.jpg',
                alt: 'Contemporary bathroom with glass shower and elegant fixtures'
            },
            {
                url: '/images/design-ideas/luxury-bathroom-3.jpg',
                alt: 'Luxurious bathroom design with dramatic lighting and dark accents'
            }
        ],
        tags: ['Bathroom', 'Luxury', 'Contemporary', 'Spa-like', 'Modern'],
        relatedIdeas: ['1', '2'],
        publishedDate: 'March 10, 2023'
    }
];

export default function DesignIdeaPage({ params }: { params: { id: string } }) {
    // Find the design idea by ID
    const designIdea = designIdeas.find(idea => idea.id === params.id);

    // If no design idea is found, return a 404 page
    if (!designIdea) {
        notFound();
    }

    // Get related ideas
    const relatedIdeasData = designIdea.relatedIdeas
        .map(id => designIdeas.find(idea => idea.id === id))
        .filter(Boolean);

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <div className="mb-6">
                <Link href="/design-ideas" className="text-primary hover:text-accent flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Design Ideas
                </Link>
            </div>

            {/* Design Idea Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{designIdea.title}</h1>
                <p className="text-gray-600 text-lg mb-4">{designIdea.description}</p>
                <div className="flex flex-wrap items-center text-sm text-gray-500">
                    <span className="mr-4">Published: {designIdea.publishedDate}</span>
                    <div className="flex flex-wrap gap-2">
                        {designIdea.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Image */}
            <div className="mb-10 rounded-xl overflow-hidden bg-gray-100 h-96 relative">
                {/* In a real app, this would be an actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 text-center p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Main Image Placeholder
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* For safety in a real app, you'd use a sanitized HTML renderer here */}
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: designIdea.content }}
                    />
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Gallery */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Gallery</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {designIdea.images.map((image, index) => (
                                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                    <div className="text-gray-400 text-center p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-xs">Image {index + 1}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Get Started */}
                    <div className="bg-primary text-white p-6 rounded-xl">
                        <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
                        <p className="mb-4">Transform your space with our expert interior design services.</p>
                        <Link
                            href="/consultation"
                            className="block bg-white text-primary hover:bg-gray-100 text-center py-2 rounded-lg font-medium transition-colors"
                        >
                            Book a Consultation
                        </Link>
                    </div>
                </div>
            </div>

            {/* Related Ideas */}
            {relatedIdeasData.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedIdeasData.map(idea => (
                            <div key={idea.id} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gray-100 flex items-center justify-center">
                                    <div className="text-gray-400 text-center p-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Design Idea Image
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2">{idea.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{idea.description}</p>
                                    <Link
                                        href={`/design-ideas/${idea.id}`}
                                        className="text-primary hover:text-accent font-medium flex items-center"
                                    >
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 bg-gray-50 rounded-2xl p-10 text-center">
                <h2 className="text-3xl font-bold mb-4">Want to Apply This Look?</h2>
                <p className="max-w-2xl mx-auto mb-8 text-gray-600">
                    Our expert designers can help you implement this design idea in your space, customized to your specific needs and preferences.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/consultation"
                        className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Book a Consultation
                    </Link>
                    <Link
                        href="/contact"
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
} 