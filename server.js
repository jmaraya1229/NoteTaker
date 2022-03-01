const express = require("express");
const path = require("path");
const api = require("./routes/index.js");
const { clog } = require("./middleware/clog");
const app = express();

const PORT = process.env.PORT || 3001;

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});