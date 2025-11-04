import React from 'react';

interface CosmeticConditionSectionProps {
  cosmeticCondition: string;
  setCosmeticCondition: (value: string) => void;
  showTooltip: boolean;
  setShowTooltip: (value: boolean) => void;
}

const CosmeticConditionSection: React.FC<CosmeticConditionSectionProps> = ({
  cosmeticCondition,
  setCosmeticCondition,
  showTooltip,
  setShowTooltip
}) => {
  const conditions = ["Kötü", "İyi", "Çok iyi", "Mükemmel"];

  return (
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
  );
};

export default CosmeticConditionSection;
