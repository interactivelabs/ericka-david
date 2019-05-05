const uuid = require("uuid/v1");
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
  async addGuest(guest) {
    const code = uuid();
    let values = Object.assign(guest, { code });
    const keys = Object.keys(values).sort();
    const params = keys.map((k, i) => `$${i + 1}`);
    const sql = `INSERT INTO guests (${keys.join(
      ","
    )}) VALUES (${params}) RETURNING guestid`;
    const result = await query(sql, keys.map(k => values[k]));
    values = Object.assign(values, { guestid: result.rows[0].guestid });
    return values;
  }
  async confirm(code) {
    return await true;
  }
}

module.exports = GuestClient;
