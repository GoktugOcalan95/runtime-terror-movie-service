const express = require('express');
const app = express();
const router = express.Router();

const { check, validationResult } = require('express-validator');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let Watchlist = require('../../models/Watchlist');

//route post api/wl
//desc insert bookmark
//access public
router.post(
    '/',
    [
        check('userid', 'User id is required').not().isEmpty(),
        check('movieid', 'Movie id is required').not().isEmpty()
    ],
    async (req, res) => {

        console.log('passei 1');
        const errors = validationResult(req);

        console.log('passei 2');
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            //check if bookmark already exist
            let bookmark = await Watchlist.findOne({ bookmarkid: req.body.userid + req.body.movieid});
            console.log('passei:' + bookmark);
            if (bookmark) {
                return res.status(400).json({ error: [{ msg: 'Movied already in the bookmark' }] });
            }

            console.log('passei 4');
            //create a Movie Pofessional
            const newWatchlist = new Watchlist({
                bookmarkid: req.body.userid + req.body.movieid,
                userid: req.body.userid,
                movieid: req.body.movieid
            });

            console.log('passei:' + newWatchlist);

            console.log('passei 6');
            //save the review
            await newWatchlist.save();

            console.log('passei 7');
            res.status(200).json([{ Message: newWatchlist }]);

        } catch (err) {
            res.status(500).send(err.message);
        }
    }
);

//route Get api/wl
//desc Get all bookmarks/user
//access public
router.get('/',
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
            const allBookmarkUser = await Watchlist.find({ userid: req.body.userid });
            res.send(allBookmarkUser);
        } catch (err) {
            res.status(500).send('Server error: ' + err);

        }
    }
);


//route post api/rm
//Delete bookmark
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
            //check if movie is already in the bookmarklist
            let watchlist = await Watchlist.findOne({ bookmarkid: req.body.userid + req.body.movieid});
            if (!watchlist) {
                return res.status(400).json({ error: [{ msg: 'Movie is not on your bookmark.' }] });
            }
            console.log('Passei 23');

            var msg = 'Movie deleted from bookmark.';
            console.log('Delete:' + watchlist);
            //remove
            watchlist.remove();
            //save on the database
            console.log('Passei 24');
            watchlist.save();
            console.log('Passei 25');

            res.status(200).json([{ Message: [{ msg }] }]);

        } catch (err) {
            res.status(500).send(err.message);
        }
    }
);

module.exports = router;
