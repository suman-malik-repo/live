const express = require("express");
const Repodb = require('@suman-malik-repo/repodb-client');
const db = new Repodb(
  {
    host:"https://repodb.ogensync.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMTY0ZGJkMy1jMDZhLTRhMGQtYjliOC05YmFiOTk1YTZiM2QiLCJkYklkIjoiYzk5NWZlZDQtYTA4OS00YzE0LWE0NmMtZGY5MTk4MzBiMjI5IiwiZGJOYW1lIjoibmV3IiwidG9rZW5JZCI6IjI0NGRlNDMxLTY4YTgtNGI1Yi1iYjMyLWJkNzMxMDQ5NWY5YyIsInBlcm1pc3Npb25zIjpbInJlYWQiLCJ3cml0ZSJdLCJ0eXBlIjoiZGJfdG9rZW4iLCJpYXQiOjE3Njk2ODIwNDYsImV4cCI6MjA4NTA0MjA0Nn0.-8o0x2emMbghNk3LHOBdpb3RAO768_otRVf-ERZjGkU",
    dialect: "mysql"
  }
)
const path = require("path");
const app = express();
const PORT = 3000;

// Assume db is already configured
// Example: const db = require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// Search API
app.get("/api/hello", async (req, res) => {
  try {
    const { q } = req.query;

    let sql = "SELECT * FROM orders";
    let params = [];

    if (q) {
      sql += " WHERE customer_name LIKE ?";
      params.push(`%${q}%`);
    }

    const data = await db.execute(sql, params);
    res.json(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
