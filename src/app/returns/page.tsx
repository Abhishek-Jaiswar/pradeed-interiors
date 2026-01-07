'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package, RefreshCw, CreditCard, HelpCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Returns & Exchanges</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <p className="text-lg text-gray-700 mb-4">
              At Pradeep Interior, we want you to be completely satisfied with your purchase. 
              We understand that sometimes you may need to return or exchange an item, and we've 
              made the process as simple as possible.
            </p>
            <p className="text-lg text-gray-700">
              Please review our return policy below to understand your options.
            </p>
          </div>
          
          {/* Return Policy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 border-b">
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">30-Day Return Period</h3>
                <p className="text-gray-600 text-sm">
                  You have 30 days from the date of delivery to initiate a return or exchange.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Original Packaging</h3>
                <p className="text-gray-600 text-sm">
                  Items should be returned in their original packaging with all accessories and tags.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Refund Options</h3>
                <p className="text-gray-600 text-sm">
                  Refunds are processed to the original payment method or as store credit.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Customer Support</h3>
                <p className="text-gray-600 text-sm">
                  Our team is available to assist you with any questions about returns or exchanges.
                </p>
              </div>
            </div>
          </div>
          
          {/* Return Process */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold mb-4">Return Process</h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-2">Initiate Your Return</h3>
                  <p className="text-gray-600 mb-2">
                    Log in to your account and go to your order history. Select the order and item(s) 
                    you wish to return and follow the prompts to initiate the return process.
                  </p>
                  <p className="text-gray-600">
                    Alternatively, you can contact our customer service team at 
                    <a href="mailto:returns@pradeepinterior.com" className="text-primary hover:underline ml-1">
                      returns@pradeepinterior.com
                    </a> 
                    or call us at <a href="tel:+919876543210" className="text-primary hover:underline">+91 987-654-3210</a>.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-2">Package Your Return</h3>
                  <p className="text-gray-600">
                    Pack the item(s) securely in their original packaging, including all accessories, 
                    manuals, and tags. Include the return form or order number in the package.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-2">Ship Your Return</h3>
                  <p className="text-gray-600">
                    For small items, you can use the prepaid shipping label provided during the return 
                    initiation process. For larger items, our team will arrange a pickup at your convenience.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mr-4">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-2">Receive Your Refund</h3>
                  <p className="text-gray-600">
                    Once we receive and inspect your return, we'll process your refund. Refunds typically 
                    take 5-7 business days to appear on your statement, depending on your payment provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Return Policy Details */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold mb-4">Return Policy Details</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Eligible Items</h3>
                <p className="text-gray-600">
                  Most items purchased from Pradeep Interior can be returned within 30 days of delivery, 
                  provided they are in their original condition and packaging.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Non-Returnable Items</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Custom-made or personalized items</li>
                  <li>Items marked as final sale or clearance</li>
                  <li>Gift cards</li>
                  <li>Items that have been used, assembled, or show signs of wear</li>
                  <li>Items missing original packaging, accessories, or assembly instructions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Return Shipping Costs</h3>
                <p className="text-gray-600">
                  For returns due to customer preference (not defective or damaged items), a shipping fee 
                  may be deducted from your refund. For defective or damaged items, return shipping is free.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Exchanges</h3>
                <p className="text-gray-600">
                  If you wish to exchange an item for a different color, size, or style, please initiate 
                  a return and place a new order for the desired item to ensure faster processing.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Refund Methods</h3>
                <p className="text-gray-600">
                  Refunds will be issued to the original payment method used for the purchase. If the 
                  original payment method is unavailable, we'll issue a store credit.
                </p>
              </div>
            </div>
          </div>
          
          {/* Damaged or Defective Items */}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Damaged or Defective Items</h2>
            
            <p className="text-gray-600 mb-4">
              If you receive a damaged or defective item, please contact us within 48 hours of delivery. 
              We'll arrange for a replacement or refund at no additional cost to you.
            </p>
            
            <p className="text-gray-600 mb-4">
              Please take photos of the damaged item and packaging to help us process your claim more efficiently.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="font-medium text-yellow-800 mb-2">Important Note</h3>
              <p className="text-yellow-700 text-sm">
                For large furniture items, please inspect the item upon delivery and note any damage on 
                the delivery receipt before signing. This will help expedite the replacement or refund process.
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
          </div>
          
          <div className="divide-y">
            <div className="p-6">
              <h3 className="font-medium mb-2">How long do I have to return an item?</h3>
              <p className="text-gray-600">
                You have 30 days from the date of delivery to initiate a return or exchange.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="font-medium mb-2">How long does it take to process a refund?</h3>
              <p className="text-gray-600">
                Once we receive your return, it typically takes 1-2 business days to process. After 
                processing, it may take an additional 5-7 business days for the refund to appear on 
                your statement, depending on your payment provider.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="font-medium mb-2">Can I return a gift?</h3>
              <p className="text-gray-600">
                Yes, gifts can be returned. You'll need the order number or gift receipt. Refunds for 
                gifts will be issued as store credit unless the original purchaser authorizes a refund 
                to their payment method.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="font-medium mb-2">What if my item is damaged during shipping?</h3>
              <p className="text-gray-600">
                Contact us within 48 hours of delivery with photos of the damaged item and packaging. 
                We'll arrange for a replacement or refund at no additional cost to you.
              </p>
            </div>
            
            <div className="p-6">
              <h3 className="font-medium mb-2">Do you offer free return shipping?</h3>
              <p className="text-gray-600">
                Return shipping is free for defective or damaged items. For returns due to customer 
                preference, a shipping fee may be deducted from your refund.
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Need More Help?</h2>
            
            <p className="text-gray-600 mb-6">
              Our customer service team is here to assist you with any questions about returns or exchanges.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/contact?subject=Returns%20Inquiry" 
                className="flex items-center justify-between bg-primary/5 hover:bg-primary/10 text-primary p-4 rounded-md transition"
              >
                <span className="font-medium">Contact Customer Service</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link 
                href="/faq" 
                className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-4 rounded-md transition"
              >
                <span className="font-medium">View All FAQs</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
