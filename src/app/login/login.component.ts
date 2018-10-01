import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
	public title:string;
	public user: User;
	public session;
	public error:boolean;
	public token;
	public message:string;
	public hide;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService:UserService
	) { 
		this.title = 'Login';
		this.user = new User('','','','','','ROLE_USER','');
		this.hide=true;
		this.error=false;
	}

	ngOnInit() {
		// console.log(this._userService.getSession());
		// console.log(this._userService.getToken());
	}

	onSubmit(loginForm:NgForm){
		//Loguear el usuario y conseguir el objeto
		this._userService.signup(this.user).subscribe(
			response=>{
				if(response.user && response.user._id){
					this.session = response.user;
					localStorage.setItem('session',JSON.stringify(this.session));
					//console.log(this.session);
					//Conseguir el token
					this._userService.signup(this.user, 'true').subscribe(
						response=>{
							if(response.token <= 0){
								this.message='El token no se ha generado';

							}else{
								this.token = response.token;
								localStorage.setItem('token',JSON.stringify(this.token));
								//console.log(this.token);
								this._router.navigate(['/home']);
							}
						},
						error=>{
							console.log(<any> error);
						}
					);

				}else{
					this.message = response.message;
					console.log(this.message);
					this.error = true;
				}
			},
			error=>{
				//Este segmento de codigo es si el response devuelve un code 500 o 404
				// var errorMessage = <any>error;
				// if(errorMessage != null){
				// 	var body = JSON.parse(error._body);
				// 	this.error = true;
				// }
				console.log(<any> error);
			}
		);
	}
}	
