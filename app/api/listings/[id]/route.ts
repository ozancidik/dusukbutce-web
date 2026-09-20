import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductSubmission from "@/models/ProductSubmission";
import mongoose from "mongoose";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Geçersiz ilan ID" }, { status: 400 });
    }

    const listing = await ProductSubmission.findById(id);

    if (!listing) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: listing });
  } catch (error) {
    console.error("Error fetching listing by id:", error);
    return NextResponse.json(
      { error: "İlan getirilemedi" },
      { status: 500 }
    );
  }
}
