#!/usr/bin/env bash
# Verifies the help links the Slotiva plugin points at this docs site.
#
# The plugin builds every link with docsUrl( path, anchor ) (src-react/admin/shared/docs.js).
# This script finds each docsUrl( ... ) call in the plugin's src-react, expands it for both
# languages (en, and tr under /tr/) against the LIVE site, fetches the page with curl and
# checks that id="<anchor>" is present in the HTML. A link whose page or heading is gone fails.
# Anchors are the contract in scripts/fixed-ids.txt (never renamed).
#
# Usage:
#   bash scripts/check-plugin-links.sh [path-to-plugin-src-react]
#   (default: ../mhm-slotiva/src-react)
#   DOCS_ORIGIN=https://example/ bash scripts/check-plugin-links.sh   # override the site root

set -euo pipefail

SRC="${1:-../mhm-slotiva/src-react}"
ORIGIN="${DOCS_ORIGIN:-https://maxhandmade.github.io/mhm-slotiva-docs/}"
ORIGIN="${ORIGIN%/}/"

if [ ! -d "$SRC" ]; then
  echo "ERROR: plugin source not found at '$SRC'. Pass the path to its src-react as the first argument." >&2
  exit 2
fi

# docsUrl( 'path/', 'anchor' ) or docsUrl( 'path/' ) -> "path anchor" per line.
# Only call sites are read: the definition and the tests are skipped.
mapfile -t calls < <(
  grep -rhoE "docsUrl\( *'[^']+'( *, *'[^']*')? *\)" "$SRC" \
    --include='*.js' --include='*.jsx' --exclude-dir=__tests__ \
    | sed -E "s/docsUrl\( *'([^']+)'( *, *'([^']*)')? *\)/\1 \3/" \
    | sort -u
)

if [ "${#calls[@]}" -eq 0 ]; then
  echo "WARNING: no docsUrl( ... ) calls found under $SRC." >&2
  exit 2
fi

fail=0
pass=0
declare -A cache

for lang in en tr; do
  prefix=""
  [ "$lang" = "tr" ] && prefix="tr/"
  for call in "${calls[@]}"; do
    path="${call%% *}"
    anchor=""
    [[ "$call" == *" "* ]] && anchor="${call#* }"
    url="${ORIGIN}${prefix}docs/${path}"

    if [ -z "${cache[$url]+x}" ]; then
      if ! cache[$url]="$(curl -fsS --max-time 30 "$url" 2>&1)"; then
        echo "FAIL [$lang] $url  (page not reachable: ${cache[$url]})"
        cache[$url]=""
        fail=$((fail + 1))
        continue
      fi
    elif [ -z "${cache[$url]}" ]; then
      fail=$((fail + 1))
      echo "FAIL [$lang] $url${anchor:+#$anchor}  (page not reachable)"
      continue
    fi

    if [ -n "$anchor" ] && ! grep -qF "id=\"$anchor\"" <<<"${cache[$url]}"; then
      echo "FAIL [$lang] $url#$anchor  (no id=\"$anchor\" in the page)"
      fail=$((fail + 1))
      continue
    fi
    echo "OK   [$lang] $url${anchor:+#$anchor}"
    pass=$((pass + 1))
  done
done

echo ""
echo "Plugin link check: ${pass} OK, ${fail} broken"
[ "$fail" -gt 0 ] && exit 1
exit 0
