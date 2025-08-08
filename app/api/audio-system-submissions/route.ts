import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductSubmission from "@/models/ProductSubmission";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      brand,
      model,
      type,
      manufacturingYear,
      description,
      cosmeticCondition,
      hasBox,
      hasInvoice,
      invoiceDate,
      quantity,
      images,
      category
    } = body;

    await connectDB();

    const submission = new ProductSubmission({
      brand,
      model,
      type,
      manufacturingYear,
      description,
      cosmeticCondition,
      hasBox,
      hasInvoice,
      invoiceDate,
      quantity,
      images,
      category,
      status: "pending",
      createdAt: new Date(),
    });

    await submission.save();

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error in audio-system-submissions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}