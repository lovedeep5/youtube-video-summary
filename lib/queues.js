const { Queue } = require("bullmq");
const { redis_queue_name } = require("../constants.js");
const { connection } = require("./redis-connection.js");

const captionsQueue = new Queue(redis_queue_name, {
  ...connection,
});

module.exports = { captionsQueue };
