const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_DB_URI;
const mongoClient = new MongoClient(uri);

const database = mongoClient.db("yt-captions");
const captionQueueCollection = database.collection("yt-caption-queue");
const captionCompletedCollection = database.collection("yt-caption-completed");
const captionAPICollection = database.collection("yt-caption-api");

module.exports = {
  captionQueueCollection,
  captionCompletedCollection,
  captionAPICollection,
};
