import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../config/prisma";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, role } = body;

    const userRole = role === "ADMIN" ? "ADMIN" : "USER";

    const userExist = await prisma.user.findUnique({ where: { email: email } });
    if (userExist) {
      return NextResponse.json(
        {
          success: false,
          message: "User already Exist",
        },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPassword,
        role: userRole,
        city: null,
        street: null,
        dateOfBirth: null,
        gender: null,
        profilePhoto: null,
        reset_token: uuidv4(),
      },
    });

    return NextResponse.json(
      { success: true, message: "User created successfully", newUser: newUser },
      { status: 201 }
    );
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
