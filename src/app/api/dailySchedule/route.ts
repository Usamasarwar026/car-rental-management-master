import { prisma } from "@/config/prisma";
import { COLORS } from "@/constants/colors";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, start, color } = body;

    if (!title || !start) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        title,
        start: new Date(start),
        color: color || COLORS.medium_sea_green,
      },
    });

    return NextResponse.json(newEvent);
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "id is missing" },
        { status: 400 }
      );
    }

    const deleteEvent = await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json(deleteEvent);
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
