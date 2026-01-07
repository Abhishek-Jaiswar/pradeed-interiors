import { NextResponse } from "next/server";

export async function GET() {
  // Mock product data
  const mockProducts = [
    {
      id: "1",
      name: "Modern Sofa",
      description: "Elegant modern sofa with premium fabric upholstery",
      price: 1299.99,
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      dimensions: {
        length: 220,
        width: 95,
        height: 85,
      },
      materials: ["Fabric", "Wood", "Metal"],
      colors: ["Gray", "Blue", "Beige"],
      categories: [
        { id: "cat1", name: "Living Room" },
        { id: "cat2", name: "Sofas" },
      ],
      avgRating: 4.5,
      reviewCount: 12,
      createdAt: "2023-06-15T10:00:00Z",
      updatedAt: "2023-06-15T10:00:00Z",
    },
    {
      id: "2",
      name: "Dining Table Set",
      description:
        "Modern dining table with 6 chairs, perfect for family gatherings",
      price: 899.99,
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      dimensions: {
        length: 180,
        width: 90,
        height: 75,
      },
      materials: ["Wood", "Metal"],
      colors: ["Walnut", "Oak", "Black"],
      categories: [
        { id: "cat3", name: "Dining Room" },
        { id: "cat4", name: "Tables" },
      ],
      avgRating: 4.2,
      reviewCount: 8,
      createdAt: "2023-05-20T10:00:00Z",
      updatedAt: "2023-05-20T10:00:00Z",
    },
    {
      id: "3",
      name: "King Size Bed",
      description:
        "Luxurious king size bed with storage and upholstered headboard",
      price: 1499.99,
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      dimensions: {
        length: 200,
        width: 180,
        height: 120,
      },
      materials: ["Wood", "Fabric"],
      colors: ["Gray", "Beige", "Blue"],
      categories: [
        { id: "cat5", name: "Bedroom" },
        { id: "cat6", name: "Beds" },
      ],
      avgRating: 4.8,
      reviewCount: 15,
      createdAt: "2023-04-10T10:00:00Z",
      updatedAt: "2023-04-10T10:00:00Z",
    },
    {
      id: "4",
      name: "Office Desk",
      description: "Modern office desk with drawers and cable management",
      price: 599.99,
      inStock: false,
      images: [
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      ],
      dimensions: {
        length: 140,
        width: 70,
        height: 75,
      },
      materials: ["Wood", "Metal"],
      colors: ["White", "Black", "Oak"],
      categories: [
        { id: "cat7", name: "Office" },
        { id: "cat8", name: "Desks" },
      ],
      avgRating: 4.0,
      reviewCount: 6,
      createdAt: "2023-03-05T10:00:00Z",
      updatedAt: "2023-03-05T10:00:00Z",
    },
  ];

  return NextResponse.json({
    success: true,
    data: {
      products: mockProducts,
      pagination: {
        total: mockProducts.length,
        page: 1,
        limit: 10,
        pages: 1,
      },
    },
  });
}
