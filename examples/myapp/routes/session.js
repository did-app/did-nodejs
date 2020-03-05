var express = require("express");
var router = express.Router();
var { Issuer } = require("openid-client");

var { CLIENT_ID, CLIENT_SECRET } = process.env;

var clientPromise = Issuer.discover("https://did.app").then(function(issuer) {
  console.log("Discovered issuer %s %O", issuer.issuer, issuer.metadata);
  return new issuer.Client({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  });
});

router.get("/authenticate", function(req, res, next) {
  clientPromise.then(function(client) {
    var authorizationUrl = client.authorizationUrl({
      scope: "openid",
      redirect_uri: "http://localhost:3000/session/callback"
    });
    res.redirect(authorizationUrl);
  });
});

router.get("/callback", function(req, res, next) {
  clientPromise
    .then(function(client) {
      var params = client.callbackParams(req);
      return client.callback("http://localhost:3000/session/callback", params);
    })
    .then(function(tokenSet) {
      var claims = tokenSet.claims();
      console.log(claims);
      req.session = { userId: claims.sub };
      res.redirect("/");
    });
});

module.exports = router;
