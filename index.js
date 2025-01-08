const express = require("express");
const cors = require("cors");
const { startCaptionWorker } = require("./lib/workers.js");
const { rateLimit } = require("express-rate-limit");
const { videoTranscriptRoute } = require("./controllers/video-transcript");
const { createNewApiKey } = require("./controllers/new-api-key");
const authMiddleware = require("./middlewares/auth.js");

// INITS
startCaptionWorker();
const app = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many requests, 10 requests per 15 minutes are allowed.",
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use(limiter);

// Routes
app.use(authMiddleware);
app.post("/get-video-caption", videoTranscriptRoute);
app.post("/new-key", createNewApiKey);

app.listen(process.env.PORT || 3000, () => {
  console.log("Node server Started");
});
