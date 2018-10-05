import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../../services/global';
import {Animal} from '../../models/animal';
import {AnimalService} from '../../services/animal.service';
import {UserService} from '../../services/user.service';
import {UploadService} from '../../services/upload.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [UserService, AnimalService]
})
export class ListComponent implements OnInit {
	public title='Listado de animales';
	public animals:Animal[];
	public message:string;
	public modalTitle;
	public modalBodywarning;
	public modalBodydanger;
	public modalFooter;
	public token;
	public _id;

	constructor(
		private _route:ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _animalService: AnimalService
	) { this.token = this._userService.getToken(); }

	ngOnInit() {
		this.getAnimals();
	}
	getAnimals(){
		this._animalService.getAnimals().subscribe(
			response =>{
				if(!response.animals){
					this.message='No hay animales';
				}else{
					this.animals = response.animals;
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
	}
	public parche(animal:Animal){
		// Usamos jQuery con normalidad
		// $('#exampleModal').on('shown.bs.modal', function () {
		//   $('.modal-backdrop').remove();
		// })
		// var _id = '#myModal-'+id;
		// console.log(_id);
		this._id=animal._id;
		this.modalTitle = 'Usted esta apunto de eliminar el siguiente animal ->'+animal.name;
		this.modalBodywarning='Esta seguro de querer continuar con esta operación?. Si borra este animal no podra deshacer los cambios.';
		this.modalBodydanger='ID:'+animal._id;
		$('#myModal').on('shown.bs.modal', function() {
		   //To relate the z-index make sure backdrop and modal are siblings
		   $(this).before($('.modal-backdrop'));
		   //Now set z-index of modal greater than backdrop
		   $(this).css("z-index", parseInt($('.modal-backdrop').css('z-index')) + 1);
		});

	}

	deleteAnimal(){
		this._animalService.deleteAnimal(this.token, this._id).subscribe(
			response =>{
				if(!response.animal){
					alert('Error en el servidor');
				}else{
					alert('El animal se ha eliminado correctamente');
					this.getAnimals();
				}
			},error =>{
				var errorMessage = <any>error;
				console.log(errorMessage);
			}
		)
	}


}
