import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes
import { ZooNavComponent } from './zoo-nav/zoo-nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
	 {path:'', component:HomeComponent},
	 {path: 'home', component: HomeComponent},
	 {path: 'login', component: LoginComponent},
	 {path: 'register', component: RegisterComponent},
	 {path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);