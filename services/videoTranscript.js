const { getTranscript } = require("youtube-transcript-api");
async function getVideoTranscript(videoUrl) {
  const videoId = videoUrl.split("v=")[1]; // Extract the video ID from the URL
  try {
    const transcript = await getTranscript(videoId);
    const text = transcript.map((item) => item.text).join(" "); // Combine all transcript parts into one text
    return text;
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return null;
  }
}

module.exports = { getVideoTranscript };
