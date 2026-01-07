import { NextResponse } from "next/server";

// Mock product data - in a real app, this would come from a database
const products = [
  {
    id: 1,
    name: "Modern Minimalist Sofa",
    price: 1299.99,
    category: "furniture",
    description:
      "A sleek, minimalist sofa with clean lines and premium upholstery. Perfect for contemporary living spaces.",
    features: [
      "Stain-resistant fabric",
      "Solid wood frame",
      "High-density foam cushions",
      "Available in multiple colors",
    ],
    imageUrl: "/images/products/sofa-1.jpg",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    discount: 15,
    dimensions: {
      width: "82 inches",
      depth: "36 inches",
      height: "32 inches",
    },
    colors: ["Charcoal", "Pearl Gray", "Navy Blue", "Forest Green"],
    materials: [
      "Premium polyester fabric",
      "Kiln-dried hardwood frame",
      "High-density foam",
    ],
    warranty: "5 years limited warranty",
    deliveryTime: "2-3 weeks",
    relatedProducts: [2, 6, 8],
  },
  {
    id: 2,
    name: "Artisan Wooden Coffee Table",
    price: 649.99,
    category: "furniture",
    description:
      "Handcrafted coffee table made from reclaimed wood with a beautiful natural finish.",
    features: [
      "Reclaimed hardwood",
      "Natural finish",
      "Unique grain patterns",
      "Environmentally sustainable",
    ],
    imageUrl: "/images/products/table-1.jpg",
    rating: 4.6,
    reviewCount: 87,
    inStock: true,
    discount: 0,
    dimensions: {
      width: "48 inches",
      depth: "24 inches",
      height: "18 inches",
    },
    colors: ["Natural Oak", "Walnut", "Ebony"],
    materials: ["Reclaimed oak", "Steel frame"],
    warranty: "3 years limited warranty",
    deliveryTime: "1-2 weeks",
    relatedProducts: [3, 8],
  },
  {
    id: 3,
    name: "Scandinavian Dining Set",
    price: 1899.99,
    category: "furniture",
    description:
      "Complete dining set inspired by Scandinavian design principles of simplicity and functionality.",
    features: [
      "Table and 6 chairs",
      "Solid oak construction",
      "Comfortable upholstered seats",
      "Easy assembly",
    ],
    imageUrl: "/images/products/dining-1.jpg",
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    discount: 10,
    dimensions: {
      width: "72 inches",
      depth: "36 inches",
      height: "30 inches",
    },
    colors: ["Natural Oak", "White Oak"],
    materials: ["Solid oak", "Polyester upholstery"],
    warranty: "2 years limited warranty",
    deliveryTime: "3-4 weeks",
    relatedProducts: [2, 6],
  },
  {
    id: 4,
    name: "Geometric Pattern Area Rug",
    price: 349.99,
    category: "decor",
    description:
      "Contemporary area rug featuring an eye-catching geometric pattern in neutral tones.",
    features: [
      "High-quality wool blend",
      "Stain-resistant",
      "Non-slip backing",
      "Various sizes available",
    ],
    imageUrl: "/images/products/rug-1.jpg",
    rating: 4.5,
    reviewCount: 92,
    inStock: true,
    discount: 0,
    dimensions: {
      width: "5 feet",
      length: "8 feet",
      thickness: "0.5 inches",
    },
    colors: ["Gray/White", "Blue/Beige", "Black/Ivory"],
    materials: ["80% Wool, 20% Cotton"],
    warranty: "1 year limited warranty",
    deliveryTime: "1 week",
    relatedProducts: [5, 7],
  },
  {
    id: 5,
    name: "Modern Pendant Light Fixture",
    price: 189.99,
    category: "lighting",
    description:
      "Elegant pendant light with adjustable height and warm ambient lighting for dining areas and entryways.",
    features: [
      "Dimmable LED bulb compatible",
      "Brushed brass finish",
      "Adjustable hanging height",
      "Simple installation",
    ],
    imageUrl: "/images/products/light-1.jpg",
    rating: 4.7,
    reviewCount: 63,
    inStock: true,
    discount: 5,
    dimensions: {
      diameter: "18 inches",
      height: "Adjustable up to 48 inches",
    },
    colors: ["Brushed Brass", "Matte Black", "Chrome"],
    materials: ["Metal", "Glass"],
    warranty: "2 years limited warranty",
    deliveryTime: "1 week",
    relatedProducts: [7],
  },
  {
    id: 6,
    name: "Mid-Century Accent Chair",
    price: 599.99,
    category: "furniture",
    description:
      "Stylish accent chair inspired by mid-century design with tapered legs and button-tufted upholstery.",
    features: [
      "Sustainable wood frame",
      "Premium fabric upholstery",
      "Foam cushioning",
      "Easy assembly",
    ],
    imageUrl: "/images/products/chair-1.jpg",
    rating: 4.7,
    reviewCount: 71,
    inStock: false,
    discount: 0,
    dimensions: {
      width: "28 inches",
      depth: "30 inches",
      height: "32 inches",
    },
    colors: ["Mustard Yellow", "Teal", "Light Gray"],
    materials: ["Rubberwood", "Polyester fabric", "Foam padding"],
    warranty: "1 year limited warranty",
    deliveryTime: "2-3 weeks (currently backordered)",
    relatedProducts: [1, 3],
  },
  {
    id: 7,
    name: "Abstract Wall Art Canvas",
    price: 129.99,
    category: "decor",
    description:
      "Original abstract artwork on canvas, perfect for adding a splash of color to any room.",
    features: [
      "Hand-painted original",
      "Gallery-wrapped canvas",
      "Ready to hang",
      "Signed by the artist",
    ],
    imageUrl: "/images/products/art-1.jpg",
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    discount: 0,
    dimensions: {
      width: "36 inches",
      height: "24 inches",
      depth: "1.5 inches",
    },
    colors: ["Multi-color"],
    materials: ["Acrylic on canvas", "Wooden stretcher bars"],
    warranty: "No warranty (original artwork)",
    deliveryTime: "1-2 weeks",
    relatedProducts: [4, 5],
  },
  {
    id: 8,
    name: "Marble and Brass Side Table",
    price: 299.99,
    category: "furniture",
    description:
      "Elegant side table featuring a genuine marble top with brass-finished metal legs.",
    features: [
      "Real marble top",
      "Brass-finished steel frame",
      "Protective floor pads",
      "No assembly required",
    ],
    imageUrl: "/images/products/table-2.jpg",
    rating: 4.6,
    reviewCount: 38,
    inStock: true,
    discount: 0,
    dimensions: {
      diameter: "18 inches",
      height: "22 inches",
    },
    colors: ["White Marble/Brass", "Black Marble/Brass"],
    materials: ["Genuine marble", "Steel with brass finish"],
    warranty: "1 year limited warranty",
    deliveryTime: "1-2 weeks",
    relatedProducts: [2, 1],
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    // Find the product by ID
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Get related products based on the relatedProducts array
    const relatedProductsData = product.relatedProducts
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean)
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl,
        category: p.category,
        rating: p.rating,
        discount: p.discount,
      }));

    // Return the product with related products
    return NextResponse.json({
      product,
      relatedProducts: relatedProductsData,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}
