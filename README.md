# Client Side Recording

A system for recording a web page's UI as a video. A headless Chrome
instance (via Puppeteer) opens the client app, drives its recording
button, and captures a screencast of the page which is piped through
FFmpeg into an MP4 file.

## How it works

1. The **client** (React + Vite) renders a simple UI with a
   "Start/Stop Client Side Recording" button, a running timer, and
   milestone messages triggered at set intervals.
2. The **server** (Node + Express) launches a headless browser with
   Puppeteer, navigates to the client app, and clicks the record
   button to kick things off.
3. Chrome DevTools Protocol (`Page.startScreencast`) streams JPEG
   frames of the page back to the server.
4. Each frame is written to an FFmpeg process's stdin, which encodes
   the stream to H.264 and saves it as `server/recordings/meeting.mp4`.

## Project structure

```
client/       React app (Vite) with the recording UI
server/       Express + Puppeteer service that drives the browser
              and produces the recording
```

## Prerequisites

- Node.js
- [FFmpeg](https://ffmpeg.org/) available on your `PATH`

## Setup

Install dependencies for both apps:

```bash
cd client && npm install
cd ../server && npm install
```

## Running

Start the client dev server first, then run the recording script:

```bash
# Terminal 1 - client
cd client
npm run dev        # serves the app on http://localhost:5173

# Terminal 2 - server
cd server
node index.js       # launches Puppeteer, clicks record, saves the MP4
```

The recorded video is written to `server/recordings/meeting.mp4`.

## Client scripts

| Command         | Description                        |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start the Vite dev server           |
| `npm run build` | Build the client for production     |
| `npm run lint`  | Run ESLint                          |
| `npm run preview` | Preview the production build      |
