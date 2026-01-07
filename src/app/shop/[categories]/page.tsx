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
  const categories = params.categories as string;
  
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
          id: categories,
          name: categories.charAt(0).toUpperCase() + categories.slice(1).replace('-', ' '),
          description: `Explore our collection of high-quality ${categories.replace('-', ' ')} designed to enhance your living space.`,
          image: '/placeholder-category.jpg'
        };
        
        // Mock products data
        const productsData: Product[] = Array.from({ length: 12 }, (_, i) => ({
          id: `prod-${categories}-${i + 1}`,
          name: `${categoryData.name} Item ${i + 1}`,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          price: 5000 + Math.floor(Math.random() * 50000),
          salePrice: Math.random() > 0.7 ? 4000 + Math.floor(Math.random() * 40000) : undefined,
          images: ['/placeholder-product.jpg'],
          categories: [categories]
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
  }, [categories]);

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
            <div className="flex items-center border rounded-md overflow-hidden">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="text-gray-700 mr-2">Sort:</label>
              <select 
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border rounded-md p-2"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="100000" 
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full"
                    />
                    <input 
                      type="range" 
                      min="0" 
                      max="100000" 
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-4">
                    <input 
                      type="number" 
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full p-2 border rounded-md"
                    />
                    <input 
                      type="number" 
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              {/* Materials Filter */}
              <div>
                <h3 className="font-medium mb-4">Materials</h3>
                <div className="space-y-2">
                  {materialOptions.map((material) => (
                    <label key={material} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(material)}
                        onChange={() => handleMaterialChange(material)}
                        className="mr-2"
                      />
                      {material}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Additional Filters Placeholder */}
              <div>
                <h3 className="font-medium mb-4">More Filters</h3>
                <div className="flex items-center justify-center h-full">
                  <button className="flex items-center text-primary hover:text-primary/80">
                    <Sliders className="h-5 w-5 mr-2" />
                    Advanced Filters
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-4">
              <button 
                onClick={() => {
                  setPriceRange([0, 100000]);
                  setSelectedMaterials([]);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Reset Filters
              </button>
              <button 
                onClick={toggleFilters}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Apply Filters
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Sale
                  </span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition">
                  {product.name}
                </h3>
                
                <div className="flex items-center">
                  {product.salePrice ? (
                    <>
                      <span className="text-lg font-bold text-primary">
                        ₹{product.salePrice.toLocaleString()}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {displayedProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative h-64 md:h-auto md:w-64 flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.salePrice && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Sale
                    </span>
                  )}
                </div>
                
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-medium mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-4">
                    {product.salePrice ? (
                      <>
                        <span className="text-xl font-bold text-primary">
                          ₹{product.salePrice.toLocaleString()}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-primary">
                        ₹{product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {product.description}
                  </p>
                  
                  <Link 
                    href={`/shop/product/${product.id}`}
                    className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
