import React from 'react';

interface BoxAndInvoiceSectionProps {
  hasBox: boolean;
  setHasBox: (value: boolean) => void;
  hasInvoice: boolean;
  setHasInvoice: (value: boolean) => void;
  invoiceDate: string;
  setInvoiceDate: (value: string) => void;
}

const BoxAndInvoiceSection: React.FC<BoxAndInvoiceSectionProps> = ({
  hasBox,
  setHasBox,
  hasInvoice,
  setHasInvoice,
  invoiceDate,
  setInvoiceDate
}) => {
  return (
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
  );
};

export default BoxAndInvoiceSection;
