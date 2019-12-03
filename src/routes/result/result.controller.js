// const axios = require("axios");
// const { logger } = require("../../utils/logger");
const db = require("./../../db/index");

const getDataForId = (col, id) => {
  return (
    db
      // Table
      .collection(col)
      .where("id", "==", id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          throw new Error(`Data doesn't exist for id ${id}`);
        }

        let item;
        querySnapshot.forEach(doc => {
          item = doc.data();
        });

        return item;
      })
  );
};

const getResult = (req, res) => {
  getDataForId("SLACKBOT_TEST", req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Something broke!");
    });
};

// getPreviousPolls();

module.exports = { getResult };
