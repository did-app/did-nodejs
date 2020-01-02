# Kno nodejs

### Go Passwordless

Use [trykno.com](https://trykno.com) for the simplest way to add passwordless authentication to your application.

Kno is a service for implementing passwordless authentication, it handles sending emails so you don't have too. It also allows users to set up device based authentication so they don't have to wait for any email, after the first.

## Installation

Add Kno to your project, it can be fetched from [npm](https://www.npmjs.com/package/kno) as follows.

```
$ npm install --save kno
```

## Usage

This library integrates Kno into any express based web application.
So it works with most frameworks,

#### Configure middleware

Use the `kno.Session` middleware in your application.
This middleware requires a session middleware to already be used, if in doubt `express-session` works well.

```JavaScript
app.use(kno.Session({
  signInRedirect: "/dashboard"
}))
```

#### Modify templates

Using the Kno middleware adds some helpers that can be used when rendering responses.
Add the sign in/out button to your page.

```pug
header !{kno.sessionButton()}
```

#### Check user is authenticated

Any route or middleware that follows the Kno middleware can check if the request comes from an authenticated user.
Kno adds the `personaID` id to the express request object.
If the request is unauthenticated then the `personaID` is undefined.

If you don't want to keep checking for undefined a simple middleware to require authentication can be created as follows.

```js
function protected(req, res, next) {
  if (req.personaID) {
    next();
  } else {
    res.status(403);
    res.send("Authentication required to access this page");
  }
}

app.get("/protected", protected, function(req, res) {
  // ... Show the protected page
});
```

#### Local development

Authentication is now setup for local development.
Run locally and click the sign in button and you should see a sign in modal.

Enter your **real** email address. Kno runs a service for local development that sends a limited number of emails.

### Get production keys

Create an account at [trykno.com](https://trykno.com) and follow the guidance to create your first space.
This will direct you to create a `site_token` and `api_token`.
Add these to your environment and edit the middleware configuration.

```JavaScript
app.use(kno.Session({
  signInRedirect: "/dashboard",
  siteToken: process.env.KNO_SITE_TOKEN,
  apiToken: process.env.KNO_API_TOKEN
}))
```

**NOTE: The tokens do not have to be stored in the environment.
However the api token MUST be kept secure and should not be committed to your applications source code.**

## Contributing

Contributions are very welcome. Please do open an issue or pull request or reach out to us at [team@trykno.com](mailto:team@trykno.com)

#### Docker

If you do not have node installed you can run locally in Docker with the following command.

```bash
docker run \
  -it \
  --rm \
  -w="/opt/app" \
  -v="$(pwd):/opt/app" \
  -p="3000:3000" \
  --network="host" \
  node:12.14.0 bash
```
