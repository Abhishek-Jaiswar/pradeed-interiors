'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ChevronRight } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface PaymentDetails {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
  });
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Load cart items from localStorage
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (parsedCart.length === 0) {
            // Redirect to cart if empty
            router.push('/cart');
            return;
          }
          setCartItems(parsedCart);
        } else {
          // Redirect to cart if no cart exists
          router.push('/cart');
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [router]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    // Simple shipping calculation based on subtotal
    const subtotal = calculateSubtotal();
    return subtotal > 10000 ? 0 : 499;
  };

  const calculateTax = () => {
    // Simple tax calculation (18% GST)
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isShippingFormValid = () => {
    const { fullName, addressLine1, city, state, postalCode, country, phone } = shippingAddress;
    return fullName && addressLine1 && city && state && postalCode && country && phone;
  };

  const isPaymentFormValid = () => {
    const { cardNumber, nameOnCard, expiryDate, cvv } = paymentDetails;
    return cardNumber && nameOnCard && expiryDate && cvv;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && isShippingFormValid()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isPaymentFormValid()) {
      placeOrder();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const placeOrder = async () => {
    try {
      // In a real application, you would send this data to your backend
      // For now, we'll simulate a successful order
      
      // Generate a random order ID
      const newOrderId = 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setOrderId(newOrderId);
      
      // Clear the cart
      localStorage.removeItem('cart');
      
      // Show order confirmation
      setOrderPlaced(true);
      
      // In a real app, you would also store the order in your database
    } catch (error) {
      console.error('Error placing order:', error);
    }
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

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. Your order number is <span className="font-semibold">{orderId}</span>.
            </p>
            <p className="text-gray-600 mb-8">
              We've sent a confirmation email with your order details.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/orders" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition">
                View My Orders
              </Link>
              <Link href="/" className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center h-10 w-10 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <div className={`h-1 flex-1 mx-2 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center h-10 w-10 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <div className={`h-1 flex-1 mx-2 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center h-10 w-10 rounded-full ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="font-medium">Shipping</span>
          <span className="font-medium">Payment</span>
          <span className="font-medium">Confirmation</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {currentStep === 1 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleShippingChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={shippingAddress.addressLine1}
                      onChange={handleShippingChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={shippingAddress.addressLine2}
                      onChange={handleShippingChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleShippingChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleShippingChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={handleShippingChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleShippingChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleShippingChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={paymentDetails.nameOnCard}
                      onChange={handlePaymentChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Billing Address</h3>
                  <p className="text-gray-600">
                    {shippingAddress.fullName}<br />
                    {shippingAddress.addressLine1}<br />
                    {shippingAddress.addressLine2 && `${shippingAddress.addressLine2}<br />`}
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}<br />
                    {shippingAddress.country}<br />
                    {shippingAddress.phone}
                  </p>
                </div>
              </div>
            )}
            
            <div className="p-6 border-t flex justify-between">
              {currentStep > 1 ? (
                <button 
                  onClick={handlePreviousStep}
                  className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50 transition"
                >
                  Back
                </button>
              ) : (
                <Link 
                  href="/cart"
                  className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50 transition"
                >
                  Return to Cart
                </Link>
              )}
              
              <button 
                onClick={handleNextStep}
                disabled={currentStep === 1 && !isShippingFormValid() || currentStep === 2 && !isPaymentFormValid()}
                className={`flex items-center bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition ${
                  (currentStep === 1 && !isShippingFormValid()) || (currentStep === 2 && !isPaymentFormValid())
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {currentStep === 2 ? 'Place Order' : 'Continue'}
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="max-h-80 overflow-y-auto mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start py-4 border-b">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  
                  <p className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{calculateSubtotal().toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {calculateShipping() === 0 ? 'Free' : `₹${calculateShipping().toLocaleString()}`}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18% GST)</span>
                <span className="font-medium">₹{calculateTax().toLocaleString()}</span>
              </div>
              
              <div className="border-t pt-4 flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
