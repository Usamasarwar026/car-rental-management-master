import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await prisma.user.findMany();
    return NextResponse.json({
      success: true,
      message: "Get Request working",
      users: res,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "users not found",
      error: error,
    });
  }
};
