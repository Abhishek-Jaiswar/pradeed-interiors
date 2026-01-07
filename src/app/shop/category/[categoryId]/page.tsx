'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Filter, ChevronDown, Grid, List, Sliders } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  categories: string[];
}

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');

  // Materials filter options
  const materialOptions = [
    'Wood', 'Metal', 'Glass', 'Fabric', 'Leather', 'Marble', 'Plastic'
  ];

  useEffect(() => {
    // In a real application, you would fetch products and category info from your API
    // For now, we'll use mock data
    const fetchCategoryAndProducts = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock category data
        const categoryData: CategoryInfo = {
          id: categorySlug,
          name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace('-', ' '),
          description: `Explore our collection of high-quality ${categorySlug.replace('-', ' ')} designed to enhance your living space.`,
          image: '/placeholder-category.jpg'
        };
        
        // Mock products data
        const productsData: Product[] = Array.from({ length: 12 }, (_, i) => ({
          id: `prod-${categorySlug}-${i + 1}`,
          name: `${categoryData.name} Item ${i + 1}`,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          price: 5000 + Math.floor(Math.random() * 50000),
          salePrice: Math.random() > 0.7 ? 4000 + Math.floor(Math.random() * 40000) : undefined,
          images: ['/placeholder-product.jpg'],
          categories: [categorySlug]
        }));
        
        setCategory(categoryData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [categorySlug]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange as [number, number];
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const sortProducts = (products: Product[]) => {
    switch (sortOption) {
      case 'price-low':
        return [...products].sort((a, b) => 
          (a.salePrice || a.price) - (b.salePrice || b.price)
        );
      case 'price-high':
        return [...products].sort((a, b) => 
          (b.salePrice || b.price) - (a.salePrice || a.price)
        );
      case 'newest':
        return [...products].sort((a, b) => 0.5 - Math.random()); // Mock sorting
      default:
        return products;
    }
  };

  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      const price = product.salePrice || product.price;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      
      // In a real app, you'd have material data for each product
      // For now, we'll just pretend all products match if no materials are selected
      const matchesMaterial = selectedMaterials.length === 0 || 
        selectedMaterials.some(m => Math.random() > 0.3); // Mock filtering
      
      return matchesPrice && matchesMaterial;
    });
  };

  const displayedProducts = sortProducts(filterProducts(products));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Category Not Found</h1>
        <p className="mb-8">The category you're looking for doesn't exist.</p>
        <Link href="/shop" className="text-primary hover:text-primary/80">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Category Header */}
      <div className="mb-12">
        {category.image && (
          <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">{category.name}</h1>
            </div>
          </div>
        )}
        
        {!category.image && (
          <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        )}
        
        <p className="text-gray-600">{category.description}</p>
      </div>
      
      {/* Filters and Sort */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <button 
            onClick={toggleFilters}
            className="flex items-center text-gray-700 hover:text-primary"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Min</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Max</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {materialOptions.map((material) => (
                    <label 
                      key={material} 
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                        selectedMaterials.includes(material)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(material)}
                        onChange={() => handleMaterialChange(material)}
                        className="sr-only"
                      />
                      {material}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => {
                  setPriceRange([0, 100000]);
                  setSelectedMaterials([]);
                }}
                className="text-primary hover:text-primary/80 text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Product Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>
      
      {/* Products Grid/List */}
      {displayedProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-medium mb-4">No products found</h2>
          <p className="text-gray-600 mb-8">Try adjusting your filters to find what you're looking for.</p>
          <button 
            onClick={() => {
              setPriceRange([0, 100000]);
              setSelectedMaterials([]);
            }}
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/shop/product/${product.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                {product.salePrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Sale
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-primary font-bold">₹{product.salePrice.toLocaleString()}</span>
                      <span className="text-gray-400 line-through ml-2 text-sm">₹{product.price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-primary font-bold">₹{product.price.toLocaleString()}</span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {displayedProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/shop/product/${product.id}`}
              className="group flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-64 md:h-auto md:w-1/4">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                {product.salePrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Sale
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-1">
                <h3 className="font-medium text-xl mb-2 group-hover:text-primary transition">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-4">
                  {product.salePrice ? (
                    <>
                      <span className="text-primary font-bold text-lg">₹{product.salePrice.toLocaleString()}</span>
                      <span className="text-gray-400 line-through ml-2">₹{product.price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-primary font-bold text-lg">₹{product.price.toLocaleString()}</span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
