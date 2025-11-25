// import express from "express";
// import { controlClientRecoding } from "./controller.js";

// const app = express();

// app.get("/client-side-record/:meetingId", controlClientRecoding);

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

import { startMeetingRecording } from "./repository.js";

await startMeetingRecording("http://localhost:5173");