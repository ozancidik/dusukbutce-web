import React from 'react';

interface NotebookSpecsSectionProps {
  hasIntel: boolean;
  setHasIntel: (value: boolean) => void;
  hasAMD: boolean;
  setHasAMD: (value: boolean) => void;
  hasNVIDIA: boolean;
  setHasNVIDIA: (value: boolean) => void;
  hasAMDGPU: boolean;
  setHasAMDGPU: (value: boolean) => void;
  hasIntegrated: boolean;
  setHasIntegrated: (value: boolean) => void;
  hasDDR4: boolean;
  setHasDDR4: (value: boolean) => void;
  hasDDR5: boolean;
  setHasDDR5: (value: boolean) => void;
  hasSSD: boolean;
  setHasSSD: (value: boolean) => void;
  hasHDD: boolean;
  setHasHDD: (value: boolean) => void;
  hasSSDHDD: boolean;
  setHasSSDHDD: (value: boolean) => void;
}

const NotebookSpecsSection: React.FC<NotebookSpecsSectionProps> = ({
  hasIntel,
  setHasIntel,
  hasAMD,
  setHasAMD,
  hasNVIDIA,
  setHasNVIDIA,
  hasAMDGPU,
  setHasAMDGPU,
  hasIntegrated,
  setHasIntegrated,
  hasDDR4,
  setHasDDR4,
  hasDDR5,
  setHasDDR5,
  hasSSD,
  setHasSSD,
  hasHDD,
  setHasHDD,
  hasSSDHDD,
  setHasSSDHDD
}) => {
  return (
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
            placeholder="Örn: Intel i5 13500H, AMD Ryzen 5..."
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
  );
};

export default NotebookSpecsSection;
