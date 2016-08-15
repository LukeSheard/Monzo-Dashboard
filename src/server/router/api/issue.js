import {
  stringify
} from 'querystring';

import request from 'superagent-bluebird-promise';

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  STATE_TOKEN,
  COOKIE_NAME,
  baseUrl,
} = process.env;

export default function (req, res) {
  const {
    code,
    state,
  } = req.query;

  if (state === STATE_TOKEN) {
    return request.post(`${baseUrl}/oauth2/token`)
      .type('form')
      .send({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code,
      }).then((data) => {
        const {
          body: {
            expires_in,
            access_token,
            refresh_token,
          }
        } = data;

        const newCookie = JSON.stringify({
          issueToken: access_token,
          refreshToken: refresh_token,
        })

        res.cookie(COOKIE_NAME, newCookie, {
          domain: req.hostname,
          httpOnly: true,
          signed: true,
          maxAge: expires_in * 1000,
        });

        return;
      }).then(() => {
        res.redirect('/dashboard');
      }).catch((err) => {
        console.error(err);
        res.clearCookie(COOKIE_NAME);
        res.redirect('/login');
      });
  } else {
    // TODO: Forward on bad state
    return res.send('State is invalid');
  }
}
