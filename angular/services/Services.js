
// Import angular
import 'angular/angular.js';

class Services {

	constructor($http) {
		this.http = $http;
		this.host = "http://localhost:3000/";
	}

	get(uri) {
		return this.http
		.get(`${this.host}${uri}`)
	}

	post(uri, data) {
		return this.http
		.post(`${this.host}${uri}`, this.params(data), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
	}

	put(uri, data) {
		return this.http
		.put(`${this.host}${uri}`, this.params(data), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
	}

	delete(uri, data) {
		return this.http
		.delete(`${this.host}${uri}`, {
			data: this.params(data),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
	}


	params(params) {

		let keys = Object.keys(params);
		let result =  keys.reduce((value, elem, index) => {
			if(typeof value !== "string") {
				value = "";
			}
			if(index === 0) {
				value += `${elem}=${params[elem]}`;
			} else {
				value += `&${elem}=${params[elem]}`;
			}
			return value;

		}, 0)

		return result === 0 ? "" : result;
	}


}


Services.$inject = ["$http"];

export default angular
	.module('yuxipacific.http', [])
	.service('HttpServices', Services)