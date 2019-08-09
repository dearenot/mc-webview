const {
  postRequest,
  getRequest,
  DEFAULT_POST_OPTIONS,
  DEFAULT_GET_OPTIONS,
  GET_DEFAULT_HEADERS,
  POST_DEFAULT_HEADERS
} = require("./utils/request");

const API_KEY = "969729166560529:468893071986771c13db4d7f68558290";
const MC_API_TOKEN = `Bearer ${API_KEY}`;
const API_HOST = "api.manychat.com";

const GET_BOT_FIELDS = "/fb/page/getBotFields";
const SET_CUF = "/fb/subscriber/setCustomField";

function getBotFields() {
  return getRequest({
    ...DEFAULT_GET_OPTIONS,
    headers: {
      ...GET_DEFAULT_HEADERS,
      Authorization: MC_API_TOKEN
    },
    hostname: API_HOST,
    path: GET_BOT_FIELDS
  });
}

function setCustomField(
  data = {
    subscriber_id: 0,
    field_id: 0,
    field_value: null
  }
) {
  return postRequest(
    {
      ...DEFAULT_POST_OPTIONS,
      headers: {
        ...POST_DEFAULT_HEADERS,
        Authorization: MC_API_TOKEN
      },
      hostname: API_HOST,
      path: SET_CUF
    },
    data
  );
}

module.exports = {
  getBotFields,
  setCustomField
};
