'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useConsultationMutations } from '@/hooks/query/useConsultations';

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

    const [errors, setErrors] = useState<any>({});
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { createConsultation } = useConsultationMutations();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

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

        createConsultation.mutate(apiData, {
            onSuccess: () => {
                setSubmitSuccess(true);
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
            },
        });
    };

    if (submitSuccess) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 max-w-2xl mx-auto text-center mt-20">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Consultation Booked!</h2>
                    <p className="text-green-700 mb-6">
                        Your consultation has been successfully scheduled. We look forward to meeting with you!
                    </p>
                    <div className="space-x-4">
                        <Link href="/" className="inline-block bg-primary hover:bg-accent text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                            Return to Home
                        </Link>
                        <button onClick={() => setSubmitSuccess(false)} className="inline-block border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                            Book Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Book a Consultation</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Schedule a one-on-one consultation with our interior design experts.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 mb-1">Full Name*</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 mb-1">Email Address*</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number*</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-gray-700 mb-1">Address</label>
                                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>

                            <hr className="my-6" />
                            <h2 className="text-xl font-bold">Appointment Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date" className="block text-gray-700 mb-1">Preferred Date*</label>
                                    <input type="date" id="date" name="date" min={getMinDate()} max={getMaxDate()} value={formData.date} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.date ? 'border-red-500' : 'border-gray-300'}`} />
                                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-gray-700 mb-1">Preferred Time*</label>
                                    <select id="time" name="time" value={formData.time} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.time ? 'border-red-500' : 'border-gray-300'}`} >
                                        <option value="">Select a time</option>
                                        {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                                    </select>
                                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="message" className="block text-gray-700 mb-1">Additional Details</label>
                                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Tell us about your project..."></textarea>
                                </div>
                            </div>

                            {createConsultation.isError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    {(createConsultation.error as any)?.message || 'Failed to book consultation. Please try again.'}
                                </div>
                            )}

                            <div className="pt-4">
                                <button type="submit" disabled={createConsultation.isPending} className="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50">
                                    {createConsultation.isPending ? 'Booking...' : 'Book Consultation'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* ... Sidebar info omitted for brevity in this update ... */}
            </div>
        </div>
    );
}