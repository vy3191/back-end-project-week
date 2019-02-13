const express = require('express');
const router = express.Router();
const db = require('../helpers/notesModel');

router.get('/api/notes', (req,res) => {
       db.getNotes()
         .then(notes => {
           res.status(200).json(notes)
         })
         .catch(err => {
           res.status(500).json({msg:`Failed get the notes`});
         })
});

router.get('/api/notes/:id', (req,res) => {
       const {id} = req.params;
       db.getById(id)
         .then( note => {
            if(!note) res.status(404).json({msg:`Could not find the note with the id ${id}`});
            res.status(200).json(note);
         })
         .catch(err => {
           res.status(500).json({msg:`Failed to get the note`})
         });
     
});

router.post('/api/notes', (req,res) => {
      const note = req.body;
      const title = note.title;
      const content = note.content;
      if(!title) res.status(400).json({msg: `The title is missing`});
      if(!content) res.status(400).json({msg: `Content is missing`});
    
      db.insert(note)
        .then(ids => {
           const id = ids[0];
           res.status(201).json({id: id});
        })
        .catch(err => {
           res.status(500).json({msg:`Failed to add note at this time`});
        });
});







module.exports = router;
