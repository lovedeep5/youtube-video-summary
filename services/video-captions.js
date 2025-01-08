const {
  captionQueueCollection,
  captionCompletedCollection,
  captionAPICollection,
} = require("../lib/db.js");
const { generateApiKey } = require("../lib/generate-api-key.js");
const { incrementDateByDays } = require("../lib/dates.js");

const saveCaption = async (caption, user_id, caption_id) => {
  try {
    const doc = await captionCompletedCollection.insertOne({
      user_id,
      caption_id,
      caption,
      timestamp: new Date(),
    });
    return doc;
  } catch (error) {
    throw new Error(`Error saving caption: ${error.message}`);
  }
};

const getCompletedCaptionByQueueId = async (caption_id) => {
  try {
    const caption = await captionCompletedCollection.findOne({
      caption_id,
    });
    return caption;
  } catch (error) {
    throw new Error(`Error fetching completed caption: ${error.message}`);
  }
};

const getCaptionsByUserId = async (user_id) => {
  try {
    const captions = await captionCompletedCollection
      .find({ user_id })
      .toArray();
    return captions;
  } catch (error) {
    throw new Error(`Error fetching captions by user ID: ${error.message}`);
  }
};

const saveCaptionQueue = async (user_id, caption_id, url) => {
  try {
    const doc = await captionQueueCollection.insertOne({
      user_id,
      caption_id,
      isProcessed: false,
      url,
      updated_at: new Date(),
      timestamp: new Date(),
    });
    return doc;
  } catch (error) {
    throw new Error(`Error saving caption queue: ${error.message}`);
  }
};

const getCaptionByQueueId = async (caption_id) => {
  try {
    const caption = await captionQueueCollection.findOne({
      caption_id,
    });
    return caption;
  } catch (error) {
    throw new Error(`Error fetching caption by queue ID: ${error.message}`);
  }
};

const updateCaptionQueueById = async (caption_id, queue_process_status) => {
  try {
    const result = await captionQueueCollection.updateOne(
      { caption_id },
      { $set: { isProcessed: queue_process_status, updated_at: new Date() } }
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating caption queue: ${error.message}`);
  }
};

const saveNewAPI = async (user_id) => {
  try {
    const apiKey = generateApiKey();

    const result = await captionAPICollection.updateOne(
      { user_id }, // Match by user_id
      {
        $set: {
          api_key: apiKey,
          valid_till: incrementDateByDays(30),
          timestamp: new Date(),
        },
      },
      { upsert: true } // Insert if not found
    );

    return { apiKey, result };
  } catch (error) {
    throw new Error(`Error saving or updating API: ${error.message}`);
  }
};

const getApiByUserId = async (user_id) => {
  try {
    const API = await captionAPICollection.findOne({
      user_id,
    });
    return API;
  } catch (error) {
    throw new Error(`Error fetching API by user ID: ${error.message}`);
  }
};

const isApivalid = async (API_KEY) => {
  try {
    const date = new Date();
    const API = await captionAPICollection.findOne({
      api_key: API_KEY,
    });

    if (!API) return false;
    if (API.valid_till < date) return false;

    return true;
  } catch (error) {
    throw new Error(`Error validating API: ${error.message}`);
  }
};

module.exports = {
  saveCaption,
  getCompletedCaptionByQueueId,
  getCaptionsByUserId,
  saveCaptionQueue,
  getCaptionByQueueId,
  updateCaptionQueueById,
  saveNewAPI,
  getApiByUserId,
  isApivalid,
};
