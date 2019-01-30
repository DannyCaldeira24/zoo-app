import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss'],
	providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {
	public title: string;
	public user;
	public error: boolean;
	public success: boolean;
	public hide;
	public token;
	public url;
	public urlpreview;
	public filesToUpload: Array<File>;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _uploadService: UploadService
	) {
		this.title = 'Modificar datos';
		this.hide = true;
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		this.user = this._userService.getSession();
		this.token = this._userService.getToken();
	}

	onSubmit() {
		Swal({
			showCancelButton: false,
			showConfirmButton: false,
			html: '<div class = "animated fadeIn fa-child-ss"><i class="fas fa-spinner fa-spin fa-2x"></i></div>',
			allowOutsideClick: false
		});
		this._userService.edit(this.user).subscribe(
			response => {
				Swal.close();
				if (response.user && response.user._id) {
					// this.user = response.user;
					this.success = true;
					this.error = false;
					localStorage.setItem('session', JSON.stringify(this.user));
					this._uploadService.makeFileRequest(this.url + '/upload-image/' + this.user._id, [], this.filesToUpload, this.token, 'image')
						.then((result: any) => {
							this.user.image = result.image;
							localStorage.setItem('session', JSON.stringify(this.user));
							// console.log(result);
						});
				} else {
					this.error = true;
					this.success = false;
				}
			},
			error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					this.error = true;
				}
				console.log(<any>error);
			}
		);
	}
	fileChangeEvent(fileInput: any) {
		if (fileInput.target.files && fileInput.target.files[0]) {
			this.filesToUpload = <Array<File>>fileInput.target.files;
			var reader = new FileReader();

			reader.onload = (event: ProgressEvent) => {
				this.urlpreview = (<FileReader>event.target).result;
			}

			reader.readAsDataURL(fileInput.target.files[0]);
		}

		console.log(this.filesToUpload[0].name);
	}
}
