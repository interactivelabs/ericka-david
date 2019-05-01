const db = require("./db");
const query = db;

class guestClient {
  async searchGuest(name) {
    const sql =
      "SELECT * FROM guests WHERE firstname ilike $1 OR lastname ilike $1 OR familyname ilike $1;";
    const result = await query(sql, [name]);
    return result.rows;
  }
  async confirm(code) {
    return await true;
  }
}

module.exports = guestClient;
