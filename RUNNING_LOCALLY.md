# Running Locally

This guide explains how to run the FOSDEM 2026 demo website on your local machine.

## Prerequisites

- A modern web browser (Firefox, Chrome, Safari, etc.)
- A local web server (see options below)

## Quick Start

### Option 1: Using Python (Recommended)

If you have Python installed, this is the easiest method:

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Then open your browser to: http://localhost:8000

### Option 2: Using Node.js/npx

If you have Node.js installed:

```bash
npx serve
```

This will start a server (usually on port 3000). Follow the URL shown in the terminal.

Alternatively, install a global server:
```bash
npm install -g serve
serve
```

### Option 3: Using PHP

If you have PHP installed:

```bash
php -S localhost:8000
```

Then open your browser to: http://localhost:8000

### Option 4: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on [index.html](index.html)
3. Select "Open with Live Server"

## Project Structure

```
├── index.html          # Main HTML file
├── app.js             # JavaScript application logic
├── styles.css         # Styling
├── videos.json        # Video metadata
├── videos/            # Video files
├── images/            # Image assets
└── api/               # API endpoints (for deployment)
```

## Notes

- **Don't open index.html directly**: Opening the HTML file directly (file://) may cause issues with loading resources due to browser security restrictions (CORS). Always use a local web server.
- **Port conflicts**: If port 8000 is already in use, try a different port number (e.g., 8080, 3000, 5000)
- **Dependencies**: The package.json contains deployment dependencies (@vercel/kv) which are not needed for local development

## Troubleshooting

### Videos not loading
- Ensure you're using a local web server (not opening the file directly)
- Check that the [videos](videos/) directory contains the video files
- Verify [videos.json](videos.json) has the correct video paths

### Console errors
- Open your browser's Developer Tools (F12) to see detailed error messages
- Check the Network tab to see if resources are loading correctly

## Deployment

This site is configured for deployment on:
- **Netlify**: See [netlify.toml](netlify.toml)
- **Vercel**: See [vercel.json](vercel.json)

For Google Sheets integration setup, see [SETUP_GOOGLE_SHEETS.md](SETUP_GOOGLE_SHEETS.md)
