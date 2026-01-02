import React from "react";
import connectDB from "@/lib/mongodb";
import ProductSubmission from "@/models/ProductSubmission";
import mongoose from "mongoose";
import Link from "next/link";

type ListingSubmission = {
  _id: string;
  category?: string;
  brand?: string;
  model?: string;
  cosmeticCondition?: string;
  hasWarranty?: boolean;
  warrantyDuration?: string;
  hasBox?: boolean;
  hasInvoice?: boolean;
  invoiceDate?: string;
  images?: string[];
  listing?: {
    price?: number;
    title?: string;
    description?: string;
    date?: string;
  };
};

export default async function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Geçersiz ilan.
      </div>
    );
  }

  await connectDB();

  const listing = (await ProductSubmission.findOne({
    _id: id,
    status: "listed",
  }).lean()) as ListingSubmission | null;

  if (!listing) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        İlan bulunamadı.
      </div>
    );
  }

  const title =
    listing.listing?.title ||
    `${listing.brand || ""} ${listing.model || ""}`.trim() ||
    "Satılık İlan";
  const price = listing.listing?.price;
  const images = listing.images || [];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        minHeight: "100vh",
        padding: "24px 12px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e5e7eb",
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>
              Satılık İlan
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: "800",
                color: "#0f172a",
                lineHeight: "1.2",
              }}
            >
              {title}
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
              color: "white",
              padding: "12px 16px",
              borderRadius: "14px",
              boxShadow: "0 10px 24px rgba(220, 38, 38, 0.35)",
              border: "1px solid rgba(255,255,255,0.25)",
              minWidth: "180px",
            }}
          >
            <div style={{ textAlign: "center", width: "100%" }}>
              <div style={{ fontSize: "12px", fontWeight: "800", opacity: 0.95, letterSpacing: "0.6px" }}>
                FİYAT
              </div>
              <div style={{ fontSize: "28px", fontWeight: "1000", lineHeight: "1.1" }}>
                {typeof price === "number"
                  ? `${price.toLocaleString("tr-TR")} TL`
                  : "Fiyat yok"}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "14px" }}>
          <Link href="/satilik-ilanlar" style={{ textDecoration: "none" }}>
            <span style={{ color: "#2563eb", fontWeight: "700" }}>
              ← Satılık ilanlara geri dön
            </span>
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "800", marginBottom: "12px" }}>
              Fotoğraflar
            </div>

            {images.length === 0 ? (
              <div
                style={{
                  height: "220px",
                  borderRadius: "14px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                  fontSize: "48px",
                }}
              >
                🖼️
              </div>
            ) : (
              <>
                <div
                  style={{
                    height: "260px",
                    borderRadius: "14px",
                    border: "1px solid #e5e7eb",
                    background: "#f9fafb",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={images[0]}
                    alt={title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      background: "#f9fafb",
                    }}
                  />
                </div>
                {images.length > 1 && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {images.slice(0, 10).map((src, idx) => (
                      <img
                        key={`thumb-${idx}`}
                        src={src}
                        alt={`${title} fotoğraf ${idx + 1}`}
                        style={{
                          width: "64px",
                          height: "64px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          border: "1px solid #e5e7eb",
                          background: "#fff",
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "800", marginBottom: "12px" }}>
              İlan Bilgileri
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px",
              }}
            >
              <Info label="Kategori" value={listing.category || "-"} />
              <Info label="Marka" value={listing.brand || "-"} />
              <Info label="Model" value={listing.model || "-"} />
              <Info label="Kozmetik Durum" value={listing.cosmeticCondition || "-"} />
              <Info
                label="Garanti"
                value={
                  listing.hasWarranty
                    ? `Var${listing.warrantyDuration ? ` (${listing.warrantyDuration})` : ""}`
                    : "Yok"
                }
              />
              <Info label="Kutu" value={listing.hasBox ? "Var" : "Yok"} />
              <Info
                label="Fatura"
                value={
                  listing.hasInvoice
                    ? `Var${listing.invoiceDate ? ` (${listing.invoiceDate})` : ""}`
                    : "Yok"
                }
              />
            </div>

            {!!listing.listing?.description && (
              <div style={{ marginTop: "14px" }}>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>
                  Açıklama
                </div>
                <div style={{ color: "#334155", lineHeight: "1.6" }}>
                  {listing.listing.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "12px",
      }}
    >
      <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>
        {label}
      </div>
      <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>
        {value}
      </div>
    </div>
  );
}


