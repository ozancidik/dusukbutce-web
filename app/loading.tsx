export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40vh",
        gap: "16px",
      }}
    >
      <div className="page-loading-spinner" />
      <p style={{ margin: 0, color: "#64748b", fontWeight: 500 }}>
        Yükleniyor…
      </p>
    </div>
  );
}
