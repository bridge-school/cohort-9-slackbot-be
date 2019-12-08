const db = require("./../../db/index");

const postPolls = function(req, res) {
  const body = req.body;
  console.log(body);
  res.set("Content-Type", "application/json");
  res.send(`Received new Poll: ${body.message}`);

  // Function to insert data
  const insertData = (col, data) => {
    const doc = db
      .collection(col)
      // Table
      .doc();
    const id = doc.id;
    data["id"] = id;
    return (
      doc
        // Data. .set returns a promise
        .set(data)
    );
  };
  // Function call to insert data
  insertData("SLACKBOT_TEST", body)
    .then(() => {
      console.log(`Success`);
    })
    .catch(err => console.error(err));
};

const getData = col => {
  return (
    db
      // Table
      .collection(col)
      .get()
      // table is an object that will contain the data if it exists
      .then(querySnapshot => {
        const allData = [];
        querySnapshot.forEach(doc => allData.push(doc.data()));
        return allData;
      })
  );
};

const getPolls = async (req, res) => {
  getData("SLACKBOT_TEST")
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Something broke!");
    });
};

module.exports = { postPolls, getPolls };
