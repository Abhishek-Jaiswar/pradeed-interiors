'use client';

import Link from 'next/link';
import { useProducts } from '@/hooks/query/useProducts';

export default function ShopPage() {
    const { data, isLoading, error } = useProducts();

    const products = data?.products || [];
    const pagination = data?.pagination || { total: 0 };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading our collection...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                    Failed to load products. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Shop Our Collection</h1>

            <div className="mb-8">
                <p className="text-gray-600">
                    Showing {products.length} of {pagination.total} products
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: any) => (
                    <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-200 relative">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[0]}
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
                            {product.salePrice && product.salePrice < product.price && (
                                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs rounded">
                                    SALE
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    {product.salePrice && product.salePrice < product.price ? (
                                        <div className="flex items-center">
                                            <span className="text-gray-500 line-through mr-2">
                                                ₹{Number(product.price).toLocaleString('en-IN')}
                                            </span>
                                            <span className="text-red-600 font-semibold">
                                                ₹{Number(product.salePrice).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="font-semibold">
                                            ₹{Number(product.price).toLocaleString('en-IN')}
                                        </span>
                                    )}
                                </div>

                                {product.avgRating > 0 && (
                                    <div className="flex items-center">
                                        <span className="text-yellow-500 mr-1">★</span>
                                        <span>{product.avgRating.toFixed(1)}</span>
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

            {products.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No products found</p>
                </div>
            )}
        </div>
    );
}