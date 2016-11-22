
// Import angular
import 'angular/angular.js';

import WordsService from '../services/WordsService';
import PlayerService from '../services/PlayerService';


class StartGameController {

	/**
	 *	Inicializa el controlador
	 */
	constructor($scope, WordsService, PlayerService) {
		$scope.self = this;
		this.WordsService = WordsService;
		this.PlayerService = PlayerService;
		this.words = [];
		this.player = "";
		this.stateGame = "start";
		this.letters = [];
		this.lettersResultUser = [];
		this.message = "";
		this.messageLetterResult = [];
		this.intents = 0;
		this.round = 0;
	}

	/**
	 *	Begin the game.
	 *
	 *	@author sebastian.delaroche
	 *	@since 20/11/2016
	 */
	start() {
		if(this.formPlayer.$valid) {
			this.loadWord();
		}
	}

	/**
	 *	Load all words in memory.
	 *
	 *	@author sebastian.delaroche
	 *	@since 20/11/2016
	 */
	loadWord() {
		this.PlayerService.save(this.player)
		.then(result => {
			this.WordsService.words()
			.then(response => {
				this.words = response.data;
				this.stateGame = "game";
				let word = this.randomWords();
				this.buildWord(word);
			})
		});
	}

	/**
	 *	Random for selected words
	 *
	 *	@author sebastian.delaroche
	 *	@since 20/11/2016
	 */
	randomWords() {

		let result = "";
		if(this.words.length !== 0) {
			let count = this.words.length - 1;
			let randomNumber = Math.round(Math.random(0, count) * count);
			let word = this.words[randomNumber];
			result = word.word.trim();
		}
		return result;
	}

	/**
	 *	Build word
	 *
	 *	@author sebastian.delaroche
	 *	@since 20/11/2016
	 */
	buildWord(word) {
		let letters = [];
		for (var i = 0; i < word.length; i++) {
			letters.push(word[i]);
		}
		this.letters = letters;
	}

	/**
	 *	Validate word
	 *
	 *	@author sebastian.delaroche
	 *	@since 20/11/2016
	 */
	validate() {

		let anyEmpty = true;
		this.message = "";
		this.lettersResultUser.forEach(elem => {
			if(elem.trim().length !== 0) {
				anyEmpty = false;
			}
		});

		if(anyEmpty) {
			this.message = "You must enter at least one word";
			return;
		}

		let fail = false;
		this.letters.forEach((elem, index) => {
			if(typeof this.lettersResultUser[index] !== "undefined" && (this.lettersResultUser[index].toLowerCase() === elem.toLowerCase())) {
				this.messageLetterResult[index] = "good";
			} else {
				this.messageLetterResult[index] = "wrong";
				fail = true;
			}
		})

		if(fail) {
			this.intents++;
		} else {
			this.roundWin(this.letters.join(""));
			this.round++;
		}


		if(this.round === 3) {

			this.stateGame = "win";
		}
		if(this.intents === 5) {
			this.stateGame = "lose";
		}

	}

	/**
	 *	Reset the game
	 *
	 *	@author sebastian.delaroche
	 *	@since 20/11/2016
	 */
	reset(reset) {
		
		this.letters = [];
		this.lettersResultUser = [];
		this.message = "";
		this.messageLetterResult = [];
		this.intents = 0;
		this.round = 0;

		if(reset) {
			this.loadWord();
		} else {
			this.player = "";
			this.stateGame = "start";
		}
	}
	
	/**
	 *	Round win
	 *
	 *	@author sebastian.delaroche
	 *	@since 20/11/2016
	 */
	roundWin(word) {

		let words = this.words.filter(elem => {
			if(elem.word.toLowerCase() !== word.toLowerCase()) {
				return elem;
			}
		});

		this.words = words;
		this.letters = [];
		this.lettersResultUser = [];
		this.message = "";
		this.messageLetterResult = [];
		this.intents = 0;

		this.buildWord(this.randomWords());
	}

}


StartGameController.$inject = ["$scope", "WordsService", "PlayerService"];

export default angular
	.module('startGame.controller', ["words.services", "players.services"])
	.controller('StartGameController', StartGameController)
