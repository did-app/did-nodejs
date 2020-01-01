var request = require("request");

module.exports = function API(config) {
  var { apiHost, apiToken } = config;
  var authenticateURL = apiHost + "/v0/authenticate";

  function authenticate(knoToken, callback) {
    request(
      {
        method: "POST",
        url: authenticateURL,
        auth: {
          username: apiToken,
          password: ""
        },
        json: {
          token: knoToken
        }
      },
      function(error, response, body) {
        console.log(response);
        if (error) {
          callback(error);
        } else if (response.statusCode === 200) {
          const {
            persona: { id: personaID }
          } = body;
          callback(undefined, { id: personaID });
        } else if (response.statusCode) {
          throw "BADSTATUS";
          // console.log(body);
          // next();
        } else {
          throw "BAD";
        }
      }
    );
  }
  return { authenticate };
};
