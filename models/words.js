
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var wordsSchema = new Schema({
    word: {type: String, required: true, unique: true},
    length: Number,
    created_at: Date,
    updated_at: Date
});


// on every save, add the date
wordsSchema.pre('save', function(next) {
    
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
    this.created_at = currentDate;

    next();
    
});


// the schema is useless so far
// we need to create a model using it
var Words = mongoose.model('Words', wordsSchema);

// make this available to our users in our Node applications
module.exports = Words;