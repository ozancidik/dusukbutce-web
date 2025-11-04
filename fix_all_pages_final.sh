#!/bin/bash

# Tüm bize-sat sayfalarındaki syntax hatalarını düzelt
echo "Bize-sat sayfalarındaki syntax hataları düzeltiliyor..."

# Her dosyayı tek tek düzelt
files=(
  "app/bize-sat/audio-system/page.tsx"
  "app/bize-sat/case/page.tsx"
  "app/bize-sat/cooler/page.tsx"
  "app/bize-sat/gaming-wheel/page.tsx"
  "app/bize-sat/graphics-card/page.tsx"
  "app/bize-sat/headphones/page.tsx"
  "app/bize-sat/keyboard/page.tsx"
  "app/bize-sat/monitor/page.tsx"
  "app/bize-sat/mouse/page.tsx"
  "app/bize-sat/notebook/page.tsx"
  "app/bize-sat/processor/page.tsx"
  "app/bize-sat/ram/page.tsx"
  "app/bize-sat/sound-system/page.tsx"
  "app/bize-sat/ssd/page.tsx"
  "app/bize-sat/steering-wheel/page.tsx"
  "app/bize-sat/desktop/page.tsx"
  "app/bize-sat/tablet/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Düzeltiliyor: $file"
    
    # Duplicate useEffect cleanup function'ları ve return statement'ları temizle
    sed -i '' '/}, \[\];.*}, \[\];/d' "$file"
    sed -i '' '/return \(\) => {/,/}, \[\];/d' "$file"
    
    # Duplicate useEffect bloklarını temizle
    sed -i '' '/useEffect(() => {/,/}, \[\];/d' "$file"
    
    # useEffect'i yeniden ekle
    sed -i '' '/const \[formData, setFormData\] = useState/a\
  useEffect(() => {\
    const checkMobile = () => {\
      setIsMobile(window.innerWidth <= 768);\
    };\
    \
    checkMobile();\
    window.addEventListener("resize", checkMobile);\
    \
    return () => {\
      window.removeEventListener("resize", checkMobile);\
    };\
  }, []);\
\
  // Login sonrası form verilerini geri yükle\
  useEffect(() => {\
    if (pendingFormData && Object.keys(pendingFormData).length > 0) {\
      setFormData(prev => ({ ...prev, ...pendingFormData }));\
      setPendingFormData(null);\
    };\
  }, [pendingFormData, setPendingFormData]);' "$file"
    
    echo "  ✓ $file düzeltildi"
  else
    echo "  ✗ $file bulunamadı"
  fi
done

echo "Tüm dosyalar düzeltildi!" 