import React from 'react';

interface ScreenStatusSectionProps {
  screenStatus: string;
  setScreenStatus: (value: string) => void;
  deadPixelCount: string;
  setDeadPixelCount: (value: string) => void;
}

const ScreenStatusSection: React.FC<ScreenStatusSectionProps> = ({
  screenStatus,
  setScreenStatus,
  deadPixelCount,
  setDeadPixelCount
}) => {
  const pixelCounts = ["1", "2", "3", "3+"];

  return (
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
  );
};

export default ScreenStatusSection;
