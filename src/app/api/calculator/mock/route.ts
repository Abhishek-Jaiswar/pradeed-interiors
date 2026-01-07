import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { dimensions, roomType, materials, furniture } = await request.json();

    // Validate input
    if (!dimensions || !roomType) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Calculate area
    const area = dimensions.length * dimensions.width;

    // Mock material prices
    const materialPrices = {
      STANDARD_PAINT: 2, // per sq ft
      PREMIUM_PAINT: 4,
      WALLPAPER: 6,
      WOOD_FLOORING: 10,
      TILE_FLOORING: 12,
      CARPET: 8,
      MARBLE_FLOORING: 25,
      VINYL_FLOORING: 5,
      STANDARD_LIGHTING: 200, // fixed price per room
      PREMIUM_LIGHTING: 500,
      CEILING_WORK: 8, // per sq ft
      WALL_PANELING: 15,
    };

    // Calculate base cost by room type
    const baseCostByRoomType = {
      LIVING_ROOM: 50,
      BEDROOM: 40,
      KITCHEN: 70,
      BATHROOM: 80,
      DINING_ROOM: 45,
      HOME_OFFICE: 35,
      OTHER: 30,
    };

    const baseCost = (baseCostByRoomType[roomType] || 30) * area;

    // Calculate materials cost
    let materialsCost = 0;
    for (const material of materials || []) {
      const price = materialPrices[material.type] || 0;
      const coverage = material.coverage || 1; // default to full coverage
      materialsCost += price * area * coverage;
    }

    // Calculate furniture cost
    const furnitureCost = (furniture || []).reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);

    // Add labor costs - simplified calculation
    const laborCost = area * 20; // $20 per sq ft

    // Add design fee
    const designFee = baseCost * 0.15; // 15% of base cost

    // Calculate total cost
    const totalCost =
      baseCost + materialsCost + furnitureCost + laborCost + designFee;

    // Calculate time estimate (in weeks)
    const timeEstimate = {
      min: Math.max(2, Math.floor(area / 200)),
      max: Math.max(4, Math.ceil(area / 150)),
    };

    // Return breakdown
    return NextResponse.json({
      success: true,
      data: {
        area,
        breakdown: {
          baseCost,
          materialsCost,
          furnitureCost,
          laborCost,
          designFee,
        },
        totalCost,
        timeEstimate,
      },
    });
  } catch (error) {
    console.error("Error calculating budget:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to calculate budget",
      },
      { status: 500 }
    );
  }
}
