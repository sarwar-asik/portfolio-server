const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send(`sarwar portfolio server from localhost 3007 `);
});

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// console.log('mongodb ',client);

async function run() {
  try {
    const usersCollections = client.db("sarwar-hosssain").collection("users");
    const DetailProductCollections = client
      .db("sarwar-hosssain")
      .collection("DetailProduct");
    const projectsCollections = client
      .db("sarwar-hosssain")
      .collection("projects");

    app.get("/users", async (req, res) => {
      const users = await usersCollections.find({}).toArray();
      res.send(users);
    });

    app.post("/adduser", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await usersCollections.insertOne(user);
      res.send(result);
    });

    app.get("/projects", async (req, res) => {
      const query = {};
      const projects = await projectsCollections.find(query).toArray();

      res.send(projects);
    });
    app.get("/project/:name", async (req, res) => {
      const query = { name: req.params.name };
      const project = await DetailProductCollections.findOne(query);
      res.send(project);
    });

    app.get(`/projectDetail`,async(req,res)=>{
      const projects = await DetailProductCollections.find({}).toArray()
      res.send(projects)
    })

    app.post("/addproductDetail", async (req, res) => {
      const product = req.body;
      // console.log(product);
      const result = await DetailProductCollections.insertOne(product);

      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => console.log(`my server is running on ${port} ports`));
