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
    let noteID = req.params.note_id;
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
    const { title, text } = req.body;
    if(req.body) {
        const newNote = {
            title: title,
            text: text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, "./db/db.json");
        readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
    }
    
});

// Delete route for specific note
notes.delete("/:note_id", (req, res) => {
    let noteID = req.params.note_id;

    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        let result = json.filter((note) => note.note_id !== noteID);
        console.log(result) 
        console.log(result.length) 

        writeToFile('./db/db.json', result);
  
        res.json(`${noteID} has been deleted 🗑️`);
    });
});

module.exports = notes;