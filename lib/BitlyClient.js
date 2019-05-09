const fetch = require("node-fetch");
const token = process.env.ERICKA_KEY_BITLY;

class BitlyClient {
  async sorten(long_url) {
    const res = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      body: JSON.stringify({ long_url }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      return await res.json();
    }
    console.log(res);
    return { error: true };
  }
}
