module.exports = function Config(options) {
  apiHost = options.apiHost || "https://api.trykno.app";
  apiToken = options.apiToken || "API_AAAAAgDOxdmUqKpE9rw82Jj0Y6DM";
  cdnHost = options.cdnHost || "https://trykno.app";
  siteToken = options.siteToken || "site_UITYJw8kQJilzVnux5VOPw";
  signInRedirect = options.signInRedirect || "/";
  return { apiHost, apiToken, cdnHost, siteToken, signInRedirect };
};
