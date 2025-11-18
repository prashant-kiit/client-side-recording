import { serveRecording } from "./service.js";

const controlClientRecoding = (req, res) => {
  try {
    const { meetingId } = req.params;

    if (!meetingId) {
      return res.status(400).json({ error: "Meeting ID is required" });
    }

    serveRecording(meetingId);

    return res.status(200).json({ message: `${meetingId} meeting started` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { controlClientRecoding };
