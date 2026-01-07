import Link from 'next/link';
import Image from 'next/image';
import banner from '../../public/banner.jpg'

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div className="relative h-full w-full">
                    <Image
                        src={banner}
                        height={400}
                        width={2000}
                        alt='interior banner'
                    />
                    <div className="absolute inset-0 bg-neutral-800/5"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Creating Beautiful Spaces
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl">
                        Transform your living environment with our expert interior design services tailored to your unique style and needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/portfolio" className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            View Our Work
                        </Link>
                        <Link href="/consultation" className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-lg font-semibold transition-colors">
                            Book Consultation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We offer a comprehensive range of interior design services to transform your space into something extraordinary.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-neutral-200 relative">
                                {/* Placeholder for service image */}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Residential Design</h3>
                                <p className="text-gray-600 mb-4">
                                    Transform your home into a personalized sanctuary that reflects your unique style and meets your functional needs.
                                </p>
                                <Link href="/services/residential" className="text-primary font-medium hover:text-accent transition-colors">
                                    Learn More →
                                </Link>
                            </div>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-neutral-200 relative">
                                {/* Placeholder for service image */}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Commercial Design</h3>
                                <p className="text-gray-600 mb-4">
                                    Create impressive commercial spaces that enhance productivity, reflect your brand identity, and impress clients.
                                </p>
                                <Link href="/services/commercial" className="text-primary font-medium hover:text-accent transition-colors">
                                    Learn More →
                                </Link>
                            </div>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-neutral-200 relative">
                                {/* Placeholder for service image */}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Renovation</h3>
                                <p className="text-gray-600 mb-4">
                                    Breathe new life into your existing space with our expert renovation services, from minor updates to complete transformations.
                                </p>
                                <Link href="/services/renovation" className="text-primary font-medium hover:text-accent transition-colors">
                                    Learn More →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20 bg-gray-50 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore some of our recent work and discover the possibilities for your own space.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Project 1 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-md group">
                            <div className="h-72 bg-neutral-200 relative overflow-hidden">
                                {/* Placeholder for project image */}
                                <div className="absolute inset-0 bg-primary/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href="/portfolio/1" className="bg-white text-primary px-6 py-2 rounded-lg font-medium">
                                        View Project
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-primary font-medium">Residential</span>
                                <h3 className="text-xl font-bold mb-2">Modern Minimalist Apartment</h3>
                                <p className="text-gray-600">
                                    A sleek, contemporary design focused on clean lines and functional spaces for urban living.
                                </p>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-md group">
                            <div className="h-72 bg-neutral-200 relative overflow-hidden">
                                {/* Placeholder for project image */}
                                <div className="absolute inset-0 bg-primary/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href="/portfolio/2" className="bg-white text-primary px-6 py-2 rounded-lg font-medium">
                                        View Project
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-primary font-medium">Commercial</span>
                                <h3 className="text-xl font-bold mb-2">Creative Office Space</h3>
                                <p className="text-gray-600">
                                    An innovative workspace design that fosters collaboration and creativity while maintaining brand identity.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/portfolio" className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Don't just take our word for it – hear what our clients have to say about their experience with Pradeep Interiors.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                                <div className="ml-4">
                                    <h4 className="font-bold">Sarah Johnson</h4>
                                    <p className="text-gray-500 text-sm">Residential Client</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-yellow-400">★</span>
                                ))}
                            </div>
                            <p className="text-gray-600 italic">
                                "Working with Pradeep Interiors was a dream come true. They transformed our outdated living room into a modern, functional space that perfectly reflects our style. Their attention to detail was impressive!"
                            </p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                                <div className="ml-4">
                                    <h4 className="font-bold">Michael Chen</h4>
                                    <p className="text-gray-500 text-sm">Commercial Client</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-yellow-400">★</span>
                                ))}
                            </div>
                            <p className="text-gray-600 italic">
                                "The team at Pradeep Interiors designed our office space with both aesthetics and functionality in mind. Our employees love the new environment, and it has significantly boosted productivity and morale."
                            </p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                                <div className="ml-4">
                                    <h4 className="font-bold">Priya Patel</h4>
                                    <p className="text-gray-500 text-sm">Renovation Client</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className="text-yellow-400">★</span>
                                ))}
                            </div>
                            <p className="text-gray-600 italic">
                                "Our home renovation project was handled with such care and professionalism. The designers listened to our needs and created a space that exceeded our expectations while staying within our budget."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Budget Calculator CTA */}
            <section className="py-20 bg-primary text-white px-4">
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Plan Your Budget</h2>
                        <p className="mb-8 opacity-90">
                            Use our interactive calculator to get an estimate for your interior design project. Simply enter your requirements and receive an instant quote.
                        </p>
                        <Link href="/calculator" className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                            Try Budget Calculator
                        </Link>
                    </div>
                </div>
            </section>

            {/* Blog/Design Ideas Preview */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Design Inspiration</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore our collection of design ideas, tips, and trends to inspire your next interior project.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Design Idea 1 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-md">
                            <div className="h-48 bg-neutral-200 relative">
                                {/* Placeholder for blog image */}
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-primary font-medium">Color Theory</span>
                                <h3 className="text-xl font-bold mb-2">Using Color Psychology in Home Design</h3>
                                <p className="text-gray-600 mb-4">
                                    Discover how different colors can affect mood and perception in your living spaces.
                                </p>
                                <Link href="/design-ideas/1" className="text-primary font-medium hover:text-accent transition-colors">
                                    Read More →
                                </Link>
                            </div>
                        </div>

                        {/* Design Idea 2 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-md">
                            <div className="h-48 bg-neutral-200 relative">
                                {/* Placeholder for blog image */}
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-primary font-medium">Space Planning</span>
                                <h3 className="text-xl font-bold mb-2">Maximizing Small Living Spaces</h3>
                                <p className="text-gray-600 mb-4">
                                    Smart solutions and design tricks to make the most of compact apartments and homes.
                                </p>
                                <Link href="/design-ideas/2" className="text-primary font-medium hover:text-accent transition-colors">
                                    Read More →
                                </Link>
                            </div>
                        </div>

                        {/* Design Idea 3 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-md">
                            <div className="h-48 bg-neutral-200 relative">
                                {/* Placeholder for blog image */}
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-primary font-medium">Trends</span>
                                <h3 className="text-xl font-bold mb-2">2023 Interior Design Trends</h3>
                                <p className="text-gray-600 mb-4">
                                    Stay up-to-date with the latest interior design trends that are shaping homes this year.
                                </p>
                                <Link href="/design-ideas/3" className="text-primary font-medium hover:text-accent transition-colors">
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/design-ideas" className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Explore All Design Ideas
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 bg-gray-50 px-4">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-8 md:p-12">
                                <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Space?</h2>
                                <p className="text-gray-600 mb-6">
                                    Contact us today to schedule a consultation and take the first step towards your dream interior.
                                </p>
                                <Link href="/consultation" className="inline-block bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                                    Get in Touch
                                </Link>
                            </div>
                            <div className="bg-neutral-200">
                                {/* Placeholder for contact image */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 