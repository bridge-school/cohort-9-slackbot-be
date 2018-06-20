const healthController = (req, res) => {
  return res.json({
    ok: "OK"
  });
};

module.exports = {
  healthController
}
