import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

// Designer interface
interface Designer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  experience: string;
  social: {
    email?: string;
    phone?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
}

// Mock data for designers
const designers: Designer[] = [
  {
    id: 'designer-1',
    name: 'Pradeep Kumar',
    role: 'Principal Designer & Founder',
    bio: 'With over 15 years of experience in interior design, Pradeep has established himself as a visionary in creating spaces that blend functionality with aesthetic appeal. His approach focuses on understanding client needs and translating them into designs that exceed expectations.',
    image: '/placeholder-designer.jpg',
    specialties: ['Residential Interiors', 'Commercial Spaces', 'Luxury Design'],
    experience: '15+ years',
    social: {
      email: 'pradeep@pradeepinteriors.com',
      phone: '+91 9876543210',
      instagram: 'pradeep_interiors',
      linkedin: 'pradeepkumar',
      facebook: 'pradeepinteriors'
    }
  },
  {
    id: 'designer-2',
    name: 'Anjali Sharma',
    role: 'Senior Interior Designer',
    bio: 'Anjali brings a fresh perspective to every project with her innovative ideas and attention to detail. Specializing in contemporary design, she creates spaces that are both trendy and timeless. Her work has been featured in several design magazines.',
    image: '/placeholder-designer.jpg',
    specialties: ['Contemporary Design', 'Space Planning', 'Color Theory'],
    experience: '8 years',
    social: {
      email: 'anjali@pradeepinteriors.com',
      instagram: 'anjali_designs',
      linkedin: 'anjalisharma'
    }
  },
  {
    id: 'designer-3',
    name: 'Rahul Verma',
    role: 'Interior Designer',
    bio: 'Rahul is known for his innovative approach to small space design. He believes that every square foot has potential and works to maximize functionality without compromising on style. His designs are practical, elegant, and tailored to client lifestyles.',
    image: '/placeholder-designer.jpg',
    specialties: ['Small Space Solutions', 'Modular Furniture', 'Budget-Friendly Design'],
    experience: '5 years',
    social: {
      email: 'rahul@pradeepinteriors.com',
      instagram: 'rahul_designs',
      linkedin: 'rahulverma'
    }
  },
  {
    id: 'designer-4',
    name: 'Neha Patel',
    role: 'Kitchen & Bath Specialist',
    bio: 'Neha specializes in creating functional and beautiful kitchen and bathroom spaces. With her technical knowledge of materials and fixtures, she ensures that these essential spaces are both practical and luxurious. Her designs prioritize efficiency and elegance.',
    image: '/placeholder-designer.jpg',
    specialties: ['Kitchen Design', 'Bathroom Remodeling', 'Custom Cabinetry'],
    experience: '7 years',
    social: {
      email: 'neha@pradeepinteriors.com',
      phone: '+91 9876543211',
      instagram: 'neha_kitchendesign'
    }
  },
  {
    id: 'designer-5',
    name: 'Vikram Singh',
    role: 'Commercial Design Specialist',
    bio: 'Vikram has transformed numerous commercial spaces into productive and inspiring environments. His understanding of workplace dynamics and brand identity allows him to create spaces that enhance business operations while reflecting company values.',
    image: '/placeholder-designer.jpg',
    specialties: ['Office Design', 'Retail Spaces', 'Hospitality Interiors'],
    experience: '10 years',
    social: {
      email: 'vikram@pradeepinteriors.com',
      linkedin: 'vikramsingh',
      facebook: 'vikramdesigns'
    }
  }
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Meet Our Design Team</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our talented team of designers brings creativity, expertise, and passion to every project.
          With diverse backgrounds and specialties, we're equipped to handle any design challenge.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {designers.map((designer) => (
          <div key={designer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-80 w-full">
              <Image
                src={designer.image}
                alt={designer.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold">{designer.name}</h2>
              <p className="text-primary mb-4">{designer.role}</p>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{designer.bio}</p>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {designer.specialties.map((specialty, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Experience</h3>
                <p>{designer.experience}</p>
              </div>
              
              <div className="flex space-x-3">
                {designer.social.email && (
                  <a 
                    href={`mailto:${designer.social.email}`} 
                    className="text-gray-500 hover:text-primary transition"
                    aria-label={`Email ${designer.name}`}
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                )}
                
                {designer.social.phone && (
                  <a 
                    href={`tel:${designer.social.phone}`} 
                    className="text-gray-500 hover:text-primary transition"
                    aria-label={`Call ${designer.name}`}
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                )}
                
                {designer.social.instagram && (
                  <a 
                    href={`https://instagram.com/${designer.social.instagram}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary transition"
                    aria-label={`${designer.name}'s Instagram`}
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                
                {designer.social.linkedin && (
                  <a 
                    href={`https://linkedin.com/in/${designer.social.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary transition"
                    aria-label={`${designer.name}'s LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                
                {designer.social.facebook && (
                  <a 
                    href={`https://facebook.com/${designer.social.facebook}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary transition"
                    aria-label={`${designer.name}'s Facebook`}
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t">
              <Link 
                href={`/consultation?designer=${designer.id}`}
                className="block w-full text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          We're always looking for talented designers to join our growing team. If you're passionate about interior design
          and want to work on exciting projects, we'd love to hear from you.
        </p>
        <Link 
          href="/careers" 
          className="inline-block bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition"
        >
          View Open Positions
        </Link>
      </div>
    </div>
  );
}
