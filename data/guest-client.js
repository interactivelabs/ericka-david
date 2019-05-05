const db = require("./db");
const query = db;

class GuestClient {
  async getAllGuests() {
    const sql = "SELECT * FROM guests";
    const result = await query(sql);
    return result.rows;
  }
  async searchGuest(name) {
    const sql =
      "SELECT * FROM guests WHERE firstname ilike $1 OR lastname ilike $1 OR familyname ilike $1;";
    const result = await query(sql, [name]);
    return result.rows;
  }
  async addGuest(values) {
    console.log(values);
    return values;
  }
  async confirm(code) {
    return await true;
  }
}

module.exports = GuestClient;
