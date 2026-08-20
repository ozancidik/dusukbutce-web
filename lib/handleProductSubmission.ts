import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import ProductSubmission from "@/models/ProductSubmission";
import User from "@/models/User";
import { sendNewSubmissionNotificationToAdmin } from "@/lib/email";
import { getVerifiedUserId } from "@/lib/auth";
import { validateBody, submissionSchema } from "@/lib/validate";
import { generateSubmissionNumber } from "@/lib/numberGenerator";

/**
 * Tüm "bize-sat" kategorileri için ortak teklif (submission) oluşturma mantığı.
 * Her kategoriye ait route.ts dosyası yalnızca bu fonksiyonu çağırır.
 *
 * Not: Yalnızca aşağıdaki ürün alanları client'tan kabul edilir. status, offer,
 * listing, adminNotes gibi iş akışı/admin alanları client body'sinden ALINMAZ.
 */
export const ALLOWED_FIELDS = [
  // Genel
  "category", "brand", "model", "type", "manufacturingYear", "size",
  "processor", "processorBrand", "graphicsCard", "graphicsCardWatt", "wattValue",
  "storage", "storageType", "ram", "ramType", "refreshRate", "screenSize",
  "batteryHealth", "condition", "cosmeticCondition", "accessories",
  "storageCapacity", "hasWarranty", "warrantyDuration", "description",
  "screenStatus", "deadPixelCount", "hasBox", "hasInvoice", "invoiceDate",
  "images", "quantity",
  // İşlemci özel
  "stokFan", "cache", "socket",
  // Ekran kartı özel
  "memory", "memoryType", "coreClock", "boostClock", "powerConsumption",
  "ports", "interface", "chipSet", "dviOutput", "furmarkResult", "opened",
  "thermalPadChanged", "miningUsed", "miningDuration", "warrantySticker",
  "coilWhine", "oxidation",
  // Kategoriye özel ek alanlar (RAM/SSD, mouse, klavye, monitör, ses sistemi)
  "capacity", "speed", "latency", "dpi", "connectivity", "switchType", "layout",
  "resolution", "panelType", "responseTime", "power",
  // Masaüstü bilgisayar özel
  "powerSupply", "motherboard", "case",
] as const;

export async function handleProductSubmission(request: Request, source: string) {
  try {
    const body = await request.json();

    const v = validateBody(submissionSchema, body);
    if (v.error) return v.error;

    const userId = getVerifiedUserId(request);

    await connectDB();

    // Sadece izin verilen ürün alanlarını al.
    const data: Record<string, unknown> = {};
    for (const key of ALLOWED_FIELDS) {
      if (body[key] !== undefined) data[key] = body[key];
    }

    const submissionNumber = await generateSubmissionNumber();

    const submission = new ProductSubmission({
      ...data,
      submissionNumber,
      userId: userId || new mongoose.Types.ObjectId(),
      status: "pending",
      createdAt: new Date(),
    });

    await submission.save();

    // Müşteri iletişim bilgilerini admin bildirim e-postasına ekle.
    let customerInfo = null;
    if (userId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          customerInfo = {
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
          };
        }
      } catch (error) {
        console.error("Müşteri bilgileri alınamadı:", error);
      }
    }

    try {
      await sendNewSubmissionNotificationToAdmin({
        ...submission.toObject(),
        customerInfo,
      });
    } catch (error) {
      console.error("Mail gönderme hatası:", error);
    }

    return NextResponse.json(
      { message: "Success", id: submission._id, submissionNumber },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error in ${source}:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
