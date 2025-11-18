import puppeteer from "puppeteer";
import { spawn } from "child_process";

async function startMeetingRecording(meetingUrl, duration = 60000) {
  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--autoplay-policy=no-user-gesture-required",
    ],
  });

  const page = await browser.newPage();
  await page.goto(meetingUrl, { waitUntil: "networkidle2" });

  // Prepare MP4 output
  const outputFile = "./recordings/meeting.mp4";

  // Start FFmpeg process to create the MP4
  const ffmpeg = spawn("ffmpeg", [
    "-y", // overwrite existing file
    "-f",
    "mjpeg", // input format from Puppeteer
    "-i",
    "pipe:0", // read MJPEG frames from stdin
    "-vcodec",
    "libx264", // encode to H.264
    "-preset",
    "veryfast", // speed optimization
    "-pix_fmt",
    "yuv420p", // required for MP4 compatibility
    outputFile,
  ]);

  ffmpeg.stderr.on("data", (data) => {
    // Uncomment this for debugging:
    // console.log(data.toString());
  });

  ffmpeg.on("close", () => {
    console.log("Recording saved to:", outputFile);
  });

  // Start Chrome screencast
  const client = await page.createCDPSession();
  await client.send("Page.startScreencast", {
    format: "jpeg",
    quality: 80,
  });

  console.log("Recording started...");

  // Write each frame to FFmpeg stdin
  client.on("Page.screencastFrame", async (frame) => {
    const buffer = Buffer.from(frame.data, "base64");
    ffmpeg.stdin.write(buffer);

    await client.send("Page.screencastFrameAck", {
      sessionId: frame.sessionId,
    });
  });

  // Record for N seconds
  await new Promise((res) => setTimeout(res, duration * 1000));

  console.log("Stopping recording...");

  await client.send("Page.stopScreencast");
  ffmpeg.stdin.end();

  await browser.close();

  console.log("MP4 stored:", outputFile);
}

export { startMeetingRecording };
