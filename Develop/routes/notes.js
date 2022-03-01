const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require("../helpers/fsUtils");

// GET route for all notes
notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// GET route for specific notes
notes.get("/:note_id", (req, res) => {
    let noteID = req.params.note_id_id;
    readFromFile("./db/db.json")
        .then((data) => JSON.parse(data))
        .then((json) =>{
            let result = json.filter((note) => note.note_id === noteID);
            return result.length > 0
                ? res.json(result)
                : res.json("No note with that ID");
        });
});

// POST route for new note
notes.post("/", (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title: title,
            text: text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, "./db/db.json");
        res.json("New note added successfully!");
        } else {
        res.error("Error adding new note");
    }
});

// Delete route for specific note
notes.delete("/:note_id", (req, res) => {
    let noteID = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        let result = json.filter((note) => note.note_id !== noteID);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteID} has been deleted 🗑️`);
      });
  });

module.exports = notes;