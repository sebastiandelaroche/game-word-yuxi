
// Import angular
import 'angular/angular.js';
import WordsService from '../services/WordsService';
import ListDirective from '../directives/ListDirective';


class WordsController {

	constructor($scope, WordsService) {
		
		$scope.self = this;
		
		this.WordsService = WordsService;
		
		this.modo = "create";
		
		this.word = {};
		
		this.columns = [{
			column: "word",
			title: "Word"
		}, {
			column: "length",
			title: "Length"
		}];
		
		this.words = [];
		
		this.init();
	}

	init() {
		this.WordsService.words()
		.then(response => {
			this.words = response.data;
		});
	}

	create() {
		this.modo = "create";
		this.word.word = "";
	}

	edit(row) {
		this.modo = "edit";
		$('#modal').modal({show: true});
		this.word = row;
	}

	delete(row) {
		if(confirm(`Esta seguro(@) de eliminar la palabra ${row.word}`)) {
			this.WordsService.delete(row)
			.then(response => {
				this.init();
			})
		}
	}

	save() {

		let modal = $('#modal');
		let promise = (this.modo == "create") ? this.WordsService.create(this.word)
			: this.WordsService.update(this.word);

		promise.then(response => {
			this.init();
			modal.modal("hide");
		})
		.catch(error => {
			console.log("error", error)
		})

	}

}


WordsController.$inject = ["$scope", "WordsService"];

export default angular
	.module('words.controller', ["words.services", "list.directive"])
	.controller('WordsController', WordsController)
