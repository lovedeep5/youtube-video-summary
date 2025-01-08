const { Worker } = require("bullmq");
const { redis_queue_name } = require("../constants.js");
const { connection } = require("./redis-connection.js");
const { getVideoTranscript } = require("../services/video-transcript.js");
const {
  saveCaption,
  updateCaptionQueueById,
} = require("../services/video-captions.js");

const startCaptionWorker = () => {
  const captionWorker = new Worker(
    redis_queue_name,
    async (job) => {
      const captions = await getVideoTranscript(job?.data?.url);

      await saveCaption(captions, 123456, job?.id);
      await updateCaptionQueueById(job?.id, true);
    },
    {
      ...connection,
      concurrency: 5,
    }
  );

  captionWorker.on("completed", (job) =>
    console.log(`Job ${job.id} is completed.`)
  );

  return captionWorker;
};

module.exports = { startCaptionWorker };
