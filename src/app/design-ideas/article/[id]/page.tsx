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
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{designIdea.title}</h1>
                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
                    <span className="mr-4">{designIdea.publishedDate}</span>
                    <span>By Pradeep Interior Design Team</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {designIdea.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-lg text-gray-700">{designIdea.description}</p>
            </div>

            {/* Main Image */}
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
                <img
                    src={designIdea.images[0].url}
                    alt={designIdea.images[0].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: designIdea.content }} />

            {/* Image Gallery */}
            {designIdea.images.length > 1 && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {designIdea.images.map((image, index) => (
                            <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Related Ideas */}
            {relatedIdeasData.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Related Design Ideas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedIdeasData.map((idea) => (
                            <Link
                                key={idea?.id}
                                href={`/design-ideas/article/${idea?.id}`}
                                className="group"
                            >
                                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                                    <img
                                        src={idea?.images[0].url}
                                        alt={idea?.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">{idea?.title}</h3>
                                <p className="text-gray-600 line-clamp-2">{idea?.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
