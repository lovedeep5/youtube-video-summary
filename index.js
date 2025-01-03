const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const { videoTranscriptRoute } = require("./controllers/videoTranscript");

// INITS
const app = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use(limiter);

// Routes
app.post("/get-video-caption", videoTranscriptRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Node server Started");
});
