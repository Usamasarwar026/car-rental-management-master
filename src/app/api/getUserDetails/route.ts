import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { v2 as cloudinary } from "cloudinary";
import authOptions from "@/lib/authOption";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);


    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Successfully retrieved user info",
        user,
      },
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

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();

    const { id, profilePhoto, ...updatedData } = body;
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // update image in cloudinary
    let imageUrl = existingUser.profilePhoto;
    let publicId = existingUser.profilePublicId;

    if (profilePhoto) {
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadResponse = await cloudinary.uploader.upload(profilePhoto, {
        folder: "car_images",
        resource_type: "image",
      });

      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    // update data in db
    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        ...updatedData,
        profilePhoto: imageUrl,
        profilePublicId: publicId,
      },
    });

    return NextResponse.json(
      { message: "Successfully updated", user: updateUser },
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
