const Session = require("./models/session.model.js");
class Store {
  constructor(mongoClient) {
    this.client = mongoClient;
    this.db = this.client.db();
  }
  async get(sid) {
    try {
      const session = await Session.findById(sid);
      return session ? session.data : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async set(sid, sessionData, expiration) {
    try {
      await Session.updateOne(
        { _id: sid },
        { $set: { data: sessionData, expires: expiration } },
        { upsert: true }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async destroy(sid) {
    try {
      await Session.deleteOne({ _id: sid });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = Store;
