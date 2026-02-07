import { successResponse, serverErrorResponse } from "@/lib/api-utils";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch real stats from database
    const [totalOrders, totalRevenue, pendingOrders, completedProjects] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          totalAmount: true,
        },
        where: {
          paymentStatus: 'COMPLETED',
        },
      }),
      prisma.order.count({
        where: {
          status: 'PENDING',
        },
      }),
      prisma.portfolioProject.count(),
    ]);

    // Fetch recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // Fetch recent projects
    const recentProjects = await prisma.portfolioProject.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const dashboardData = {
      stats: [
        {
          title: "Total Orders",
          value: totalOrders.toString(),
          change: "+0%", // Placeholder as historical data is needed for comparison
          changeType: "positive",
        },
        {
          title: "Total Revenue",
          value: `₹${(revenue._sum.totalAmount || 0).toLocaleString('en-IN')}`,
          change: "+0%",
          changeType: "positive",
        },
        {
          title: "Pending Orders",
          value: pendingOrders.toString(),
          change: "0%",
          changeType: "neutral",
        },
        {
          title: "Completed Projects",
          value: completedProjects.toString(),
          change: "+0",
          changeType: "positive",
        },
      ],
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        customer: order.user.name,
        date: order.createdAt.toISOString().split('T')[0],
        amount: `₹${order.totalAmount.toLocaleString('en-IN')}`,
        status: order.status,
      })),
      recentProjects: recentProjects.map(project => ({
        id: project.id,
        title: project.title,
        client: project.clientName || 'N/A',
        progress: 100, // Placeholder
        status: 'Completed',
      })),
    };

    return successResponse(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return serverErrorResponse();
  }
}
