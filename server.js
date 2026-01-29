const express = require("express");
const Repodb = require('@suman-malik-repo/repodb-client');
const db = new Repodb({
    host: "https://repodb.ogensync.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMTY0ZGJkMy1jMDZhLTRhMGQtYjliOC05YmFiOTk1YTZiM2QiLCJkYklkIjoiYzk5NWZlZDQtYTA4OS00YzE0LWE0NmMtZGY5MTk4MzBiMjI5IiwiZGJOYW1lIjoibmV3IiwidG9rZW5JZCI6IjI0NGRlNDMxLTY4YTgtNGI1Yi1iYjMyLWJkNzMxMDQ5NWY5YyIsInBlcm1pc3Npb25zIjpbInJlYWQiLCJ3cml0ZSJdLCJ0eXBlIjoiZGJfdG9rZW4iLCJpYXQiOjE3Njk2ODIwNDYsImV4cCI6MjA4NTA0MjA0Nn0.-8o0x2emMbghNk3LHOBdpb3RAO768_otRVf-ERZjGkU",
    dialect: "mysql"
})
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("🔥 Node + Express server is running!");
});

// Sample API route
app.get("/api/hello", async(req, res) => {
    const data = await db.execute("select * from orders");


  res.json(data.rows);
});

// POST example
app.post("/api/data", (req, res) => {
  const data = req.body;
  res.json({
    status: "success",
    received: data
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});
