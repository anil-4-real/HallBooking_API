var express = require("express");
var router = express.Router();
var { MongoDb, MongoClient, dbUrl } = require("../dbConfig");

//get all the halls available
router.get("/all", async (req, res, next) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("HallBooking");
    let document = await db.collection("Halls").find().toArray();
    res.send({
      status: 200,
      data: document,
      message: "Halls displayed successfully",
    });
  } catch (e) {
    console.log(e);
    res.send({
      status: 500,
      message: "Server error",
    });
  } finally {
    client.close();
  }
});

//creating a room with seats, amenities and price
router.post("/new", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client
      .db("HallBooking")
      .collection("Halls")
      .insertOne(req.body);
    res.json({
      status: 200,
      message: "hall created successfully",
    });
  } catch (e) {
    console.log(e);
    res.send({
      status: 500,
      message: "server error",
    });
  } finally {
    client.close();
  }
});

module.exports = router;
