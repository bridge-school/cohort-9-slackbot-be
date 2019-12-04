const newPolls = function (req, res) {
  const body = req.body;
  console.log(body);
  res.set('Content-Type', 'application/json')
  res.send(`Received new Poll: ${body.message}`);
}

module.exports = { newPolls };