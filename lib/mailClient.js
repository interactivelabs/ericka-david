const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const addContact = async user => {
  const request = {
    method: "POST",
    url: "/v3/contactdb/recipients",
    body: [
      {
        email: user.email,
        first_name: user.firstname,
        last_name: user.lastname,
        confirmcode: user.code
      }
    ]
  };
  const [response, body] = await client.request(request);
  return { success: !body.error_count };
};

module.exports = {
  addContact
};
