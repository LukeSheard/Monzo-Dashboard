export default function (req, res) {
  console.log(req.signedCookies);

  res.send('BLAH');
}
