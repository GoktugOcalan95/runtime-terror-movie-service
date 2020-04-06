const Actor = require('./actor.model');

exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Actor must have a name & surname"
        });
    }

    // Create a Actor
    const actor = new Actor({
        title: req.body.name || "Give name", 
        content: req.body.surname
    });

    // Save Actor in the database
    actor.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the actor."
        });
    });

};

exports.findAll = (req, res) => {
    actor.find()
    .then(actors => {
        res.send(actors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving actors."
        });
    });
};

exports.findOne = (req, res) => {
    actor.findById(req.params.actorId)
    .then(actor => {
        if(!actor) {
            return res.status(404).send({
                message: "actor not found with id " + req.params.actorId
            });            
        }
        res.send(actor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "actor not found with id " + req.params.actorId
            });                
        }
        return res.status(500).send({
            message: "actor retrieving actor with id " + req.params.actorId
        });
    });
};


exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "actor content can not be empty"
        });
    }

    // Find actor and update it with the request body
    Actor.findByIdAndUpdate(req.params.actorId, {
        title: req.body.name || "Give a name",
        content: req.body.surname
    }, {new: true})
    .then(actor => {
        if(!actor) {
            return res.status(404).send({
                message: "actor not found with id " + req.params.actorId
            });
        }
        res.send(actor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "actor not found with id " + req.params.actorId
            });                
        }
        return res.status(500).send({
            message: "actor updating actor with id " + req.params.actorId
        });
    });
};


exports.delete = (req, res) => {
    Actor.findByIdAndRemove(req.params.actorId)
    .then(actor => {
        if(!actor) {
            return res.status(404).send({
                message: "actor not found with id " + req.params.actorId
            });
        }
        res.send({message: "actor deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "actor not found with id " + req.params.actorId
            });                
        }
        return res.status(500).send({
            message: "Could not delete actor with id " + req.params.actorId
        });
    });
};