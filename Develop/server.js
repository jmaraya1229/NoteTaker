const express = require("express");
const path = require("path");
const noteStorage = require("../Develop/routes/notes");
const api = require("./routes/index.js");
const { clog } = require("./middleware/clog");
const app = express();

const PORT = process.env.port || 3001;

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static("public"));

// GET /notes to return "notes.html"
app.get("/notes", (req,res) => 
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET * to return "index.html" homepage
app.get("*", (req,res) => 
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET /api/notes
app.get("/api/notes", (req,res) => 
    noteStorage

);

// POST /api/notes
app.post("/api/notes", (req, res) =>
    console.info(`${req.method} stored note`)
);

app.delete("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);