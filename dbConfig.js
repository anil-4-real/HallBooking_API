require("dotenv").config();
const MongoDb = require("mongodb");
const { MongoClient } = require("mongodb");
const dbUrl = process.env.DB_URL;

exports = module.exports = { MongoDb, MongoClient, dbUrl };
