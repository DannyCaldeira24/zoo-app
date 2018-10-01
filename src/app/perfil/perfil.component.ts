import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

	public title:string;
	public user;
	public url;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService:UserService
	) { 
		this.title = 'Perfil';
	}

	ngOnInit() {
		this.url = GLOBAL.url;
		this.user = this._userService.getSession();
	}

}
