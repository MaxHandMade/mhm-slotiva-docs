#!/usr/bin/env bash
# Forbidden names in the built site (template leakage from the sister product's docs, wrong product vocabulary).
# Scans build/**/*.html text (tags stripped is not needed: a hit anywhere is a defect). Run after `npm run build`.
# Exit 0 = clean; 1 = hits printed as file:match.
set -uo pipefail
cd "$( dirname "$0" )/.."
[ -d build ] || { echo "build/ missing: run npm run build first" >&2; exit 2; }
PATTERN='Rentiva|rentiva|[Vv]ehicle|[Rr]ental|kiralama|Kiralama|araç kirala'
hits=$(grep -rnoE "$PATTERN" build --include='*.html' | sort -u)
files=$(find build -name '*.html' | wc -l)
if [ -n "$hits" ]; then
  echo "$hits"
  echo "Forbidden names: $(echo "$hits" | wc -l) hit(s) in $files HTML files"
  exit 1
fi
echo "Forbidden names: 0 hits in $files HTML files"
