const express = require("express");

const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*********** MondoDB ***********/
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // const database
    const movieCollection = client.db("Movie-Portal").collection("Movie");

    app.get("/", (req, res) => {
      res.send("welcome");
    });
    // Create Operation
    app.post("/movie", async (req, res) => {
      const movie = req.body;
      const result = await movieCollection.insertOne(movie);
      res.send(result);
    });
    // Read OperationOptions
    // app.get("/movie", async (req, res) => {
    //   const cursor = movieCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });
  } finally {
  }
}
run().catch(console.dir);

/*********** MondoDB ***********/

app.listen(port, (req, res) => {
  console.log(`The server is running on port: ${port}`);
});
