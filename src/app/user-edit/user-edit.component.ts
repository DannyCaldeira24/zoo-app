import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {
	public title:string;
	public user;
	public error:boolean;
	public success:boolean;
	public hide;
	public token;
	public url;
	public filesToUpload: Array<File>;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService:UserService,
		private _uploadService:UploadService
	) { 
		this.title = 'Modificar datos';
		this.hide=true;
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this.user = this._userService.getSession();
		this.token = this._userService.getToken();
	}

	onSubmit(){
		this._userService.edit(this.user).subscribe(
			response => {
				if(response.user && response.user._id){
					// this.user = response.user;
					this.success = true;
					this.error = false;
					localStorage.setItem('session',JSON.stringify(this.user));
					this._uploadService.makeFileRequest(this.url+'/upload-image/'+this.user._id, [], this.filesToUpload, this.token, 'image')
						.then((result:any)=>{
							this.user.image = result.image;
							localStorage.setItem('session', JSON.stringify(this.user));
							console.log(this.user);
						});
				}else{
					this.error = true;
					this.success = false; 
				}
			},
			error => {
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.error = true;
				}
				console.log(<any>error);
			}
		);
	}
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}
}
