const express = require('express');
const app = express();
const router = express.Router();

const { check, validationResult } = require('express-validator');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//const bcrypt = require('bcryptjs');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const config = require('config');
//const Authentication = require('../../middleware/auth')

let ReviewMovies = require('../../models/ReviewMovies');

//route post api/rm
//desc insert review
//access public
router.post(
    '/',
    [
        check('userid', 'User id is required').not().isEmpty(),
        check('movieid', 'Movie id is required').not().isEmpty(),
        check('stars', 'Stars is required').not().isEmpty()
    ],
    async (req, res) => {

        console.log('passei 1');
        const errors = validationResult(req);

        console.log('passei 2');
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            //check if user already reviwed the movie
            let review = await ReviewMovies.findOne({ rateid: req.body.userid + req.body.movieid});
            console.log('passei:' + review);
            if (review) {
                return res.status(400).json({ error: [{ msg: 'Movied already rated' }] });
            }

            console.log('passei 4');
            //create a Movie Pofessional
            const newReviewMovies = new ReviewMovies({
                rateid: req.body.userid + req.body.movieid,
                userid: req.body.userid,
                movieid: req.body.movieid,
                stars: req.body.stars,
                review: req.body.review
            });

            console.log('passei:' + newReviewMovies);

            console.log('passei 6');
            //save the review
            await newReviewMovies.save();

            console.log('passei 7');
            res.status(200).json([{ Message: newReviewMovies }]);

        } catch (err) {
            res.status(500).send(err.message);
        }
    }
);

//route Get api/rm
//desc Get all Review/user
//access public
router.get('/reviewuser',
    [
        check('userid', 'User id is required').not().isEmpty()
    ],
    async (req, res) => {
        console.log('passei 8');
        const errors = validationResult(req);

        console.log('passei 9');
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            const allReviewsByUser = await ReviewMovies.find({ userid: req.body.userid });
            res.send(allReviewsByUser);
        } catch (err) {
            res.status(500).send('Server error: ' + err);

        }
    }
);

//route Get api/rm
//desc Get all Review/movie
//access public
router.get('/reviewmovie',
    [
        check('movieid', 'Movie id is required').not().isEmpty()
    ],
    async (req, res) => {
        console.log('passei 10');
        const errors = validationResult(req);

        console.log('passei 11');
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            const allReviewsByMovie = await ReviewMovies.find({ movieid: req.body.movieid });
            res.send(allReviewsByMovie);
        } catch (err) {
            res.status(500).send('Server error: ' + err);

        }
    }
);

//route post api/rm
//Delete user
//access public
router.delete(
    '/',
    [
        check('userid', 'User is required').not().isEmpty(),
        check('movieid', 'Movie is required').not().isEmpty()
    ],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        console.log('Passei 22');
        try {
            //check if user is already in the database
            let review = await ReviewMovies.findOne({ rateid: req.body.userid + req.body.movieid});
            if (!review) {
                return res.status(400).json({ error: [{ msg: 'Review do not exist.' }] });
            }
            console.log('Passei 23');

            var msg = 'Review: deleted.';
            console.log('Delete:' + review);
            //remove
            review.remove();
            //save on the database
            console.log('Passei 24');
            review.save();
            console.log('Passei 25');

            res.status(200).json([{ Message: [{ msg }] }]);

        } catch (err) {
            res.status(500).send(err.message);
        }
    }
);

//route put  api/rm
//desc update Movie Pofessional
//access public
router.put('/',
    [
        check('userid', 'User is required').not().isEmpty(),
        check('movieid', 'Movie is required').not().isEmpty(),
        check('stars', 'Stars is required').not().isEmpty()
    ],
    async (req, res) => {

        try {
            let review = await ReviewMovies.findOne({ rateid: req.body.userid + req.body.movieid});
            if (!review) {
                return res.status(404).send('Review not found');
            }

            if (req.body.stars != '') {
                review.stars = req.body.stars;
            }
            if (req.body.review != '') {
                review.review = req.body.review;
            }
        
            await review.save();
            res.send('Review updated.');
        } catch (err) {
            console.log('Server error: ' + err.message);
            res.status(500).send('Server error: ' + err);
        }
    });
module.exports = router;
