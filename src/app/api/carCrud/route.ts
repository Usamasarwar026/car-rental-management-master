import { prisma } from "@/config/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import authOptions from "@/lib/authOption";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
  console.log("Received POST request to /carCrud");
  try {
    const {
      brand,
      carName,
      model,
      seat,
      mileage,
      engine,
      transmission,
      carType,
      price,
      description,
      image,
    } = await req.json();

    // console.log("Image:", image);
    console.log("Brand:", brand);
    console.log("Car Name:", carName);
    console.log("Model:", model);
    console.log("Mileage:", mileage);
    console.log("Engine:", engine);
    console.log("Transmission:", transmission);
    console.log("Car Type:", carType);
    console.log("Price:", price);
    console.log("Description:", description);

    const session = await getServerSession(authOptions);
    console.log("session",session)
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "Not Authenticated",
      });
    }

    const validEngines = ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"];
    const validTransmissions = ["MANUAL", "AUTOMATIC"];
    const validCarTypes = [
      "LUXURYCAR",
      "VINTAGECAR",
      "FAMILYCAR",
      "OFFROADCAR",
    ];

    if (!validEngines.includes(engine.toUpperCase())) {
      return NextResponse.json({
        success: false,
        message: `Invalid engine type. Valid options: ${validEngines.join(
          ", "
        )}`,
      });
    }

    if (!validTransmissions.includes(transmission.toUpperCase())) {
      return NextResponse.json({
        success: false,
        message: `Invalid transmission type. Valid options: ${validTransmissions.join(
          ", "
        )}`,
      });
    }
    if (!validCarTypes.includes(carType.toUpperCase())) {
      return NextResponse.json({
        success: false,
        message: `Invalid car Type. Valid options: ${validCarTypes.join(", ")}`,
      });
    }

    // Upload image to Cloudinary (if provided)
    let imageUrl = null;
    let publicId = null;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "car_images",
        resource_type: "image",
      });
      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    // Save car details
    const response = await prisma.vehicle.create({
      data: {
        userID: session.user.id,
        brand,
        carName,
        model,
        seat,
        mileage,
        engine: engine.toUpperCase(),
        transmission: transmission.toUpperCase(),
        price,
        carType: carType.replace(/\s+/g, "").toUpperCase(),
        description,
        imageUrl,
        imagePublicId: publicId,
        views: 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Car added successfully",
      data: response,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const cars = await prisma.vehicle.findMany();

    return NextResponse.json({
      success: true,
      message: "Get successfull",
      data: cars,
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

export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();

    const car = await prisma.vehicle.findUnique({
      where: { id: id },
      select: { imagePublicId: true },
    });

    if (!car) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 }
      );
    }

    if (car.imagePublicId) {
      await cloudinary.uploader.destroy(car.imagePublicId);
    }

    const res = await prisma.vehicle.delete({ where: { id: id } });

    return NextResponse.json({
      success: true,
      message: "Delete successfull",
      data: res,
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
    const {
      id,
      brand,
      carName,
      model,
      mileage,
      engine,
      transmission,
      price,
      carType,
      description,
      image,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Car ID is required" },
        { status: 400 }
      );
    }

    const existingCar = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingCar) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 }
      );
    }

    // update image
    let imageUrl = existingCar.imageUrl;
    let publicId = existingCar.imagePublicId;

    if (image && !image.startsWith("http")) {
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "car_images",
        resource_type: "image",
      });

      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    // update data in db
    const response = await prisma.vehicle.update({
      where: { id: id },
      data: {
        brand,
        carName,
        model,
        mileage,
        engine: engine ? engine.toUpperCase() : existingCar.engine,
        transmission: transmission
          ? transmission.toUpperCase()
          : existingCar.transmission,
        price,
        carType: carType ? carType.toUpperCase() : existingCar.carType,
        description,
        imageUrl,
        imagePublicId: publicId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Car updated successfully.",
      data: response,
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
