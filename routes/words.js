
var express = require('express');
var router 	= express.Router();
var Words 	= require('../models/words');


router.get('/', function(req, res, next) {

	Words.find({}, function(err, words) {
		if (err) throw err;
		res.status(200).json(words);
	});

});


router.post('/', function(req, res, next) {

	var word = new Words({
		word: req.body.word,
		length: req.body.word.length
	});

	word.save(function(err) {
		if (err) {

			var message = "Internal error";
			if(err.code === 11000) {
				message = "The word that is about to create already exists";
			}
			return res.status(500).json({message: message});
		}
		res.status(200).json({message: 'The word was created correctly.'});
	});

});


router.put('/', function(req, res, next) {

	var word = {
		id: req.body._id,
		word: req.body.word,
		length: req.body.word.length
	};

	Words.findByIdAndUpdate(word.id, word, function(err, word) {

		if (err) {
			var message = "Internal error";
			if(err.code === 11000) {
				message = "The word you are about to update already exists.";
			}
			return res.status(500).json({message: message});			
		}

		res.status(200).json({message: 'The word was updated correctly.'});
	});

});

router.delete('/', function(req, res, next) {

	Words.findByIdAndRemove(req.body._id, function(err) {
	
		if (err) {
			return res.status(500).json({message: err.message});
		}

		res.status(200).json({message: "It has been deleted successfully."});

	});

});


module.exports = router;