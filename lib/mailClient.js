const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const addContact = async user => {
  const request = {
    method: "POST",
    url: "/v3/contactdb/recipients",
    body: [
      {
        email: user.email,
        first_name: user.fistname,
        last_name: user.lastname,
        confirmCode: user.code
      }
    ]
  };
  const [response, body] = await client.request(request);
  console.log(response.statusCode);
  console.log(body);
  return body;
};

module.exports = {
  addContact
};
