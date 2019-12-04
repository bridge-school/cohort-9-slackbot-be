const newPolls = function (req, res) {
  const body = req.body.Body
  console.log(body);
  res.set('Content-Type', 'application/json')
  res.send(`Received new Poll: ${body}`);
}

module.exports = { newPolls };