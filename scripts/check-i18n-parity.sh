#!/usr/bin/env bash
# i18n parity + fixed heading IDs.
#
# 1. Every English doc under docs/ has a Turkish file at the same path under
#    i18n/tr/docusaurus-plugin-content-docs/current/ (and every _category_.json label is translated in current.json
#    is NOT checked here — Docusaurus falls back to English, which the browser pass catches).
#    Every release-notes post under blog/ has a Turkish file of the same name under
#    i18n/tr/docusaurus-plugin-content-blog/ (otherwise the Turkish site shows the English post).
# 2. Every line "<docs-relative-path> <id>" in scripts/fixed-ids.txt exists as "{#<id>}" in BOTH the English and the
#    Turkish file. These IDs are a contract: the plugin (Slotiva 1.0.3+) deep-links to them, so they never change.
#
# Exit 0 = parity and IDs OK; 1 = something missing (each problem printed).
set -uo pipefail
cd "$( dirname "$0" )/.."
TR_ROOT="i18n/tr/docusaurus-plugin-content-docs/current"
fail=0
docs=0
while IFS= read -r -d '' f; do
  rel="${f#docs/}"
  docs=$((docs + 1))
  if [ ! -f "$TR_ROOT/$rel" ]; then
    echo "MISSING TR: $TR_ROOT/$rel (for docs/$rel)"
    fail=1
  fi
done < <(find docs -type f \( -name '*.md' -o -name '*.mdx' \) -print0)
BLOG_TR="i18n/tr/docusaurus-plugin-content-blog"
posts=0
if [ -d blog ]; then
  while IFS= read -r -d '' f; do
    rel="${f#blog/}"
    posts=$((posts + 1))
    if [ ! -f "$BLOG_TR/$rel" ]; then
      echo "MISSING TR: $BLOG_TR/$rel (for blog/$rel)"
      fail=1
    fi
  done < <(find blog -type f \( -name '*.md' -o -name '*.mdx' \) -print0)
fi
ids=0
while read -r rel id; do
  [ -z "${rel:-}" ] && continue
  case "$rel" in \#*) continue ;; esac
  ids=$((ids + 1))
  for f in "docs/$rel" "$TR_ROOT/$rel"; do
    if [ ! -f "$f" ]; then
      echo "MISSING FILE for fixed id {#$id}: $f"
      fail=1
    elif ! grep -qF "{#$id}" "$f"; then
      echo "MISSING ID {#$id} in $f"
      fail=1
    fi
  done
done < scripts/fixed-ids.txt
echo "i18n parity: $docs English docs and $posts release-notes posts checked, $ids fixed ids checked in EN + TR"
exit $fail
