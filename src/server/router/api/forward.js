import {
  stringify,
} from 'querystring';

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  STATE_TOKEN,
  COOKIE_NAME,
  authUrl,
} = process.env;

export default function (req, res) {
  const redirectConfig = stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state: STATE_TOKEN,
    response_type: 'code',
  });

  return res.redirect(`${authUrl}/?${redirectConfig}`);
}
