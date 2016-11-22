
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
			return res.status(500).json({message: err.message});
		}
		res.status(200).json({message: 'Se ha creado correctamente la palabra.'});
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
			return res.status(500).json({message: err.message});
		}

		res.status(200).json({message: 'Se ha actualizado correctamente la palabra.'});
	});

});

router.delete('/', function(req, res, next) {

	Words.findByIdAndRemove(req.body._id, function(err) {
	
		if (err) {
			return res.status(500).json({message: err.message});
		}

		res.status(200).json({message: "Se ha eliminado correctamente."});

	});

});


module.exports = router;