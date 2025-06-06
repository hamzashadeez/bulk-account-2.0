import connectDB from "@/connectDB";
import Product from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    // Ensure connectDB() is awaited before querying Product
    const productDB = await Product.find({}).sort({ createdAt: -1 });

    if (!productDB) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const response = NextResponse.json(productDB);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextRequest, { params }: any) {
  const { product } = await params;

  try {
    await connectDB();

    const productDB = await Product.findOneAndDelete({ _id: product });

    const response = NextResponse.json(productDB);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: any) {
  const { product } = await params;
  const body = await request.json();

  try {
    await connectDB();

    const productDB = await Product.findOne({ _id: product });

    if (!productDB) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: product },
      body,
      { new: true }
    );

    const response = NextResponse.json(updatedProduct);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const product = new Product(body);

    await product.save();

    const response = NextResponse.json({
      product,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
