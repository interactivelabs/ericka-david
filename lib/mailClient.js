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
  return {
    success: !body.error_count,
    recipientid: body.persisted_recipients[0]
  };
};

const deleteContact = async recipientid => {
  const request = {
    method: "DELETE",
    url: "/v3/contactdb/recipients",
    body: [recipientid]
  };
  const [{ statusCode }] = await client.request(request);
  return { statusCode };
};

const getCampaigns = async () => {
  const request = {
    method: "GET",
    url: "/v3/campaigns"
  };
  const [{ statusCode }] = await client.request(request);
  return { statusCode };
};

const sendCampaign = async campaignId => {
  const request = {
    method: "POST",
    url: `/v3/campaigns/${campaignId}/schedules/now`
  };
  const [{ statusCode }] = await client.request(request);
  return { statusCode };
};

module.exports = {
  addContact,
  deleteContact,
  getCampaigns,
  sendCampaign
};
