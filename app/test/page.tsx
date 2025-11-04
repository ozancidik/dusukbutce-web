export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Test Sayfası</h1>
      <p>Eğer bu sayfayı görüyorsan, sunucu çalışıyor!</p>
      <p>Zaman: {new Date().toLocaleString()}</p>
    </div>
  );
}

