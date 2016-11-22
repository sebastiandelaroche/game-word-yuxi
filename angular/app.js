
// Import angular and other dependecies.
import 'angular/angular.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// Router
import route from 'angular-route';

// Controllers
import WordsController from './controllers/WordsController';
import StartGameController from './controllers/StartGameController';

// Module
angular.module('game', [
    route,
    'words.controller',
    'startGame.controller'
])

// Configurations
.config(($routeProvider) => {

	$routeProvider

	.when('/', {
		template: require("./html/controllers/words.html"),
		controller: 'WordsController'
	})

	.when('/StartGame', {
		template: require("./html/controllers/startGame.html"),
		controller: 'StartGameController'
	})

	.otherwise({
		redirectTo: '/'
	});

})