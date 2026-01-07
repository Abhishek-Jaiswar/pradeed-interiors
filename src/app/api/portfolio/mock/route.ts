import { NextResponse } from "next/server";

export async function GET() {
  // Mock portfolio data
  const mockPortfolioProjects = [
    {
      id: "1",
      title: "Modern Apartment Renovation",
      description:
        "Complete renovation of a 2000 sq ft apartment with modern minimalist design",
      content:
        "This complete apartment renovation transformed a dated space into a modern, open-concept home. We removed several walls to create an integrated living, dining, and kitchen area that maximizes natural light and creates a seamless flow throughout the space.\n\nThe client wanted a minimalist aesthetic with warm elements, so we chose a neutral color palette with wood accents and strategic pops of color. Custom cabinetry was designed to maximize storage while maintaining clean lines.",
      images: [
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      beforeImages: [
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      afterImages: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      category: "Residential",
      tags: ["Renovation", "Modern", "Apartment"],
      testimonial:
        "Working with Pradeep Interiors transformed our apartment beyond our expectations. The team was professional, creative, and attentive to our needs.",
      clientName: "Ananya Sharma",
      createdAt: "2023-06-15T10:00:00Z",
      updatedAt: "2023-06-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Luxury Villa Interior Design",
      description:
        "Complete interior design for a 5000 sq ft luxury villa with custom furniture",
      content:
        "This luxury villa project involved designing all interior spaces from the ground up, including custom furniture and cabinetry. The client desired a luxurious aesthetic that balanced classic elements with contemporary clean lines.\n\nWe created a cohesive design that flows throughout the villa while giving each space its own unique character. Rich materials like marble, brass accents, and high-quality fabrics were used throughout to create a sense of luxury and sophistication.",
      images: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      ],
      beforeImages: [
        "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      afterImages: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      ],
      category: "Residential",
      tags: ["Luxury", "Villa", "Custom Furniture"],
      testimonial:
        "The attention to detail and custom solutions provided by Pradeep Interiors were exceptional. They understood our vision perfectly.",
      clientName: "Vikram Malhotra",
      createdAt: "2023-05-10T10:00:00Z",
      updatedAt: "2023-05-10T10:00:00Z",
    },
    {
      id: "3",
      title: "Boutique Office Renovation",
      description:
        "Transformation of a heritage building into a modern boutique office space",
      content:
        "This project involved renovating a 100-year-old building into a contemporary office space while preserving its historic character. The challenge was to create a functional, modern workplace that respected and highlighted the building's heritage features.\n\nWe restored original elements like exposed brick walls and wooden beams while introducing modern furnishings, lighting, and technology infrastructure. The result is a unique office environment that blends old and new, creating an inspiring space for creativity and productivity.",
      images: [
        "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
        "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      beforeImages: [
        "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      afterImages: [
        "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
      ],
      category: "Commercial",
      tags: ["Office", "Renovation", "Heritage"],
      testimonial:
        "Our team loves the new office space. It perfectly balances our need for a professional environment with creative inspiration.",
      clientName: "Arjun Mehta, CEO of Design Studios",
      createdAt: "2023-04-20T10:00:00Z",
      updatedAt: "2023-04-20T10:00:00Z",
    },
    {
      id: "4",
      title: "Restaurant Interior Design",
      description:
        "Complete interior design for a high-end restaurant with custom furniture and lighting",
      content:
        "This restaurant project required creating a distinctive ambiance that would complement the chef's innovative cuisine. The design needed to be sophisticated yet comfortable, allowing the food to remain the star while providing a memorable setting.\n\nWe developed a concept that uses rich textures, custom lighting fixtures, and a carefully considered layout to create different zones within the restaurant. Custom banquettes and carefully selected materials create an intimate yet sophisticated dining experience.",
      images: [
        "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
      ],
      beforeImages: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      afterImages: [
        "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      ],
      category: "Commercial",
      tags: ["Restaurant", "Custom Furniture", "Lighting Design"],
      testimonial:
        "Our guests constantly compliment the beautiful interior. Its as much a part of our identity as our food.",
      clientName: "Priya Nair, Owner of Spice & Essence",
      createdAt: "2023-03-05T10:00:00Z",
      updatedAt: "2023-03-05T10:00:00Z",
    },
  ];

  return NextResponse.json({
    success: true,
    data: {
      portfolioProjects: mockPortfolioProjects,
      pagination: {
        total: mockPortfolioProjects.length,
        page: 1,
        limit: 10,
        pages: 1,
      },
    },
  });
}
