
var express = require('express');
var router 	= express.Router();
var Players = require('../models/players');


router.post('/:name', function(req, res, next) {

	Players.findOne({ name: req.params.name }, function(err, player) {
		
		if (err) {
			return res.status(500).json({message: err.message});
		}

		if(player !== null) {

			player.roundWin = player.roundWin + 1;
			Players.findByIdAndUpdate(player._id, player, function(err, user) {

				if (err) {
					return res.status(500).json({message: err.message});
				}

				res.status(200).json({message: 'Se ha actualizado correctamente los juegos del jugador.'});
			});

		} else {

			var playerSave = new Players({
				name: req.params.name,
				roundWin: 1
			});

			playerSave.save(function(err) {
				if (err) {
					return res.status(500).json({message: err.message});
				}
				res.status(200).json({message: 'Se ha creado correctamente el jugador.'});
			});

		}

	});

});


module.exports = router;