#!/usr/bin/env bash
# Projeyi ayağa kaldırmak için: bağımlılıkları kurar ve geliştirme sunucusunu başlatır.
set -e
cd "$(dirname "$0")/.."

# nvm varsa kullan (macOS/Linux)
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
  [ -f .nvmrc ] && nvm use
fi

if ! command -v node &>/dev/null; then
  echo "Node.js bulunamadı. Lütfen kurun: https://nodejs.org veya 'brew install node'"
  exit 1
fi

echo "Bağımlılıklar kuruluyor..."
npm install

echo "Geliştirme sunucusu başlatılıyor (http://localhost:3000)..."
npm run dev
