class Auth {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._credentials = options.credentials;
	}
	
	_getResponseData(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	}
	
	registry (email, pass) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": pass
			})
		})
			.then(res => this._getResponseData(res))
			.then(res => res)
	}
	
	authorize (email, pass) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			credentials: 'include',
			body: JSON.stringify({
				"email": email,
				"password": pass
			})
		})
			.then(res => this._getResponseData(res))
			.then(res => res);
	}
	
	getCurrentUser () {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			},
			credentials: this._credentials,
		})
			.then(res => this._getResponseData(res))
			.then(res=>res);
	}

	logout () {
		return fetch(`${this._baseUrl}/logout`, {
			method: 'GET',
			headers: {
				"Content-Type": "application.json"
			},
			credentials: "include",
		})
			.then(res => this._getResponseData(res))
			.then(res => res);
	}

}

export default new Auth({
	baseUrl: 'https://api.voloshin.eshenok.nomoredomains.club',
	credentials: 'include',
	});