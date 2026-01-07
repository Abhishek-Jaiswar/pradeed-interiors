import Link from 'next/link';

async function getDesignIdeas() {
    // Use mock API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/design-ideas/mock`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch design ideas');
    }

    const data = await response.json();
    return data.data;
}

export default async function DesignIdeasPage() {
    let designIdeasData;
    let error = null;

    try {
        designIdeasData = await getDesignIdeas();
    } catch (err) {
        error = 'Failed to load design ideas. Please try again later.';
        designIdeasData = { designIdeas: [], pagination: { total: 0 } };
    }

    const { designIdeas, pagination } = designIdeasData || { designIdeas: [], pagination: { total: 0 } };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Design Ideas & Inspiration</h1>

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                    {error}
                </div>
            )}

            <div className="mb-8">
                <p className="text-gray-600">
                    Discover fresh design inspiration for your home
                </p>
            </div>

            {/* Categories Filter */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                    <Link href="/design-ideas" className="px-4 py-2 bg-primary text-white rounded-full text-sm">
                        All
                    </Link>
                    <Link href="/design-ideas/category/living-room" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                        Living Room
                    </Link>
                    <Link href="/design-ideas/category/bedroom" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                        Bedroom
                    </Link>
                    <Link href="/design-ideas/category/kitchen" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                        Kitchen
                    </Link>
                    <Link href="/design-ideas/category/home-office" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                        Home Office
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {designIdeas.map((idea: any) => (
                    <Link
                        href={`/design-ideas/article/${idea.id}`}
                        key={idea.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="h-56 bg-gray-200 relative">
                            <img
                                src={idea.image}
                                alt={idea.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 bg-primary text-white px-3 py-1 text-sm">
                                {idea.category}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="font-bold text-xl mb-2">{idea.title}</h3>
                            <p className="text-gray-700 mb-4 line-clamp-2">{idea.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {idea.tags.map((tag: string) => (
                                    <span key={tag} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {designIdeas.length === 0 && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No design ideas found</p>
                </div>
            )}
        </div>
    );
} 