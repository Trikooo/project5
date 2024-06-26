const Session = require("./models/session.model.js");
const { isValidObjectId } = require("mongoose");
class Store {
  constructor(mongoClient) {
    this.client = mongoClient;
    this.db = this.client.db();
  }
  async get(id) {
    if (!isValidObjectId(id)) return console.error("invalid session id");
    try {
      const session = await Session.findById(id);
      return session ? session.data : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async set(id, sessionData, expiration) {
    try {
      await Session.updateOne(
        { _id: id },
        { $set: { data: sessionData, expires: expiration } },
        { upsert: true }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async destroy(id) {
    try {
      await Session.deleteOne({ _id: id });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = Store;
