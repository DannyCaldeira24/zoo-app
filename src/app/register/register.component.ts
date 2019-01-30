import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../models/user';
import Swal from 'sweetalert2';
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
		Swal({
			showCancelButton: false,
			showConfirmButton: false,
			html: '<div class = "animated fadeIn fa-child-ss"><i class="fas fa-spinner fa-spin fa-2x"></i></div>',
			allowOutsideClick: false
		  });
		this._userService.register(this.user).subscribe(
			response => {
				Swal.close();
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
