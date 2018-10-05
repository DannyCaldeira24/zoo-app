import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { Animal } from '../models/animal';
import {GLOBAL} from '../services/global';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {
	public title='Listado de animales';
	public animals:Animal[];
	public message:string;
	public url: string;
	public _id;

	constructor(
		private _route:ActivatedRoute,
		private _router: Router,
		private _animalService: AnimalService
	) { this.url=GLOBAL.url; }

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
}
