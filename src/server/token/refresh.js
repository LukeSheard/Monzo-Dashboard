import request from 'superagent';
import {
  get,
  isEmpty,
} from 'lodash/fp';

const {
  CLIENT_ID,
  CLIENT_SECRET,
  COOKIE_ACCESS_NAME,
  COOKIE_REFRESH_NAME,
  baseUrl,
} = process.env;

export default function (req, res) {
  const refreshCookie = get(`signedCookies[${COOKIE_REFRESH_NAME}]`, req);

  if (isEmpty(refreshCookie)) {
    return res.redirect('/login');
  }

  return new Promise((resolve, reject) => request
    .post(`${baseUrl}/oauth2/token`)
    .type('form')
    .send({
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refreshCookie,
    })
    .end((err, monzoData) => {
      if (err) return reject(err);
      return resolve(monzoData);
    })
  ).then((data) => {
    const {
      body,
    } = data;

    res.cookie(COOKIE_ACCESS_NAME, body.access_token, {
      domain: req.hostname,
      httpOnly: true,
      signed: true,
      maxAge: body.expires_in * 1000,
    });

    return res.cookie(COOKIE_REFRESH_NAME, body.refresh_token, {
      domain: req.hostname,
      httpOnly: true,
      signed: true,
    });
  }).then(() => {
    if (req.params.redirect) {
      return res.redirect(req.params.redirect);
    }

    return res.redirect('/dashboard');
  })
  .catch((err) => {
    console.error(err);

    res.clearCookie(COOKIE_ACCESS_NAME);
    res.clearCookie(COOKIE_REFRESH_NAME);

    res.redirect('/login');
  });
}
