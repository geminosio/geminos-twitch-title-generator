# Geminos Twitch Title Generator

Free browser extension that generates creative stream title ideas for Twitch streamers. Runs 100% locally — no API, no backend, no tracking.

## Features

- Pick a game, stream style, and goal to get unique title ideas
- Toggle emoji on/off
- Generate 5 or 10 titles at a time
- One-click copy for individual titles or all at once
- Works on Firefox and Chrome/Chromium
- Zero permissions required
- No data collection whatsoever

## Install for testing

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `manifest-firefox.json` from the project folder

### Chrome / Chromium

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the project folder (uses `manifest.json`)

## Packaging

```bash
bash build.sh
```

Produces ZIP files in `dist/`.

## Privacy

All title generation happens locally. See [PRIVACY.md](PRIVACY.md).

## Version

1.0.0

## Developer

[Geminos](https://geminos.io/)

## License

Freeware
