const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//mongoose.connect(mongodb.URI, {useNewUrlParser: true, useUnifiedTopology: true})
    //.then(db => console.log('Database is connected'))
    //.catch(err => console.error(err));

    module.exports = async function connection() {
        try {
            const connectionParams = {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                autoIndex: true,
            };
            await mongoose.connect(mongodb.URI, connectionParams);
            console.log("connected to database");
        } catch (error) {
            console.log(error);
            console.log("could not connect to database");
        }
    };