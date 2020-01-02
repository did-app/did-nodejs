function knoScript(cdnHost, siteToken) {
  return (
    '<script src="' +
    cdnHost +
    '/pass.js", data-site="' +
    siteToken +
    '"></script>'
  );
}
module.exports = function Helpers(personaID, config) {
  var { cdnHost, siteToken } = config;
  function sessionButton() {
    if (personaID) {
      return (
        '<form action="/session/terminate">' +
        '<button type="submit">Sign out</button></form>'
      );
    } else {
      return (
        '<form action="/session/new">' +
        knoScript(cdnHost, siteToken) +
        '<button type="submit">Sign in</button></form>'
      );
    }
  }
  return { sessionButton };
};
