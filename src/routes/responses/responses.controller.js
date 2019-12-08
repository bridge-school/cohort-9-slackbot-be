const _get = require('lodash/get');

const postResponses = function (req, res) {
  const body = JSON.parse(req.body.payload);
  const response = {
    responseSelected: _get(body, 'actions[0].text.text', ''),
    questionID: _get(body, 'message.blocks[0].block_id', '')
  };
  console.log(response);
  res.set('Content-Type', 'application/json')
  res.send(`Received new Poll: ${body.message}`);
}

module.exports = { postResponses };

// check to see how do we want to filter the poll question

// update firebase with information 