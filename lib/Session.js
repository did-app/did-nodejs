var Config = require("./Config.js");
var API = require("./API.js");
var Helpers = require("./Helpers.js");

module.exports = function Session(options) {
  var config = Config(options);
  var api = API(config);

  return function(req, res, next) {
    var personaID = req.session.personaID;
    req.kno = { personaID };
    res.locals.kno = Helpers(personaID, config);
    // raise error is session not loaded
    if (req.path == "/session/new") {
      var knoToken = req.body.knoToken;
      api.authenticate(knoToken, function(error, persona) {
        if (error) {
          next(error);
        } else {
          req.session.personaID = persona.id;
          res.redirect(config.signInRedirect);
        }
      });
    } else if (req.path == "/session/terminate") {
      req.session.destroy(function() {
        res.redirect("/");
      });
    } else {
      next();
    }
  };
};
