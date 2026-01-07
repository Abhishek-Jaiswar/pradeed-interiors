import { NextResponse } from 'next/server';

export async function GET() {
  // Mock design ideas data
  const mockDesignIdeas = [
    {
      id: '1',
      title: 'Modern Minimalist Living Room',
      description: 'A clean and elegant living room design that maximizes space and light',
      content: 'Modern minimalist living spaces are all about combining functionality with simplicity. This design features neutral colors with strategic splashes of accent colors, clean lines, and thoughtfully selected furniture that serves a purpose while maintaining an uncluttered appearance.\n\nKey elements include:\n- Neutral color palette with subtle accent colors\n- Clean lines and simple forms\n- Multifunctional furniture\n- Strategic lighting for ambiance\n- Limited but meaningful decor',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      category: 'Living Room',
      tags: ['Minimalist', 'Modern', 'Space Saving'],
      createdAt: '2023-06-15T10:00:00Z',
      updatedAt: '2023-06-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Cozy Scandinavian Bedroom',
      description: 'A warm and inviting bedroom inspired by Scandinavian design principles',
      content: 'Scandinavian design is characterized by simplicity, minimalism, and functionality. This bedroom design incorporates those principles with a focus on creating a cozy, inviting space that feels warm despite its minimalist approach.\n\nKey elements include:\n- White or light neutral walls to maximize light\n- Natural wood elements\n- Layered textiles for warmth and texture\n- Minimalist furniture with clean lines\n- Indoor plants to add life and color\n- Strategic use of ambient lighting',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      category: 'Bedroom',
      tags: ['Scandinavian', 'Cozy', 'Natural'],
      createdAt: '2023-05-10T10:00:00Z',
      updatedAt: '2023-05-10T10:00:00Z'
    },
    {
      id: '3',
      title: 'Industrial Style Kitchen',
      description: 'A bold kitchen design that embraces raw materials and industrial elements',
      content: 'Industrial style kitchens combine utilitarian design with raw, unfinished elements. This design approach celebrates exposed materials like brick, concrete, and metal, giving the space an urban, warehouse-like aesthetic while still being functional for cooking and entertaining.\n\nKey elements include:\n- Exposed brick walls or concrete surfaces\n- Metal fixtures and accents\n- Open shelving for storage and display\n- Industrial lighting fixtures\n- Stainless steel appliances\n- Reclaimed wood for warmth and contrast',
      image: 'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      category: 'Kitchen',
      tags: ['Industrial', 'Urban', 'Modern'],
      createdAt: '2023-04-20T10:00:00Z',
      updatedAt: '2023-04-20T10:00:00Z'
    },
    {
      id: '4',
      title: 'Luxury Home Office Design',
      description: 'A sophisticated home office that blends comfort with professionalism',
      content: 'As remote work becomes more common, a well-designed home office is essential. This luxury home office design creates a space that's both professional and comfortable, with high-end finishes and thoughtful details that enhance productivity and well-being.\n\nKey elements include:\n- Quality desk and ergonomic chair\n- Custom built-in shelving and storage\n- Sophisticated color palette\n- High-end materials like marble and brass\n- Proper lighting for work and video calls\n- Soundproofing elements\n- Technological integration for seamless connectivity',
      image: 'https://images.unsplash.com/photo-1585821569331-68847e779175?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      category: 'Home Office',
      tags: ['Luxury', 'Professional', 'Ergonomic'],
      createdAt: '2023-03-05T10:00:00Z',
      updatedAt: '2023-03-05T10:00:00Z'
    }
  ];

  return NextResponse.json({
    success: true,
    data: {
      designIdeas: mockDesignIdeas,
      pagination: {
        total: mockDesignIdeas.length,
        page: 1,
        limit: 10,
        pages: 1
      }
    }
  });
} 