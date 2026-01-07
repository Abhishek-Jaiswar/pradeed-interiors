'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, ShoppingCart, Heart, Share2, Minus, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  categories: string[];
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  reviews: {
    id: string;
    user: {
      name: string;
      image: string;
    };
    rating: number;
    comment: string;
    date: string;
  }[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  useEffect(() => {
    // In a real application, you would fetch product data from your API
    // For now, we'll use mock data
    const fetchProduct = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock product data
        const productData: Product = {
          id: productId,
          name: 'Modern Minimalist Sofa',
          description: 'This elegant modern sofa combines comfort with minimalist design. Perfect for contemporary living spaces, it features high-quality upholstery and a sturdy frame that will stand the test of time.',
          price: 45000,
          salePrice: 39999,
          images: [
            '/placeholder-product-1.jpg',
            '/placeholder-product-2.jpg',
            '/placeholder-product-3.jpg',
            '/placeholder-product-4.jpg',
          ],
          categories: ['furniture', 'living-room', 'sofas'],
          features: [
            'Premium quality fabric upholstery',
            'Solid wood frame for durability',
            'High-density foam cushions for comfort',
            'Stain-resistant fabric treatment',
            'Available in multiple colors (contact for options)'
          ],
          specifications: {
            'Dimensions': '220cm × 90cm × 85cm (W×D×H)',
            'Weight': '45kg',
            'Material': 'Solid wood frame, high-density foam, premium fabric',
            'Assembly': 'Minimal assembly required',
            'Warranty': '3 years on frame, 1 year on upholstery'
          },
          stock: 15,
          reviews: Array.from({ length: 8 }, (_, i) => ({
            id: `review-${i + 1}`,
            user: {
              name: `Customer ${i + 1}`,
              image: '/placeholder-avatar.jpg'
            },
            rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5
            comment: 'This sofa exceeded my expectations! The quality is excellent, and it looks even better in person than in the photos. Very comfortable and fits perfectly in my living room.',
            date: new Date(Date.now() - Math.random() * 10000000000).toISOString()
          }))
        };
        
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (value: number) => {
    if (product && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const calculateAverageRating = (reviews: Product['reviews']) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist.</p>
        <Link href="/shop" className="text-primary hover:text-primary/80">
          Return to Shop
        </Link>
      </div>
    );
  }

  const averageRating = calculateAverageRating(product.reviews);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        {product.categories.length > 0 && (
          <>
            <Link href={`/shop/category/${product.categories[0]}`} className="hover:text-primary">
              {product.categories[0].charAt(0).toUpperCase() + product.categories[0].slice(1).replace('-', ' ')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
          </>
        )}
        <span className="text-gray-800">{product.name}</span>
      </div>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div>
          <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
            <Image
              src={product.images[activeImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative h-24 rounded-md overflow-hidden border-2 ${
                  index === activeImageIndex ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {averageRating.toFixed(1)} ({product.reviews.length} reviews)
            </span>
          </div>
          
          <div className="mb-6">
            {product.salePrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-primary">₹{product.salePrice.toLocaleString()}</span>
                <span className="ml-3 text-xl text-gray-500 line-through">₹{product.price.toLocaleString()}</span>
                <span className="ml-3 bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                  {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
            )}
            <p className="text-green-600 mt-2">In Stock ({product.stock} available)</p>
          </div>
          
          <p className="text-gray-600 mb-8">{product.description}</p>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-8">
            <span className="mr-4 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="px-3 py-2 text-gray-500 hover:text-primary disabled:opacity-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="px-3 py-2 text-gray-500 hover:text-primary disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex-1 bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button className="flex-1 border border-gray-300 py-3 px-6 rounded-md hover:bg-gray-50 flex items-center justify-center">
              <Heart className="h-5 w-5 mr-2" />
              Add to Wishlist
            </button>
            <button className="sm:flex-initial border border-gray-300 py-3 px-6 rounded-md hover:bg-gray-50 flex items-center justify-center">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          
          {/* Categories */}
          <div className="mb-4">
            <span className="font-medium">Categories: </span>
            {product.categories.map((category, index) => (
              <span key={category}>
                <Link
                  href={`/shop/category/${category}`}
                  className="text-primary hover:underline"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </Link>
                {index < product.categories.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200 mb-8">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === 'description'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Description & Features
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === 'specifications'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviews ({product.reviews.length})
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div>
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div>
              <p className="mb-6">{product.description}</p>
              
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className="border rounded-lg overflow-hidden">
              {Object.entries(product.specifications).map(([key, value], index, arr) => (
                <div
                  key={key}
                  className={`grid grid-cols-3 px-6 py-4 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } ${index === arr.length - 1 ? '' : 'border-b border-gray-200'}`}
                >
                  <span className="font-medium">{key}</span>
                  <span className="col-span-2">{value}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 ${
                          star <= Math.round(averageRating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-3 text-lg font-medium">
                    {averageRating.toFixed(1)} out of 5
                  </span>
                </div>
                <p className="text-gray-600">Based on {product.reviews.length} reviews</p>
              </div>
              
              <div className="space-y-8">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-8">
                    <div className="flex items-center mb-4">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                        <Image
                          src={review.user.image}
                          alt={review.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.user.name}</h4>
                        <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link
                  href="#"
                  className="inline-block bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90"
                >
                  Write a Review
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }, (_, i) => (
            <Link key={i} href={`/shop/product/related-${i + 1}`} className="group">
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/placeholder-product.jpg"
                  alt={`Related Product ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                {i % 2 === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    SALE
                  </div>
                )}
              </div>
              <h3 className="font-medium mb-2 group-hover:text-primary transition">
                {['Modern Coffee Table', 'Accent Chair', 'Floor Lamp', 'Decorative Cushion'][i]}
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">
                  ₹{(12000 + i * 5000).toLocaleString()}
                </span>
                {i % 2 === 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{(15000 + i * 5000).toLocaleString()}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
