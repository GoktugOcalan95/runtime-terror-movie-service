const mongoose = require('mongoose');
const config = require('config');
const dbconn = config.get('mongoDBConnectURI');

mongoose.Promise = global.Promise;

const connectDB = async () => {
    try {
        await mongoose.connect(dbconn, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
    });
        console.log('Successfully connected to the database');
    } catch (err) {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    }
};

module.exports = connectDB;
