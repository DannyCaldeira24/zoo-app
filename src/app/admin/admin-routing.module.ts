import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

import {AdminGuard} from '../services/admin.guard';


const adminRoutes: Routes = [
	{
		path: 'admin-panel',
		component:MainComponent,
		canActivate: [AdminGuard],
		children:[
			{path:'', redirectTo: 'listado', pathMatch:'full'},
			{path: 'listado', component: ListComponent},
			{path: 'crear', component: AddComponent},
			{path: 'editar/:id', component: EditComponent}
		]

	},
	{path: 'listado-del-panel', component: ListComponent}

];

@NgModule({
	imports: [
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AdminRoutingModule{}