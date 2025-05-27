import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID not found",
      });
    }

    await prisma.addCar.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      message: "Views Post Working",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
