#!/bin/bash
set -e
cd "$(dirname "$0")"
rm -rf dist
mkdir dist

for target in chrome firefox; do
  mkdir -p dist/_tmp/icons
  if [ "$target" = "firefox" ]; then
    cp manifest-firefox.json dist/_tmp/manifest.json
  else
    cp manifest.json dist/_tmp/manifest.json
  fi
  cp popup.html popup.css popup.js PRIVACY.md dist/_tmp/
  cp icons/*.png dist/_tmp/icons/
  cd dist/_tmp
  zip -r "../geminos-twitch-title-generator-${target}-v1.0.0.zip" . >/dev/null
  cd ../..
  rm -rf dist/_tmp
  echo "Packaged: $target"
done

echo ""
ls -lh dist/*.zip
