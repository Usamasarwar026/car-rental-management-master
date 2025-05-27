import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const PUT = async (req: Request) => {
  try {
    const { id, oldPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user || !user.password) {
      return NextResponse.json({
        success: false,
        message: "User not found or password missing",
      });
    }

    const comparePassword = await bcrypt.compare(oldPassword, user.password);

    if (!comparePassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 }
      );
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return NextResponse.json(
        { success: false, message: "New password must be different" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    if (!newPassword) {
      return NextResponse.json({ success: false, error: "password not fond" });
    }

    const changePassword = await prisma.user.update({
      where: { id: id },
      data: { password: hashPassword },
    });

    if (!changePassword) {
      return NextResponse.json({
        success: false,
        message: "password not updated",
      });
    }

    return NextResponse.json({
      success: true,
      message: "post successfully working",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 500 }
    );
  }
};
