import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	providers: [UserService, AnimalService]
})
export class ListComponent implements OnInit {
	public title = 'Listado de animales';
	public animals: Animal[];
	public message: string;
	public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _animalService: AnimalService
	) { this.token = this._userService.getToken(); }

	ngOnInit() {
		this.getAnimals();
	}
	getAnimals() {
		this._animalService.getAnimals().subscribe(
			response => {
				if (!response.animals) {
					this.message = 'No hay animales';
				} else {
					this.animals = response.animals;
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
	public parche(animal: Animal) {

		Swal({
			title: 'Estas seguro?',
			text: "Estas a punto de eliminar al animal " + animal.name,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar'
		}).then((result) => {
			if (result.value) {
				this.deleteAnimal(animal._id);
				Swal(
					'Animal eliminado!',
					'El animal ' + animal.name + " ha sido eliminado",
					'success'
				)
			}
		})

	}

	deleteAnimal(id) {
		this._animalService.deleteAnimal(this.token, id).subscribe(
			response => {
				if (!response.animal) {
					alert('Error en el servidor');
				} else {
					// alert('El animal se ha eliminado correctamente');
					this.getAnimals();
				}
			}, error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
			}
		)
	}


}
