import Link from 'next/link';
import Image from 'next/image';

async function getPortfolioProjects() {
    // Use mock API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/portfolio/mock`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch portfolio projects');
    }

    const data = await response.json();
    return data.data;
}

export default async function PortfolioPage() {
    let portfolioData;
    let error = null;

    try {
        portfolioData = await getPortfolioProjects();
    } catch (err) {
        error = 'Failed to load portfolio projects. Please try again later.';
        portfolioData = { portfolioProjects: [], pagination: { total: 0 } };
    }

    const { portfolioProjects, pagination } = portfolioData || { portfolioProjects: [], pagination: { total: 0 } };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore our latest interior design projects and discover how we transform spaces into beautiful, functional environments.
                </p>
            </div>

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-8">
                    {error}
                </div>
            )}

            {/* Filters */}
            <div className="mb-10">
                <div className="flex flex-wrap justify-center gap-4">
                    <button className="px-4 py-2 bg-primary text-white rounded-full text-sm">
                        All Projects
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                        Residential
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                        Commercial
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                        Renovation
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                        New Build
                    </button>
                </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioProjects.map((project) => (
                    <Link
                        href={`/portfolio/${project.id}`}
                        key={project.id}
                        className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                            <div className="absolute bottom-0 left-0 bg-primary text-white px-3 py-1 text-sm">
                                {project.category}
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>

                            {project.testimonial && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-sm italic text-gray-600 line-clamp-2">"{project.testimonial}"</p>
                                    {project.clientName && (
                                        <p className="text-xs text-gray-500 mt-1">— {project.clientName}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {portfolioProjects.length === 0 && !error && (
                <div className="text-center py-16">
                    <p className="text-gray-500">No portfolio projects found</p>
                </div>
            )}

            {/* Featured Project Section */}
            {portfolioProjects.length > 0 && (
                <div className="mt-20">
                    <h2 className="text-3xl font-bold mb-8 text-center">Featured Transformation</h2>

                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative">
                                <div className="grid grid-cols-2 h-full">
                                    <div className="relative">
                                        <div className="absolute top-4 left-4 z-10 bg-white text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                            Before
                                        </div>
                                        <img
                                            src={portfolioProjects[0].beforeImages[0]}
                                            alt="Before"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            After
                                        </div>
                                        <img
                                            src={portfolioProjects[0].afterImages[0]}
                                            alt="After"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold mb-4">{portfolioProjects[0].title}</h3>
                                <p className="text-gray-600 mb-6">{portfolioProjects[0].description}</p>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-2">Project Details</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {portfolioProjects[0].tags.map((tag) => (
                                            <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {portfolioProjects[0].testimonial && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="italic text-gray-600">"{portfolioProjects[0].testimonial}"</p>
                                        {portfolioProjects[0].clientName && (
                                            <p className="text-sm text-gray-500 mt-2">— {portfolioProjects[0].clientName}</p>
                                        )}
                                    </div>
                                )}

                                <Link
                                    href={`/portfolio/${portfolioProjects[0].id}`}
                                    className="mt-8 inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors"
                                >
                                    View Project Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 