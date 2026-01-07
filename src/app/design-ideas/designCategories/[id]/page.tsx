'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishDate: string;
  readTime: number;
  author: {
    name: string;
    image: string;
  };
  tags: string[];
}

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export default function DesignIdeasCategoryPage() {
  const params = useParams();
  const categorySlug = params.categories as string;
  console.log(categorySlug);
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Tags filter options
  const tagOptions = [
    'Modern', 'Traditional', 'Minimalist', 'Industrial', 'Scandinavian', 
    'Bohemian', 'Mid-Century', 'Contemporary', 'Rustic', 'Transitional'
  ];

  useEffect(() => {
    // In a real application, you would fetch articles and category info from your API
    // For now, we'll use mock data
    const fetchCategoryAndArticles = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock category data
        const categoryData: CategoryInfo = {
          id: categorySlug,
          name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace('-', ' '),
          description: `Explore our collection of design ideas and inspiration for ${categorySlug.replace('-', ' ')}.`,
          image: '/placeholder-category.jpg'
        };
        
        // Mock articles data
        const articlesData: Article[] = Array.from({ length: 9 }, (_, i) => ({
          id: `article-${categorySlug}-${i + 1}`,
          title: `${i + 1} Amazing ${categoryData.name} Ideas for Your Home`,
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          category: categorySlug,
          coverImage: '/placeholder-article.jpg',
          publishDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
          readTime: 5 + Math.floor(Math.random() * 10),
          author: {
            name: 'Pradeep Kumar',
            image: '/placeholder-avatar.jpg'
          },
          tags: Array.from(
            { length: 2 + Math.floor(Math.random() * 3) }, 
            () => tagOptions[Math.floor(Math.random() * tagOptions.length)]
          )
        }));
        
        setCategory(categoryData);
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryAndArticles();
  }, [categorySlug]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => article.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

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
        <Link href="/design-ideas" className="text-primary hover:text-primary/80">
          Return to Design Ideas
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
              <h1 className="text-4xl font-bold text-white">{category.name} Ideas</h1>
            </div>
          </div>
        )}
        
        {!category.image && (
          <h1 className="text-3xl font-bold mb-4">{category.name} Ideas</h1>
        )}
        
        <p className="text-gray-600">{category.description}</p>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <button 
            onClick={toggleFilters}
            className="flex items-center text-gray-700 hover:text-primary"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filter by Tags
            <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-medium mb-4">Filter by Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <label 
                  key={tag} 
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="sr-only"
                  />
                  {tag}
                </label>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setSelectedTags([])}
                className="text-primary hover:text-primary/80 text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Article Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
        </p>
      </div>
      
      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-medium mb-4">No articles found</h2>
          <p className="text-gray-600 mb-8">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedTags([]);
            }}
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Link 
              key={article.id} 
              href={`/design-ideas/article/${article.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={article.author.image}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">{article.author.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(article.publishDate)} · {article.readTime} min read
                    </p>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
