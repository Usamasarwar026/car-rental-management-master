import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import moment from "moment";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const userEmail = body.email;

    const compareEmail = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!compareEmail) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(10).toString("hex");
    const resetTokenExpiration = moment().add(1, "hour").toDate();

    await prisma.user.update({
      where: { email: userEmail },
      data: {
        reset_token: resetToken,
        reset_token_expiration: resetTokenExpiration,
      },
    });

    const transporter = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      // port: 587,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/newPassword?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Reset Password",
      html: `Please click <a href=${resetLink}>here</a> to reset your password`,
    };

    const sendMail = await transporter.sendMail(mailOptions);
    if (!sendMail) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "something wrong in sending email",
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Request successful",
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

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const newPassword = body.password;
    const resetToken = body.token;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await prisma.user.findUnique({
      where: { reset_token: resetToken },
    });

    if (
      !user ||
      !user.reset_token_expiration ||
      user.reset_token_expiration < new Date()
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const isOldPassword = await bcrypt.compare(newPassword, user.password);
    if (isOldPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password cannot be the same as the old one",
        },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_token_expiration: null,
      },
    });

    return NextResponse.json(
      { success: true, message: "Password updated successfully" },
      { status: 200 }
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
