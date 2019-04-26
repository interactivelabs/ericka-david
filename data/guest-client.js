const db = require("./db");

class guestClient {
  async searchGuest(name) {
    const result = await db.find({ name });
    return result;
  }
  async createhGuest(guest) {
    const result = await db.add({ guest });
    return result;
  }
  async confirm(guestId) {
    const result = await db.update({ guestId });
    return result;
  }
}

module.exports = guestClient;
