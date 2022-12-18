 class Api {
   constructor(options) {
     this._baseUrl = options.baseUrl;
     this._headers = options.headers;
     this._credentials = options.credentials;
   }
  
   _getResponseData(res) {
     if (res.ok) {
       return res.json();
     }
     return Promise.reject(`Ошибка: ${res.status}`)
   }
  
   getInitialCards() {
     return fetch(`${this._baseUrl}/cards`, {
       headers: this._headers,
       credentials: this._credentials,
     }).then(res => {
       return this._getResponseData(res);
     })
   }
  
   getUserInfo() {
     return fetch(`${this._baseUrl}/users/me`, {
       headers: this._headers,
       credentials: this._credentials,
     }).then(res => {
       return this._getResponseData(res);
     })
   }
  
  
   putProfileData(name, about) {
     return fetch(`${this._baseUrl}/users/me`, { // Редактирование профиля
       method: 'PATCH',
       headers: this._headers,
       credentials: this._credentials,
       body: JSON.stringify({
         name: name,
         about: about
       })
     })
       .then(res => {
         return this._getResponseData(res);
       })
   }
  
   putNewCard(name, link) {
     return fetch(`${this._baseUrl}/cards `, {
       method: 'POST',
       headers: this._headers,
       credentials: this._credentials,
       body: JSON.stringify({
         name: name,
         link: link
       })
     })
       .then(res => {
         return this._getResponseData(res);
       })
   }
  
   putNewAvatar(avatarUrl) {
     return fetch(`${this._baseUrl}/users/me/avatar`, {
       method: 'PATCH',
       headers: this._headers,
       credentials: this._credentials,
       body: JSON.stringify({
         avatar: avatarUrl
       })
     })
       .then(res => {
         return this._getResponseData(res);
       })
   }
  
   removeCard(cardId) {
     return fetch(`${this._baseUrl}/cards/${cardId}`, {
       method: 'DELETE',
       headers: this._headers,
       credentials: this._credentials,
     })
       .then(res => {
         return this._getResponseData(res);
       })
   }
  
   putLike(cardId) {
     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
       method: 'PUT',
       headers: this._headers,
       credentials: this._credentials,
     })
       .then(res => {
         return this._getResponseData(res);
       })
   }
  
   removeLike(cardId) {
     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
       method: 'DELETE',
       headers: this._headers,
       credentials: this._credentials,
     })
       .then(res => {
         return this._getResponseData(res);
       })
   }
  
   //Функция получающая карточку и инфо при загрузке страницы
   preloadData() {
     return Promise.all([this.getUserInfo(), this.getInitialCards()]);
   }
   
 }
  


 export default new Api({
   baseUrl: 'https://api.voloshin.eshenok.nomoredomains.club',
   headers: {
     'Content-Type': 'application/json'
   },
   credentials: 'include',
 });