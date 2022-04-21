const express = require("express");
const cors = require("cors");
const { query } = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello friends. Where are you all. I am waiting for you");
});

// users
const users = [
  { id: 1, name: "iqbal", email: "iqbal@gmail.com" },
  { id: 2, name: "nobab", email: "nobab@gmail.com" },
  { id: 3, name: "mizan", email: "mizan@gmail.com" },
  { id: 4, name: "robiul", email: "robiul@gmail.com" },
  { id: 5, name: "foysal", email: "foysal@gmail.com" },
];

// send users
app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name.toLocaleLowerCase();
    const matched = users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    res.send(matched);
  } else {
    res.send(users);
  }
});

// send user by id
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id == id);
  res.send(user);
});

// get data from clients site
app.post("/user", (req, res) => {
  console.log("Request body", req.body);
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
});

app.listen(port, () => {
  console.log("Listening port", port);
});
