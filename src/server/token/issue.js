import request from 'superagent';

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  STATE_TOKEN,
  COOKIE_ACCESS_NAME,
  COOKIE_REFRESH_NAME,
  baseUrl,
} = process.env;

export default function (req, res) {
  const {
    code,
    state,
  } = req.query;

  if (state === STATE_TOKEN) {
    return new Promise((resolve, reject) => request
      .post(`${baseUrl}/oauth2/token`)
      .type('form')
      .send({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code,
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
      res.redirect('/dashboard');
    })
    .catch((err) => {
      console.error(err);

      res.clearCookie(COOKIE_ACCESS_NAME);
      res.clearCookie(COOKIE_REFRESH_NAME);

      res.redirect('/login');
    });
  }

  // TODO: FORWARD STUFF
  return res.send('State is invalid');
}
