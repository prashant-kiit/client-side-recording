import fs from "fs-extra";
import { startMeetingRecording } from "./repository.js";

const serveRecording = async (meetingId) => {
  console.log(`Serving recording for ${meetingId}`);
  await fs.ensureDir("./recordings");
  await startMeetingRecording(
    "http://localhost:5173",
    60000
  );
};

export { serveRecording };

