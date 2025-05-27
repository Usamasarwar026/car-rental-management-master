import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOption";

export async function GET(req: Request) {
  try {
    // 🔐 Get session info from next-auth
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 📚 Fetch all bookings with related car and user data
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        vehicle: {
          select: {
            carName: true,
            brand: true,
            imageUrl: true,
            price: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    console.log(JSON.stringify(bookings, null, 2));
    return NextResponse.json(
      { success: true, data: bookings },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching all bookings:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch all bookings" },
      { status: 500 }
    );
  }
}
