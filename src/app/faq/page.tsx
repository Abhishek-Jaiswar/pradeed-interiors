'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  name: string;
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  // FAQ Categories
  const categories: FAQCategory[] = [
    { id: 'all', name: 'All FAQs' },
    { id: 'products', name: 'Products & Services' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'account', name: 'Account & Payment' },
    { id: 'consultation', name: 'Design Consultation' }
  ];

  // FAQ Items
  const faqItems: FAQItem[] = [
    // Products & Services
    {
      question: 'What types of furniture do you offer?',
      answer: 'We offer a wide range of furniture including living room, bedroom, dining room, office, and outdoor furniture. Our collection includes sofas, chairs, tables, beds, wardrobes, and more. We also offer custom furniture design services to meet your specific needs.',
      category: 'products'
    },
    {
      question: 'Do you offer interior design services?',
      answer: 'Yes, we offer comprehensive interior design services. Our team of experienced designers can help you with space planning, color schemes, furniture selection, and complete home makeovers. You can book a consultation through our website or visit our showroom.',
      category: 'products'
    },
    {
      question: 'Are your products eco-friendly?',
      answer: 'Many of our products are made with sustainable materials and eco-friendly manufacturing processes. We have a dedicated "Green Collection" that features furniture made from recycled materials, sustainably harvested wood, and non-toxic finishes. Look for the eco-friendly badge on product pages.',
      category: 'products'
    },
    {
      question: 'Can I request custom furniture?',
      answer: 'Absolutely! We specialize in custom furniture design and manufacturing. You can work with our design team to create furniture that perfectly fits your space, style, and functional requirements. Contact us to discuss your custom furniture needs.',
      category: 'products'
    },
    
    // Orders & Shipping
    {
      question: 'How long will it take to receive my order?',
      answer: 'Delivery times vary depending on the product and your location. In-stock items typically ship within 2-3 business days and are delivered within 5-7 business days. Custom or made-to-order items may take 4-6 weeks. You will receive an estimated delivery date at checkout and tracking information once your order ships.',
      category: 'orders'
    },
    {
      question: 'Do you offer assembly services?',
      answer: 'Yes, we offer professional assembly services for an additional fee. You can add this service during checkout. Our trained technicians will deliver and assemble your furniture, ensuring it\'s properly set up and ready to use.',
      category: 'orders'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes, once your order ships, you will receive a tracking number via email. You can also track your order by logging into your account on our website and viewing your order history.',
      category: 'orders'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within India. We\'re working on expanding our shipping capabilities to other countries in the future.',
      category: 'orders'
    },
    
    // Returns & Refunds
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in their original condition and packaging. Custom or personalized items cannot be returned unless they\'re defective. Please visit our Returns page for complete details.',
      category: 'returns'
    },
    {
      question: 'How do I initiate a return?',
      answer: 'To initiate a return, log into your account, go to your order history, select the item you wish to return, and follow the return process. Alternatively, you can contact our customer service team for assistance.',
      category: 'returns'
    },
    {
      question: 'How long does it take to process a refund?',
      answer: 'Once we receive your return, it typically takes 1-2 business days to process. After processing, it may take an additional 5-7 business days for the refund to appear on your statement, depending on your payment provider.',
      category: 'returns'
    },
    {
      question: 'Do I have to pay for return shipping?',
      answer: 'For returns due to customer preference, a shipping fee may be deducted from your refund. Returns for defective or damaged items are free of charge.',
      category: 'returns'
    },
    
    // Account & Payment
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit and debit cards, net banking, UPI, and popular digital wallets. For orders over ₹50,000, we also offer EMI options through select banks.',
      category: 'account'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard encryption and security protocols to protect your payment information. We do not store your credit card details on our servers.',
      category: 'account'
    },
    {
      question: 'Do I need to create an account to make a purchase?',
      answer: 'While you can check out as a guest, creating an account offers several benefits including order tracking, faster checkout for future purchases, and access to exclusive offers.',
      category: 'account'
    },
    {
      question: 'How can I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the sign-in page. Enter your email address, and we\'ll send you a link to reset your password.',
      category: 'account'
    },
    
    // Design Consultation
    {
      question: 'How does the design consultation process work?',
      answer: 'Our design consultation process begins with an initial meeting (in-person or virtual) to discuss your needs, style preferences, and budget. Our designer will then create a concept board and space plan, followed by a detailed proposal. Once approved, we handle the implementation, including furniture ordering and installation.',
      category: 'consultation'
    },
    {
      question: 'How much does a design consultation cost?',
      answer: 'We offer a complimentary 30-minute initial consultation. After that, our design services are priced based on the scope of your project. We offer both hourly rates and flat-fee packages. Contact us for a custom quote based on your specific needs.',
      category: 'consultation'
    },
    {
      question: 'Can I see examples of your previous design work?',
      answer: 'Yes, you can view our portfolio on our website under the "Portfolio" section. We showcase a variety of projects across different styles and budgets. Our designers also have individual portfolios that you can request during your consultation.',
      category: 'consultation'
    },
    {
      question: 'Do you work with clients remotely?',
      answer: 'Yes, we offer virtual design consultations for clients who cannot visit our showroom. Through video calls, digital mood boards, and 3D renderings, we can provide comprehensive design services remotely.',
      category: 'consultation'
    }
  ];

  const toggleQuestion = (question: string) => {
    setExpandedQuestions(prev => 
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setExpandedQuestions([]);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* FAQ Accordion */}
        {filteredFAQs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-medium mb-4">No results found</h2>
            <p className="text-gray-600 mb-8">
              We couldn't find any FAQs matching your search. Try different keywords or browse by category.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(faq.question)}
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                >
                  <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      expandedQuestions.includes(faq.question) ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedQuestions.includes(faq.question) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Contact Section */}
        <div className="mt-12 bg-primary/5 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
              <p className="text-gray-600">
                Can't find the answer you're looking for? Our customer service team is here to help.
              </p>
            </div>
            
            <Link 
              href="/contact" 
              className="flex items-center bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
