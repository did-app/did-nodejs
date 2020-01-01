# Kno nodejs

### Go Passwordless

Use [trykno.com](https://trykno.com) for the simplest way to add passwordless authentication to your application.

## Installation

```
$ npm install --save kno
```

## Usage

```JavaScript
const app = require('express')()
const session = require('express-session')
const kno = require('kno')

app.use(session({
  secret: "Choose something more secret, please."
}))

app.use(kno.Session({
  signInRedirect: "/dashboard"
}))
```

```JavaScript
process.env.KNO_SITE_TOKEN
process.env.KNO_API_TOKEN
```

## Contributing

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
