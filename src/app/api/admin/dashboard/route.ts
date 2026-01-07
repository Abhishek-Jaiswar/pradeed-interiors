import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for the dashboard
  // In a real app, this would come from a database
  const dashboardData = {
    stats: [
      {
        title: "Total Orders",
        value: "124",
        change: "+12%",
        changeType: "positive",
      },
      {
        title: "Total Revenue",
        value: "₹8,56,230",
        change: "+8%",
        changeType: "positive",
      },
      {
        title: "Pending Orders",
        value: "18",
        change: "-2%",
        changeType: "positive",
      },
      {
        title: "Completed Projects",
        value: "42",
        change: "+4",
        changeType: "positive",
      },
    ],
    recentOrders: [
      {
        id: "ORD-1234",
        customer: "Amit Sharma",
        date: "2023-06-10",
        amount: "₹12,500",
        status: "Completed",
      },
      {
        id: "ORD-1235",
        customer: "Priya Gupta",
        date: "2023-06-09",
        amount: "₹8,750",
        status: "Processing",
      },
      {
        id: "ORD-1236",
        customer: "Vikram Patel",
        date: "2023-06-09",
        amount: "₹21,300",
        status: "Pending",
      },
      {
        id: "ORD-1237",
        customer: "Neha Singh",
        date: "2023-06-08",
        amount: "₹15,600",
        status: "Completed",
      },
      {
        id: "ORD-1238",
        customer: "Rajesh Kumar",
        date: "2023-06-08",
        amount: "₹9,400",
        status: "Processing",
      },
    ],
    recentProjects: [
      {
        id: "PRJ-001",
        title: "Modern Apartment Redesign",
        client: "Sharma Family",
        progress: 100,
        status: "Completed",
      },
      {
        id: "PRJ-002",
        title: "Office Space Renovation",
        client: "TechCorp Ltd.",
        progress: 80,
        status: "In Progress",
      },
      {
        id: "PRJ-003",
        title: "Luxury Villa Interior",
        client: "Mehta Residence",
        progress: 60,
        status: "In Progress",
      },
      {
        id: "PRJ-004",
        title: "Restaurant Redesign",
        client: "Spice Garden",
        progress: 30,
        status: "In Progress",
      },
      {
        id: "PRJ-005",
        title: "Retail Store Setup",
        client: "Fashion Hub",
        progress: 10,
        status: "Just Started",
      },
    ],
  };

  return NextResponse.json(dashboardData);
}
