import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes
import { ZooNavComponent } from './zoo-nav/zoo-nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { AnimalsComponent } from './animals/animals.component';

const appRoutes: Routes = [
	 {path:'', component:HomeComponent},
	 {path: 'home', component: HomeComponent},
	 {path: 'login', component: LoginComponent},
	 {path: 'register', component: RegisterComponent},
	 {path: 'recovery', component: RecoveryComponent},
	 {path: 'edit', component: UserEditComponent},
	 {path: 'perfil', component: PerfilComponent},
	 {path: 'get-animal/:id', component: AnimalDetailComponent},
	 {path: 'animals', component: AnimalsComponent}
	 {path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);