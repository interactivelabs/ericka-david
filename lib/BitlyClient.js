const fetch = require("node-fetch");
const token = process.env.ERICKA_KEY_BITLY;

const method = "POST";
const BITLY_BASE_URI = "https://api-ssl.bitly.com/v4";
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
  "Content-Type": "application/json"
};

class BitlyClient {
  async sorten(long_url) {
    const body = JSON.stringify({ long_url });
    const res = await fetch(`${BITLY_BASE_URI}/shorten`, {
      method,
      body,
      headers
    });
    if (res.ok) {
      return await res.json();
    }
    throw res.error;
  }
}

module.exports = BitlyClient;
