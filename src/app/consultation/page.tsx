'use client';

import { useState } from 'react';
import Link from 'next/link';

// Available time slots
const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
];

// Service types
const serviceTypes = [
    { id: 'interior_design', name: 'Interior Design Consultation' },
    { id: 'renovation', name: 'Renovation Planning' },
    { id: 'budget_planning', name: 'Budget Planning' },
    { id: 'material_selection', name: 'Material Selection' },
    { id: 'space_planning', name: 'Space Planning' },
    { id: 'color_scheme', name: 'Color Scheme Consultation' }
];

// Create a date 7 days from now
const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
};

// Create a date 60 days from now
const getMaxDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 60);
    return date.toISOString().split('T')[0];
};

export default function ConsultationPage() {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        serviceType: 'interior_design',
        projectType: 'residential',
        propertySize: '',
        budget: '',
        message: '',
        isVirtual: false
    });

    // Validation state
    const [errors, setErrors] = useState({});

    // Form submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Clear error for this field if it exists
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Required fields
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Prepare the data for API
            const apiData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                projectType: formData.projectType,
                budget: formData.budget,
                message: formData.message,
                preferredDate: formData.date,
                preferredTime: formData.time
            };

            // Send the data to our API endpoint
            const response = await fetch('/api/consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(apiData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to book consultation');
            }

            // Show success message
            setSubmitSuccess(true);

            // Reset form after submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                date: '',
                time: '',
                serviceType: 'interior_design',
                projectType: 'residential',
                propertySize: '',
                budget: '',
                message: '',
                isVirtual: false
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitError(error.message || 'There was an error booking your consultation. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Book a Consultation</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Schedule a one-on-one consultation with our interior design experts. Whether you're planning a complete renovation or need advice on color schemes, we're here to help bring your vision to life.
                </p>
            </div>

            {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 max-w-2xl mx-auto text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Consultation Booked!</h2>
                    <p className="text-green-700 mb-6">
                        Your consultation has been successfully scheduled. We've sent a confirmation email with all the details. We look forward to meeting with you!
                    </p>
                    <div className="space-x-4">
                        <Link href="/" className="inline-block bg-primary hover:bg-accent text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                            Return to Home
                        </Link>
                        <button
                            onClick={() => setSubmitSuccess(false)}
                            className="inline-block border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                        >
                            Book Another
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold">Personal Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-700 mb-1">Full Name*</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 mb-1">Email Address*</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number*</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-gray-700 mb-1">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <hr className="my-6" />
                                <h2 className="text-xl font-bold">Appointment Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="date" className="block text-gray-700 mb-1">Preferred Date*</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            min={getMinDate()}
                                            max={getMaxDate()}
                                            value={formData.date}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.date ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="time" className="block text-gray-700 mb-1">Preferred Time*</label>
                                        <select
                                            id="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.time ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select a time</option>
                                            {timeSlots.map(slot => (
                                                <option key={slot} value={slot}>{slot}</option>
                                            ))}
                                        </select>
                                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="serviceType" className="block text-gray-700 mb-1">Consultation Type*</label>
                                        <select
                                            id="serviceType"
                                            name="serviceType"
                                            value={formData.serviceType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            {serviceTypes.map(service => (
                                                <option key={service.id} value={service.id}>{service.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="projectType" className="block text-gray-700 mb-1">Project Type</label>
                                        <select
                                            id="projectType"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="residential">Residential</option>
                                            <option value="commercial">Commercial</option>
                                            <option value="office">Office</option>
                                            <option value="retail">Retail</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="propertySize" className="block text-gray-700 mb-1">Property Size (sq ft)</label>
                                        <input
                                            type="text"
                                            id="propertySize"
                                            name="propertySize"
                                            value={formData.propertySize}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="budget" className="block text-gray-700 mb-1">Estimated Budget</label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="">Select a budget range</option>
                                            <option value="under_5000">Under $5,000</option>
                                            <option value="5000_10000">$5,000 - $10,000</option>
                                            <option value="10000_25000">$10,000 - $25,000</option>
                                            <option value="25000_50000">$25,000 - $50,000</option>
                                            <option value="50000_100000">$50,000 - $100,000</option>
                                            <option value="over_100000">Over $100,000</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="message" className="block text-gray-700 mb-1">Additional Details</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Tell us about your project, specific requirements, or any questions you have..."
                                        ></textarea>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="isVirtual"
                                                checked={formData.isVirtual}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-gray-700">I prefer a virtual consultation (via Zoom/Google Meet)</span>
                                        </label>
                                    </div>
                                </div>

                                {submitError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                        {submitError}
                                    </div>
                                )}

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Booking Consultation...' : 'Book Consultation'}
                                    </button>
                                    <p className="text-gray-500 text-sm text-center mt-2">
                                        * Required fields
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-md sticky top-6">
                            <h2 className="text-xl font-bold mb-4">Why Choose Us</h2>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-medium text-gray-900">Expert Designers</h3>
                                        <p className="text-gray-600">Our team consists of experienced designers with a passion for creating beautiful spaces.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-medium text-gray-900">Personalized Approach</h3>
                                        <p className="text-gray-600">We tailor our designs to match your unique style, preferences, and budget requirements.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-medium text-gray-900">End-to-End Solutions</h3>
                                        <p className="text-gray-600">From planning to execution, we handle every aspect of your interior design project.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-lg mb-2">What to Expect</h3>
                                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                                    <li>A thorough discussion about your design goals</li>
                                    <li>Expert advice on layout, color schemes, and materials</li>
                                    <li>A customized plan that fits your lifestyle and budget</li>
                                    <li>Transparent pricing and timeline information</li>
                                </ul>
                            </div>

                            <div className="mt-8">
                                <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                                <div className="space-y-2">
                                    <p className="flex items-center text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        (555) 123-4567
                                    </p>
                                    <p className="flex items-center text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        info@pradeepinteriors.com
                                    </p>
                                    <p className="flex items-center text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        123 Design Street, Creativity City
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 