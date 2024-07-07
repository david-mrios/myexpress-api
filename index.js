const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

let db;

async function go() {
  db = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "inventory",
  });
  app.listen(3000);
}

go();

// get all
app.get("/", async (req, res) => {
  try {
    const [users] = await db.execute("SELECT * FROM usuario");
    console.log(users);
    res.send(
      `<ul>${users.map((users) => `<li>${users.nombre}</li>`).join("")}</ul>`
    );
  } catch (error) {
    console.log(error);
    res.status(505).send("505 server connection");
  }
});

// Example: http://localhost:3000/search/1
app.get("/search/:id", async (req, res) => {
  const id = req.params.id;
  const [post] = await db.execute(`select * from usuario where id = ${id}`);

  try {
    if (post.length > 0) {
      console.log(post);
      console.log(`Id: ${id}`);
      res.send(`<h2>${post.map((post) => post.nombre).join("")}</h2>`);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.log(error);
    res.status(505).send("505 server connection");
  }
});

// Example: http://localhost:3000/create/David Membreño/20
app.get("/create/:name/:age", async (req, res) => {
  const data = [req.params.name, Number(req.params.age)];
  console.log(data);
  try {
    if (data.length > 0) {
      const [create] = await db.execute(
        "INSERT INTO usuario (nombre,edad) VALUES (?,?)",
        [data[0], data[1]]
      );
      res.status(201).json({ message: "registration completed" });
    } else {
      res.status(400).send("Invalid data");
    }
  } catch (error) {
    console.log(error);
    res.status(505).send("505 server connection");
  }
});

app.put("/update/:id/:name/:age", async (req, res) => {});

app.delete("/delete", async (req, res) => {});
