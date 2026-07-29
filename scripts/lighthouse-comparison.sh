#!/bin/bash
# Compara Lighthouse entre ruta SPA y SSG
# Uso: bash scripts/lighthouse-comparison.sh [/ruta]
# Ejemplo: bash scripts/lighthouse-comparison.sh /servicios

set -euo pipefail

ROUTE="${1:-/servicios}"
REPORT_DIR="reports/lighthouse"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

mkdir -p "$PROJECT_DIR/$REPORT_DIR"

echo "============================================"
echo " Lighthouse Comparison: $ROUTE"
echo "============================================"
echo ""

SPA_FILE="$PROJECT_DIR/$REPORT_DIR/spa-$(echo $ROUTE | tr '/' '-').json"
SSG_FILE="$PROJECT_DIR/$REPORT_DIR/ssg-$(echo $ROUTE | tr '/' '-').json"

echo "[1/2] Midiendo SPA original..."
npx lighthouse "http://localhost:8000$ROUTE" \
    --output=json \
    --output-path="$SPA_FILE" \
    --chrome-flags="--headless --no-sandbox" \
    --quiet

echo "[2/2] Midiendo SSG..."
npx lighthouse "http://localhost:8000/ssg$ROUTE" \
    --output=json \
    --output-path="$SSG_FILE" \
    --chrome-flags="--headless --no-sandbox" \
    --quiet

node "$SCRIPT_DIR/compare-lighthouse.js" "$SPA_FILE" "$SSG_FILE"
