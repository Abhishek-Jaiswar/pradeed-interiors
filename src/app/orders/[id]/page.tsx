'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, Download, Share2 } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real application, you would fetch the order from your API
    // For now, we'll use mock data
    const fetchOrder = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock order data
        if (orderId) {
          const mockOrder: Order = {
            id: orderId,
            date: '2025-03-15',
            status: 'shipped',
            items: [
              {
                id: 'prod-1',
                name: 'Modern Sofa Set',
                price: 45000,
                quantity: 1,
                image: '/placeholder-product.jpg'
              },
              {
                id: 'prod-2',
                name: 'Coffee Table',
                price: 12000,
                quantity: 1,
                image: '/placeholder-product.jpg'
              }
            ],
            subtotal: 57000,
            tax: 10260, // 18% GST
            shipping: 0,
            total: 67260,
            paymentMethod: 'Credit Card (**** 1234)',
            shippingAddress: {
              fullName: 'John Doe',
              addressLine1: '123 Main Street',
              addressLine2: 'Apartment 4B',
              city: 'Mumbai',
              state: 'Maharashtra',
              postalCode: '400001',
              country: 'India',
              phone: '+91 9876543210'
            },
            trackingNumber: 'TRK12345678IN',
            estimatedDelivery: '2025-03-25'
          };
          
          setOrder(mockOrder);
        } else {
          setError('Order ID is missing');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'processing':
        return <Package className="h-6 w-6 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDescription = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Your order has been placed and is awaiting confirmation.';
      case 'processing':
        return 'Your order is being processed and prepared for shipping.';
      case 'shipped':
        return 'Your order has been shipped and is on its way to you.';
      case 'delivered':
        return 'Your order has been delivered successfully.';
      case 'cancelled':
        return 'Your order has been cancelled.';
      default:
        return '';
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-medium mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error || "We couldn't find the order you're looking for."}
          </p>
          <Link href="/orders" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <Link href="/orders" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Order {order.id}</h1>
              <p className="text-gray-600">Placed on {formatDate(order.date)}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-gray-700" title="Download Invoice">
                  <Download className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700" title="Share Order">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Status */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex items-start gap-4">
            {getStatusIcon(order.status)}
            <div>
              <h2 className="text-lg font-medium">
                {order.status === 'shipped' ? 'Your order is on its way!' : 
                 order.status === 'delivered' ? 'Your order has been delivered!' :
                 order.status === 'cancelled' ? 'Your order has been cancelled' :
                 'Order Status: ' + order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </h2>
              <p className="text-gray-600 mt-1">{getStatusDescription(order.status)}</p>
              
              {order.status === 'shipped' && order.trackingNumber && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Tracking Number: {order.trackingNumber}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Estimated Delivery: {formatDate(order.estimatedDelivery || '')}
                  </p>
                  <button className="mt-2 text-primary hover:text-primary/80 text-sm font-medium">
                    Track Package
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium mb-4">Items in Your Order</h2>
          
          <div className="space-y-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-start">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={item.image || '/placeholder-product.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                
                <div className="ml-4 flex-1">
                  <h3 className="text-base font-medium">
                    <Link href={`/shop/product/${item.id}`} className="hover:text-primary">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-base font-medium">₹{item.price.toLocaleString()}</p>
                  <p className="mt-1 text-sm text-gray-500">per item</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">{order.shippingAddress.phone}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Payment Information</h2>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="font-medium">Payment Method</p>
                <p className="mb-4">{order.paymentMethod}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping.toLocaleString()}`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span>₹{order.tax.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium mb-4">Need Help With Your Order?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/contact?subject=Order%20Inquiry" 
            className="block p-4 border rounded-md hover:border-primary hover:bg-gray-50 transition"
          >
            <h3 className="font-medium mb-2">Contact Customer Service</h3>
            <p className="text-sm text-gray-600">Have questions about your order?</p>
          </Link>
          
          <Link 
            href="/returns" 
            className="block p-4 border rounded-md hover:border-primary hover:bg-gray-50 transition"
          >
            <h3 className="font-medium mb-2">Returns & Exchanges</h3>
            <p className="text-sm text-gray-600">Learn about our return policy</p>
          </Link>
          
          <Link 
            href="/faq" 
            className="block p-4 border rounded-md hover:border-primary hover:bg-gray-50 transition"
          >
            <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
            <p className="text-sm text-gray-600">Find answers to common questions</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
