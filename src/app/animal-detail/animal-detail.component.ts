import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { Animal } from '../models/animal';
import {GLOBAL} from '../services/global';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss'],
  providers: [AnimalService]
})
export class AnimalDetailComponent implements OnInit {
	public animal: Animal;
	public url: string;
	public token;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private  _animalService: AnimalService,
		private _userService: UserService
	) { this.url = GLOBAL.url; this.token = this._userService.getToken(); }

	ngOnInit() {
		this.getAnimal();
	}

	getAnimal(){
		this._route.params.forEach((params: Params) =>{
			let id = params['id'];
			this._animalService.getAnimal(id).subscribe(
				response => {
					if(!response.animal){
						this._router.navigate(['/']);
					}else{
						this.animal = response.animal;
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
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
				).then((result) =>{
					this._router.navigate(['/admin-panel/listado']);
				})
			}
		})

	}

	deleteAnimal(id) {
		this._animalService.deleteAnimal(this.token, id).subscribe(
			response => {
				if (!response.animal) {
					alert('Error en el servidor');
				}
			}, error => {
				var errorMessage = <any>error;
				console.log(errorMessage);
			}
		)
	}

}
