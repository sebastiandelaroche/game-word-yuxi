
// Import angular
import 'angular/angular.js';

import Services from './Services';


class WordsService {

	constructor(HttpServices) {
		this.HttpServices = HttpServices;
	}

	words() {
		return this.HttpServices.get("words");
	}

	create(word) {
		return this.HttpServices.post("words", word);
	}

	update(word) {
		return this.HttpServices.put("words", word);
	}

	delete(word) {
		return this.HttpServices.delete(`words`, word);
	}

}


WordsService.$inject = ["HttpServices"];

export default angular
	.module('words.services', ["yuxipacific.http"])
	.service('WordsService', WordsService)