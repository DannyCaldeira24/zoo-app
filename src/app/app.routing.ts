import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes
import { ZooNavComponent } from './zoo-nav/zoo-nav.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
	 {path:'', component:HomeComponent},
	 {path: 'home', component: HomeComponent},
	 // {path: '**', component:ErrorComponent}
];

export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);