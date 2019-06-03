const uuid = require("uuid/v1");
const BitlyClient = require("./BitlyClient");
const mailClient = require("./mailClient");
const db = require("../data/db");
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
    if (guest.email) {
      const { recipientid } = await mailClient.addContact(values);
      values = Object.assign(values, { recipientid });
    }
    const keys = Object.keys(values).sort();
    const params = keys.map((k, i) => `$${i + 1}`);
    const sql = `INSERT INTO guests (${keys.join(
      ","
    )}) VALUES (${params}) RETURNING guestid`;
    const result = await query(sql, keys.map(k => values[k]));
    values = Object.assign(values, { guestid: result.rows[0].guestid });
    return values;
  }
  async getGuest(code) {
    const sql = "SELECT * FROM guests WHERE code = $1;";
    const result = await query(sql, [code]);
    const guest = result.rows[0];
    return guest;
  }
  async confirm(code) {
    const sql = "UPDATE guests SET confirmed = TRUE WHERE code = $1;";
    const result = await query(sql, [code]);
    return result;
  }
  async deleteGuest(guestid) {
    let sql = "SELECT recipientid FROM guests WHERE guestid = $1;";
    let result = await query(sql, [guestid]);
    const recipientid = result.rows[0].recipientid;
    if (recipientid) {
      await mailClient.deleteContact(recipientid);
    }
    sql = "DELETE FROM guests WHERE guestid = $1;";
    result = await query(sql, [guestid]);
    return { success: result.rowCount };
  }
}

module.exports = GuestClient;
