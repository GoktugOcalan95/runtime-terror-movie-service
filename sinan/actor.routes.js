module.exports = (app) => {
    const actors = require('./actor.controller.js');

    // Create a new Note
    app.post('/actors', actors.create);

    // Retrieve all Notes
    app.get('/actors', actors.findAll);

    // Retrieve a single Note with noteId
    app.get('/actors/:actorId', actors.findOne);

    // Update a Note with noteId
    app.put('/actors/:actorId', actors.update);

    // Delete a Note with noteId
    app.delete('/actors/:actorId', actors.delete);
}