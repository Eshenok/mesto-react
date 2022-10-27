class Auth {
	constructor(options) {
		this._baseUrl = options.baseUrl;
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
			.then(res=>res.json())
			.then(res => res)
	}
	
	authorize (email, pass) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": pass
			})
		})
			.then(res => res.json())
			.then(res => res);
	}
	
	getContent (jwt) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization" : `Bearer ${jwt}`
			}
		})
			.then(res => res.json())
			.then(res=>res);
	}
	
}

export default new Auth({
	baseUrl: 'https://auth.nomoreparties.co',
	});