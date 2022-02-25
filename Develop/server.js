// On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.
// The following HTML routes should be created:
// `GET /notes` should return the `notes.html` file.
// `GET *` should return the `index.html` file.

// The following API routes should be created:
// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.port || 3001;

// GET /notes to return "notes.html"
app.get("/notes", (req,res) => 
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET * to return "index.html"
app.get("*", (req,res) => 
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET /api/notes
// app.get

// POST /api/notes
// app.post

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);