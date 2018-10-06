import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
	public url: string;

	constructor(
		private _http: Http
	){
		this.url = 'http://localhost:57267/formulario';
	}

	sendMessage(body) {
		return this._http.post(this.url, body);
	}
}
