
// Import angular
import 'angular/angular.js';

import Services from './Services';


class PlayerService {

	constructor(HttpServices) {
		this.HttpServices = HttpServices;
	}

	// load(player) {
	// 	return this.HttpServices.get("players", player);
	// }

	save(player) {
		return this.HttpServices.post(`players/${player}`,{});
	}

}


PlayerService.$inject = ["HttpServices"];

export default angular
	.module('players.services', ["yuxipacific.http"])
	.service('PlayerService', PlayerService)