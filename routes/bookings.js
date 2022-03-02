var express = require("express");
var router = express.Router();
const { MongoClient, dbUrl } = require("../dbConfig");

//get all bookings
router.get("/all", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const data = await client
      .db("HallBooking")
      .collection("Bookings")
      .find()
      .toArray();

    res.send({ status: 200, mesage: "retreived all bookings", data: data });
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
});

//creating a new booking
router.post("/new", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    //destructuring req.body to make it look cleaner
    const { roomId, customerName, date, startTime, endTime } = req.body;

    const hallExists = await client
      .db("HallBooking")
      .collection("Halls")
      .find({ roomId })
      .toArray();

    //checking if the hall exists
    if (hallExists.length === 1) {
      const existingBookings = await client
        .db("HallBooking")
        .collection("Bookings")
        .find({
          roomId: roomId,
          startTime: startTime,
          endTime: endTime,
          date: date,
        })
        .toArray();

      //if there are no booking with the above roomId then immediately insert the new booking
      if (existingBookings.length === 0) {
        await client.db("HallBooking").collection("Bookings").insertOne({
          roomId,
          customerName,
          date,
          startTime,
          endTime,
          status: "booked",
        });
        console.log("before insert");
        res.json({
          status: 200,
          message: `hall has been successfully booked on ${date} from ${startTime} Hours to ${endTime} Hours`,
        });
        console.log("after insert ok");
        return;
      } else if (existingBookings.length > 0) {
        res.json({
          status: 200,
          message: `sorry, hall is not available as per your requirments, try to book on a different date or time`,
        });
      }
    } else {
      res.send({
        status: 200,
        message: `hall ${roomId} doesn't exist, please provide a valid roomId`,
      });
    }
  } catch (e) {
    console.log(e);
    res.send({ status: 500, message: "something went wrong" });
  } finally {
    client.close();
  }
});

module.exports = router;
