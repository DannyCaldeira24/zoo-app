import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
	public url: string;

	constructor(
		private _http: Http
	){
		this.url = GLOBAL.url;
	}

	register(user){
		let params = JSON.stringify(user);
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'/register',params,{headers:headers}).pipe(map(res => res.json()));
	}

}