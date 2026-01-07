import Link from 'next/link';

async function getProducts() {
    // Use our new API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/shop/products`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return await response.json();
}

export default async function ShopPage() {
    let productsData;
    let error = null;

    try {
        productsData = await getProducts();
    } catch (err) {
        error = 'Failed to load products. Please try again later.';
        productsData = { products: [], pagination: { total: 0 } };
    }

    const { products, pagination } = productsData || { products: [], pagination: { total: 0 } };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Shop Our Collection</h1>

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                    {error}
                </div>
            )}

            <div className="mb-8">
                <p className="text-gray-600">
                    Showing {products.length} of {pagination.total} products
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-200 relative">
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    No image available
                                </div>
                            )}
                            {!product.inStock && (
                                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                                    Out of Stock
                                </div>
                            )}
                            {product.discount > 0 && (
                                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs rounded">
                                    {product.discount}% OFF
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    {product.discount > 0 ? (
                                        <div className="flex items-center">
                                            <span className="text-gray-500 line-through mr-2">
                                                ${Number(product.price).toFixed(2)}
                                            </span>
                                            <span className="text-red-600 font-semibold">
                                                ${Number(product.price * (1 - product.discount / 100)).toFixed(2)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="font-semibold">
                                            ${Number(product.price).toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {product.rating > 0 && (
                                    <div className="flex items-center">
                                        <span className="text-yellow-500 mr-1">★</span>
                                        <span>{product.rating.toFixed(1)}</span>
                                    </div>
                                )}
                            </div>

                            <Link href={`/shop/product/${product.id}`} className="block mt-3 text-center bg-primary text-white py-2 rounded hover:bg-accent transition-colors">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No products found</p>
                </div>
            )}
        </div>
    );
} 