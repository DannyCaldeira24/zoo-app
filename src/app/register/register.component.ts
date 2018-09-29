import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
	public title:string;
	public user: User;
	public error:boolean;
	public success:boolean;
	public message:string;
	public hide;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService:UserService
	) { 
		this.title = 'Registro';
		this.user = new User('','','','','','ROLE_USER','');
		this.hide=true;
	}

	ngOnInit() {
		
	}

	onSubmit(registerForm:NgForm){
		this._userService.register(this.user).subscribe(
			response => {
				if(response.user && response.user._id){
					// this.user = response.user;
					this.success = true;
					this.error = false;
					this.user = new User('','','','','','ROLE_USER','');
					registerForm.resetForm();

				}else{
					this.message = response.message;
					console.log(this.message);
					this.error = true;
					this.success = false; 
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
