const uuid = require("uuid/v1");
const BitlyClient = require("../lib/BitlyClient");
const db = require("./db");
const query = db;

const bitlyClient = new BitlyClient();

class GuestClient {
  async getAllGuests() {
    const sql = "SELECT * FROM guests";
    const result = await query(sql);
    return result.rows;
  }
  async searchGuest(name) {
    const sql =
      "SELECT firstname, lastname, code, familyname FROM guests WHERE firstname ilike $1 OR lastname ilike $1 OR familyname ilike $1;";
    const result = await query(sql, [name]);
    return result.rows;
  }
  async addGuest(guest) {
    const code = uuid().replace(/-/g, "");
    const sorten = await bitlyClient.sorten(
      `http://www.ericka-david.life/confirm/${encodeURIComponent(code)}`
    );
    const { link } = sorten;
    let values = Object.assign(guest, { code, link });
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
    const sql = "SELECT * FROM guests WHERE code = $1;";
    const result = await query(sql, [code]);
    const guest = result.rows[0];
    return guest;
  }
}

module.exports = GuestClient;
