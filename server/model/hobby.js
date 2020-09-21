const mongoose = require('mongoose');
const MSchema = mongoose.Schema;


/*
     name: 'Hobby',
    description: 'Hobby of users',
*/
const HobbbySchema = new MSchema({
    title: String,
    description: String,
    userId:String
});

module.exports = mongoose.model('Hobby',HobbbySchema);