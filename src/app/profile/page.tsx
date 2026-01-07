'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { User, Package, Heart, LogOut, Edit2, Camera } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  image?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // In a real application, you would fetch user profile from your API
    // For now, we'll use mock data from localStorage
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser({
            name: 'John Doe', // Mock data
            email: parsedUser.email || 'john.doe@example.com',
            image: '/placeholder-avatar.jpg'
          });
        } else {
          // Redirect to sign in if no user is found
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Redirect to home page
    router.push('/');
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

  if (!user) {
    return null; // Will redirect to sign in
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="relative h-24 w-24 rounded-full overflow-hidden">
                  <Image
                    src={user.image || '/placeholder-avatar.jpg'}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600 mb-6">{user.email}</p>
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center text-red-600 hover:text-red-800 transition"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
            
            <div className="mt-8">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center p-3 rounded-md ${
                    activeTab === 'profile' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center p-3 rounded-md ${
                    activeTab === 'orders' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5 mr-3" />
                  Orders
                </button>
                
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center p-3 rounded-md ${
                    activeTab === 'wishlist' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="h-5 w-5 mr-3" />
                  Wishlist
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <button className="flex items-center text-primary hover:text-primary/80">
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                    <p>{user.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                    <p>{user.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                    <p>+91 9876543210</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Addresses</h2>
                    <button className="flex items-center text-primary hover:text-primary/80">
                      <Edit2 className="h-4 w-4 mr-1" />
                      Add New Address
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Home</h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                      </div>
                      <p className="text-gray-600 mt-2">
                        123 Main Street<br />
                        Apartment 4B<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </p>
                      <div className="mt-4 flex space-x-4">
                        <button className="text-sm text-primary hover:text-primary/80">Edit</button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">Remove</button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Office</h3>
                      </div>
                      <p className="text-gray-600 mt-2">
                        456 Business Park<br />
                        Building C, Floor 5<br />
                        Mumbai, Maharashtra 400051<br />
                        India
                      </p>
                      <div className="mt-4 flex space-x-4">
                        <button className="text-sm text-primary hover:text-primary/80">Edit</button>
                        <button className="text-sm text-primary hover:text-primary/80">Set as Default</button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Password & Security</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="text-primary hover:text-primary/80">Change Password</button>
                    <button className="text-primary hover:text-primary/80">Two-Factor Authentication</button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">My Orders</h2>
                
                <div className="space-y-4">
                  <Link href="/orders" className="block w-full">
                    <div className="border border-gray-200 rounded-md p-4 hover:border-primary transition">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">View All Orders</h3>
                        <span className="text-primary">
                          <Package className="h-5 w-5" />
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">
                        Track, manage, and view all your past and current orders
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-6">
                    Browse our collection and add items to your wishlist
                  </p>
                  <Link 
                    href="/shop" 
                    className="inline-block bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
