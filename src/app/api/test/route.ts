import { NextResponse } from "next/server";

export async function GET() {
  // Mock data
  const testData = {
    message: "API is working",
    status: "success",
    timestamp: new Date().toISOString(),
    endpoints: [
      "/api/products",
      "/api/categories",
      "/api/portfolio",
      "/api/consultations",
      "/api/design-ideas",
      "/api/calculator",
    ],
  };

  return NextResponse.json(testData);
}
