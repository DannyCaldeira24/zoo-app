import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.component.html',
  styleUrls: ['./keepers.component.scss']
})
export class KeepersComponent implements OnInit {

	public title='Listado de animales';
	public keepers:User[];
	public message:string;
	public url: string;
	public _id;

	constructor(
		private _route:ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	) { this.url=GLOBAL.url; }

	ngOnInit() {
		this.getAnimals();
	}
	getAnimals(){
		this._userService.getKeepers().subscribe(
			response =>{
				if(!response.users){
					this.message='No hay cuidadores en estos momentos';
				}else{
					this.keepers = response.users;
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}
}
