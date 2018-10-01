import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
	public title;
	public user: User;
	public hide:boolean;
  constructor(
  		private _route: ActivatedRoute,
		private _router: Router,
		private _userService:UserService
  ) { 
  	this.title = 'Recuperar contraseña';
  	this.user = new User('','','','','','ROLE_USER','');
	this.hide=true;
  }

  ngOnInit() {
  }

}
