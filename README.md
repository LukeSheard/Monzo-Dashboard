# Monzo-Dashboard
[![Build Status](https://travis-ci.org/LukeSheard/Monzo-Dashboard.svg?branch=master)](https://travis-ci.org/LukeSheard/Monzo-Dashboard)
[![Code Climate](https://codeclimate.com/github/LukeSheard/Monzo-Dashboard/badges/gpa.svg)](https://codeclimate.com/github/LukeSheard/Monzo-Dashboard)
[![Test Coverage](https://codeclimate.com/github/LukeSheard/Monzo-Dashboard/badges/coverage.svg)](https://codeclimate.com/github/LukeSheard/Monzo-Dashboard/coverage)
[![dependencies Status](https://david-dm.org/LukeSheard/Monzo-Dashboard/status.svg)](https://david-dm.org/LukeSheard/Monzo-Dashboard)
[![devDependencies Status](https://david-dm.org/LukeSheard/Monzo-Dashboard/dev-status.svg)](https://david-dm.org/LukeSheard/Mondo-Dashboard?type=dev)

Monzo-Dashboard is a project to build out a working web based "clone" of the existing iOS Monzo
application, currently it features a transaction list and transaction view similar to the feed
on the iOS app. However there are plans to include further features such as
- [ ] Spending Maps
- [ ] Reports
- [ ] Search

I aim to include further features made available to the app when they're launched in the API.

## Deploy Your Own Version
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Running the app
To launch the app you will need to get a Monzo develop client key. This app is isomorphic and does
not expose your client secret and thus you can use refresh tokens; thus you can select the
confidential option when creating your client.

To run the app you can either clone / download this repo, or install it on Heroku (coming soon!).
Simply set your client keys in .env of in using process.env and launch the app using `node index.js`.

### Environmeny Variable overview
Variable Name | Default | Description
--------------|---------|--------------
`COOKIE_ACCESS_NAME` | `cookie-name` | Cookie name for storing Monzo access token
`COOKIE_REFRESH_NAME` | `cookie-refresh` | Cookie name for storing Monzo refresh token
`COOKIE-SECRET` | `cookie-secret` | Secret used to sign cookies
`authUrl` | `https://auth.getmondo.co.uk` | Monzo OAuth authentication url
`baseUrl` | `https://api.getmondo.co.uk` | Monzo base API url
`CLIENT_ID` | | Monzo client ID. **The app will not start unless this is set**
`CLIENT_SECRET` | | Monzo client secret. **The app will not start unless this is set**
`REDIRECT_URI`| `http://localhost:8080` | URL OAuth emails should redirect to for your app
`STATE_TOKEN` |  | OAuth validation state, should be random and unguessable **The app will not start unless this is set**
`GOOGLE_API_KEY` | | Google developers Maps API key. **The app will not start unless this is set**
`PORT` | `8080` | Server port


## Development
This app was authored in Node 6.x, however it still supports 5.x. To install Node
refrer to their installation guide at [https://nodejs.org](nodejs.org), or use a shell extension
like [NVM](http://github.com/NVM). It is an isomorphic [React](https://reactjs.com) application
using [Redux][(https://redux.com)].

### Testing
Unit tests are written using [Tape](http://github.com/tape) and currently test all functional
areas of code.
