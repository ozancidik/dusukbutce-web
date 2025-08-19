"use client";
import React, { useState, useEffect } from "react";

export default function BuyNotebookPage() {
  const [hasBox, setHasBox] = useState(false);
  const [hasInvoice, setHasInvoice] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [cosmeticCondition, setCosmeticCondition] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [screenStatus, setScreenStatus] = useState("");
  const [deadPixelCount, setDeadPixelCount] = useState("");
  const [hasDDR4, setHasDDR4] = useState(false);
  const [hasDDR5, setHasDDR5] = useState(false);
  const [hasSSD, setHasSSD] = useState(false);
  const [hasHDD, setHasHDD] = useState(false);
  const [hasSSDHDD, setHasSSDHDD] = useState(false);
  const [hasIntel, setHasIntel] = useState(false);
  const [hasAMD, setHasAMD] = useState(false);
  const [hasNVIDIA, setHasNVIDIA] = useState(false);
  const [hasAMDGPU, setHasAMDGPU] = useState(false);
  const [hasIntegrated, setHasIntegrated] = useState(false);

  const conditions = ["Kötü", "İyi", "Çok iyi", "Mükemmel"];
  const pixelCounts = ["1", "2", "3", "3+"];

  const tooltipContent = {
    "Mükemmel": "Kasasında herhangi bir çiziği veya kırığı olmayan, sıfırından farksız olan bilgisayarlardır.",
    "Çok iyi": "Kasasında en fazla 2 tane çiziği (1 - 2 cm) olan, vuruk veya kırığı olmayan bilgisayarlardır.",
    "İyi": "Kasasında en fazla 2 tane çiziği ve en fazla 1 tane derin çiziği veya zedelenmesi olan (1 - 2 cm) bilgisayarlardır.",
    "Kötü": "Diğer kozmetik durumuna göre belirtilen kriterlere uymayan bilgisayarlardır."
  };

  // ESC tuşu ile popup kapatma
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewImage(null);
      }
    };

    if (previewImage) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [previewImage]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length <= 10) {
      setImages([...images, ...files]);
    } else {
      alert("En fazla 10 fotoğraf ekleyebilirsiniz!");
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const openPreview = (image: File) => {
    setPreviewImage(image);
  };

  return (
    <div style={{
      maxWidth: 1800,
      margin: "40px auto",
      padding: 32,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 4px 32px #0001",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ color: "#2563eb", fontSize: 48, textAlign: "center", marginBottom: 32 }}>
        Dizüstü (Notebook) Sat
      </h1>

      <div style={{ display: "flex", gap: 48 }}>
        {/* Sol Sütun - Alan 1 */}
        <div style={{ flex: 1 }}>
          {/* Kutu ve Fatura */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={hasBox}
                  onChange={(e) => setHasBox(e.target.checked)}
                  style={{ width: 24, height: 24, cursor: "pointer" }}
                />
                <span style={{ fontSize: 18, fontWeight: 600 }}>Kutu</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={hasInvoice}
                  onChange={(e) => setHasInvoice(e.target.checked)}
                  style={{ width: 24, height: 24, cursor: "pointer" }}
                />
                <span style={{ fontSize: 18, fontWeight: 600 }}>Fatura</span>
              </label>
              {hasInvoice && (
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 6,
                    fontSize: 16
                  }}
                />
              )}
            </div>
          </div>

          {/* Kozmetik Durumu */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <h3 style={{ color: "#000", fontSize: 20, margin: 0 }}>Kozmetik durumu nasıl?</h3>
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: "#22c55e",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                ?
              </div>
            </div>
            {showTooltip && (
              <div style={{
                position: "absolute",
                background: "#1f2937",
                color: "white",
                padding: "12px",
                borderRadius: 8,
                fontSize: 14,
                maxWidth: 300,
                zIndex: 1000,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
              }}>
                <div><strong>Kötü:</strong> Bilgisayarda çok fazla çizik, darbeler var</div>
                <div><strong>İyi:</strong> Bilgisayarda az çizik var</div>
                <div><strong>Çok iyi:</strong> Bilgisayarda çok az çizik var</div>
                <div><strong>Mükemmel:</strong> Bilgisayarda hiç çizik yok</div>
              </div>
            )}
            <div style={{ display: "flex", gap: 12 }}>
              {conditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => setCosmeticCondition(condition)}
                  style={{
                    background: cosmeticCondition === condition ? "#2563eb" : "white",
                    color: cosmeticCondition === condition ? "white" : "#000",
                    border: "1px solid #cbd5e1",
                    borderRadius: 8,
                    padding: "12px 16px",
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          {/* Görsel Ekle */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ color: "#000", fontSize: 20, marginBottom: 16 }}>Görsel Ekle</h3>
            <p style={{ color: "#64748b", marginBottom: 16 }}>En fazla 10 fotoğraf ekleyebilirsiniz</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              style={{
                display: "inline-block",
                background: "#2563eb",
                color: "white",
                padding: "12px 24px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 16
              }}
            >
              Fotoğraf Seç
            </label>
            
            {/* 10 Kare */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 16 }}>
              {Array.from({ length: 10 }, (_, index) => (
                <div
                  key={index}
                  onClick={() => document.getElementById('image-upload')?.click()}
                  style={{
                    width: "100%",
                    height: 120,
                    border: "2px dashed #cbd5e1",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                    background: images[index] ? "white" : "#f8fafc"
                  }}
                >
                  {images[index] ? (
                    <>
                      <img
                        src={URL.createObjectURL(images[index])}
                        alt={`Fotoğraf ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 6,
                          cursor: "pointer"
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openPreview(images[index]);
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        style={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: 24,
                          height: 24,
                          cursor: "pointer",
                          fontSize: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <div style={{ fontSize: 32, color: "#cbd5e1" }}>+</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ekran Durumu */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ color: "#000", fontSize: 20, marginBottom: 16 }}>Ekran Durumu</h3>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setScreenStatus("sağlam")}
                  style={{
                    background: screenStatus === "sağlam" ? "#2563eb" : "white",
                    color: screenStatus === "sağlam" ? "white" : "#000",
                    border: "1px solid #cbd5e1",
                    borderRadius: 8,
                    padding: "12px 16px",
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Sağlam
                </button>
                <button
                  onClick={() => setScreenStatus("çizikler")}
                  style={{
                    background: screenStatus === "çizikler" ? "#2563eb" : "white",
                    color: screenStatus === "çizikler" ? "white" : "#000",
                    border: "1px solid #cbd5e1",
                    borderRadius: 8,
                    padding: "12px 16px",
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Çizikler var
                </button>
                <button
                  onClick={() => setScreenStatus("ölü piksel")}
                  style={{
                    background: screenStatus === "ölü piksel" ? "#2563eb" : "white",
                    color: screenStatus === "ölü piksel" ? "white" : "#000",
                    border: "1px solid #cbd5e1",
                    borderRadius: 8,
                    padding: "12px 16px",
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Ölü piksel var
                </button>
              </div>
              {screenStatus === "ölü piksel" && (
                <div style={{ display: "flex", gap: 8, marginTop: 8, justifyContent: "flex-end", width: "100%" }}>
                  {pixelCounts.map((count) => (
                    <button
                      key={count}
                      onClick={() => setDeadPixelCount(count)}
                      style={{
                        background: deadPixelCount === count ? "#22c55e" : "white",
                        color: deadPixelCount === count ? "white" : "#000",
                        border: "1px solid #cbd5e1",
                        borderRadius: 6,
                        padding: "8px 12px",
                        fontSize: 14,
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sağ Sütun - Notebook Özellikleri */}
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#000", fontSize: 24, marginBottom: 24, textAlign: "center" }}>Notebook Özellikleri</h3>
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
                Marka
              </label>
              <input
                type="text"
                placeholder="Örn: Asus, Dell, HP..."
                className="small-placeholder"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                  fontSize: 16,
                  height: "48px",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
                Model
              </label>
              <input
                type="text"
                placeholder="Örn: Vivobook 15, Inspiron 15..."
                className="small-placeholder"
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                  fontSize: 16,
                  height: "48px",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#374151" }}>
                İşlemci
              </label>
              <input
                type="text"
                placeholder="Örn: Intel i5 13500H,
AMD Ryzen 5..."
                className="small-placeholder"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 16,
                  height: "48px",
                  boxSizing: "border-box"
                }}
              />
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={hasIntel}
                      onChange={(e) => {
                        setHasIntel(e.target.checked);
                        if (e.target.checked) {
                          setHasAMD(false);
                        }
                      }}
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>INTEL</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={hasAMD}
                      onChange={(e) => {
                        setHasAMD(e.target.checked);
                        if (e.target.checked) {
                          setHasIntel(false);
                        }
                      }}
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>AMD</span>
                  </label>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
                Ekran Kartı
              </label>
              <input
                type="text"
                placeholder="Örn: RTX 3060, AMD..."
                className="small-placeholder"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                  fontSize: 16,
                  height: "48px",
                  boxSizing: "border-box"
                }}
              />
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={hasNVIDIA}
                      onChange={(e) => {
                        setHasNVIDIA(e.target.checked);
                        if (e.target.checked) {
                          setHasAMDGPU(false);
                        }
                      }}
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>NVIDIA</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={hasAMDGPU}
                      onChange={(e) => {
                        setHasAMDGPU(e.target.checked);
                        if (e.target.checked) {
                          setHasNVIDIA(false);
                        }
                      }}
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>AMD</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={hasIntegrated}
                      onChange={(e) => {
                        setHasIntegrated(e.target.checked);
                      }}
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>Dahili</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#374151", fontWeight: 600 }}>
                RAM
              </label>
              <input
                type="text"
                placeholder="Örn: 8GB, 16GB..."
                className="small-placeholder"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                  fontSize: 16,
                  height: "48px",
                  boxSizing: "border-box"
                }}
              />
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={hasDDR4}
                    onChange={() => {
                      setHasDDR4(!hasDDR4);
                      if (!hasDDR4) setHasDDR5(false);
                    }}
                    style={{ width: 18, height: 18 }}
                  />
                  DDR4
                </label>
                <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={hasDDR5}
                    onChange={() => {
                      setHasDDR5(!hasDDR5);
                      if (!hasDDR5) setHasDDR4(false);
                    }}
                    style={{ width: 18, height: 18 }}
                  />
                  DDR5
                </label>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#374151" }}>
                Dahili Hafıza
              </label>
              <input
                type="text"
                placeholder="Örn: 512 GB SSD, 256 GB SSD+ 1 TB HDD"
                className="small-placeholder"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 16,
                  height: "48px",
                  boxSizing: "border-box"
                }}
              />
              <div style={{ marginBottom: 16, marginTop: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={hasSSD}
                      onChange={(e) => {
                        setHasSSD(e.target.checked);
                        if (e.target.checked) {
                          setHasHDD(false);
                          setHasSSDHDD(false);
                        }
                      }}
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>SSD</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={hasHDD}
                      onChange={(e) => {
                        setHasHDD(e.target.checked);
                        if (e.target.checked) {
                          setHasSSD(false);
                          setHasSSDHDD(false);
                        }
                      }}
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>HDD</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={hasSSDHDD}
                      onChange={(e) => {
                        setHasSSDHDD(e.target.checked);
                        if (e.target.checked) {
                          setHasSSD(false);
                          setHasHDD(false);
                        }
                      }}
                      style={{ width: 20, height: 20, cursor: "pointer" }}
                    />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>SSD+HDD</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Önizleme Popup */}
      {previewImage && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000
        }}>
          <div style={{
            position: "relative",
            width: "600px",
            height: "600px",
            background: "white",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
          }}>
            <button
              onClick={() => setPreviewImage(null)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: 28,
                height: 28,
                cursor: "pointer",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1
              }}
            >
              ×
            </button>
            <img
              src={URL.createObjectURL(previewImage)}
              alt="Önizleme"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 8
              }}
            />
          </div>
        </div>
      )}
      
      {/* İleride detay formu buraya eklenebilir */}
    </div>
  );
} 