import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock API call to get a project by ID
async function getProject(id: string) {
    try {
        // In a real app, this would call your API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/portfolio/mock`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch project');
        }

        const data = await response.json();
        const project = data.data.portfolioProjects.find((p: any) => p.id === id);

        if (!project) {
            return null;
        }

        return project;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
}

export default async function PortfolioProjectPage({ params }: { params: { id: string } }) {
    const project = await getProject(params.id);

    if (!project) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link href="/portfolio" className="text-primary hover:text-accent flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Portfolio
                </Link>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-12">
                <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold">{project.title}</h1>
                        <p className="text-gray-600">{project.category}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <div className="bg-white p-8 rounded-xl shadow-md mb-10">
                        <h2 className="text-2xl font-bold mb-6">Project Overview</h2>

                        <div className="prose max-w-none">
                            <p className="text-gray-700 whitespace-pre-line">{project.content}</p>
                        </div>
                    </div>

                    {/* Before & After Section */}
                    {project.beforeImages.length > 0 && project.afterImages.length > 0 && (
                        <div className="bg-white p-8 rounded-xl shadow-md mb-10">
                            <h2 className="text-2xl font-bold mb-6">Before & After</h2>

                            <div className="space-y-8">
                                {project.beforeImages.map((beforeImg, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <div className="absolute top-4 left-4 z-10 bg-white text-gray-800 px-3 py-1 rounded-full text-sm shadow-md">
                                                Before
                                            </div>
                                            <img
                                                src={beforeImg}
                                                alt={`${project.title} Before ${index + 1}`}
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                        </div>

                                        <div className="relative">
                                            <div className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 rounded-full text-sm shadow-md">
                                                After
                                            </div>
                                            <img
                                                src={index < project.afterImages.length ? project.afterImages[index] : project.afterImages[0]}
                                                alt={`${project.title} After ${index + 1}`}
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery Section */}
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.images.map((image, index) => (
                                <div key={index} className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
                                    <img
                                        src={image}
                                        alt={`${project.title} ${index + 1}`}
                                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    {/* Project Details */}
                    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                        <h3 className="text-xl font-bold mb-4">Project Details</h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-700">Category</h4>
                                <p>{project.category}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-700">Tags</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-700">Completed</h4>
                                <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial */}
                    {project.testimonial && (
                        <div className="bg-primary text-white p-6 rounded-xl shadow-md mb-8">
                            <h3 className="text-xl font-bold mb-4">Client Testimonial</h3>

                            <blockquote className="italic">
                                "{project.testimonial}"
                            </blockquote>

                            {project.clientName && (
                                <p className="mt-4 font-semibold">— {project.clientName}</p>
                            )}
                        </div>
                    )}

                    {/* CTA */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold mb-4">Ready to Transform Your Space?</h3>
                        <p className="text-gray-600 mb-6">
                            Let us help you create a space that reflects your style and meets your needs.
                        </p>

                        <Link
                            href="/consultation"
                            className="block w-full bg-accent hover:bg-primary text-white text-center py-3 rounded-lg transition-colors font-semibold"
                        >
                            Book a Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 