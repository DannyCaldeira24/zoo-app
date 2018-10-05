import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {GLOBAL} from '../../services/global';
import {Animal} from '../../models/animal';
import {AnimalService} from '../../services/animal.service';
import {UserService} from '../../services/user.service';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [UserService, AnimalService, UploadService]
})
export class AddComponent implements OnInit {
	public title = 'Añadir animal';
	public animal: Animal;
	public session;
	public token;
	public status;
	public url:string;
	public filesToUpload: Array<File>;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _animalService: AnimalService,
		private _uploadService: UploadService
	) { 
		this.animal =  new Animal('','','','','','');
		this.session =  this._userService.getSession();
		this.token = this._userService.getToken();
		this.url=GLOBAL.url;
	}

	ngOnInit() {
	}

	onSubmit(addForm:NgForm){
		console.log(this.animal);
		this._animalService.addAnimal(this.token, this.animal).subscribe(
			response =>{
				if(!response.animal){
					this.status = 'error';
				}else{
					this.status='success';
					this.animal = response.animal;
					//Subir imagen del animal
					if(this.filesToUpload){
						console.log(this.url+'/upload-image-animal/');
						this._uploadService.makeFileRequest(this.url+'/upload-image-animal/'+this.animal._id, [], this.filesToUpload, this.token, 'image')
							.then((result:any)=>{
								this.animal.image = result.image;
								console.log(this.animal);
							});
					}
					addForm.resetForm();
				}
			},error =>{
				var errorMessage = <any>error;
				if(errorMessage != null){
					this.status = 'error';
				}
			}
		)
	}
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}

}
