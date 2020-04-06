const express = require('express');
const app = express();
const router = express.Router();

const { check, validationResult } = require('express-validator');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
//const Authentication = require('../../middleware/auth')

let MoviePofessional = require('../../models/MoviePofessional');

//route post api/mp
//desc insert user
//access public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('nationality', 'Nationality is required').not().isEmpty(),
    check('born', 'Date of birth is required').not().isEmpty()
  ],
  async (req, res) => {

    console.log('passei 1');
    const errors = validationResult(req);
    
    console.log('passei 2');
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      //check if user name is already in the database
      let user = await MoviePofessional.findOne({ name: req.body.name });
      console.log('passei 3');
      if (user) {
        return res.status(400).json({ error: [{ msg: 'Movie Pofessional already exits' }] });
      }

      console.log('passei 4');
      //create a Movie Pofessional
      const newMoviePofessional = new MoviePofessional({
        name: req.body.name,
        actor: req.body.actor,
        writer: req.body.writer,
        director: req.body.director,
        nationality: req.body.nationality,
        born: req.body.born
      });

      console.log('-> name:' + req.body.name);
      console.log('-> actor:' + req.body.actor);
      console.log('-> writer:' + req.body.writer);
      console.log('-> dir:' + req.body.director);
      console.log('-> na:' + req.body.nationality);
      console.log('-> bord:' + req.body.born);

      console.log('passei 6');
      //save the user
      await newMoviePofessional.save();

      console.log('passei 7');
      res.status(200).json([{Message: newMoviePofessional}] );
 
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

//route Get api/mp/
//desc Get all Movie Professional
//access public
router.get('/', async (req, res) => {
  try {
    const mpDb = await MoviePofessional.find();
    
    console.log("api/lp " + JSON.stringify(mpDb));
    
    res.send(mpDb);
    //res.json(mpDb);

  } catch (err) {
    res.status(500).send('Server error: ' + err);

  }
});

//route Get api/mp
//desc Get Movie Professional by id(name)
//access public
router.get('/find', async (req, res) => {
  try {
    console.log('passei ola');
    const mpFound = await MoviePofessional.find({name: req.body.name});
    if (!mpFound) {
      return res.status(404).send('Movie professional not found');
    }
    res.send(mpFound);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//route post api/mp
//Delete user
//access public
router.delete(
  '/',
  [
    check('name', 'Name is required').not().isEmpty()
  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      //check if user is already in the database
      let user = await MoviePofessional.findOne({ name: req.body.name });
      if (!user) {
        return res.status(400).json({ error: [{ msg: 'Movie Pofessional do not exist.' }] });
      }
      
      var msg = 'Movie Pofessional: ' + user.name + ' deleted.';

      //remove
      user.remove();
      //save on the database
      user.save();

      res.status(200).json([{Message: [{msg}]}] );

    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

//route put  api/mp/
//desc update Movie Pofessional
//access public
router.put('/', 
[
    check('name', 'Name is required').not().isEmpty()
],
async (req, res) => {

  try {
    let mpUp = await MoviePofessional.findOne({name: req.body.name});
    if (!mpUp) {
      return res.status(404).send('Movie professional not found');
    }

    if(req.body.actor != ''){
      mpUp.actor = req.body.actor;
    }
    if(req.body.writer != ''){
      mpUp.writer = req.body.writer;
    }
    if(req.body.director != ''){
      mpUp.director = req.body.director;
    }
    if(req.body.nationality != ''){
      mpUp.nationality = req.body.nationality;
    }
    if(req.body.born != ''){
      mpUp.born = req.body.born;
    }
    /*if(req.body.picture != ''){
      mpUp.picture = req.body.picture;
    }*/
    await mpUp.save();
    res.send('Movie Pofessional ' + req.body.name + ' Updated.');
  } catch (err) {
    console.log('Server error: ' + err.message);
    res.status(500).send('Server error: ' + err );
  }
});
module.exports = router;
