import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AdminRoutingModule} from './admin-routing.module';

//Components
import { MainComponent } from './main/main.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

//Servicios
import {UserService} from '../services/user.service';
import {AnimalService} from '../services/animal.service';
import {AdminGuard} from '../services/admin.guard';
import {SearchPipe} from './pipes/search.pipe';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AdminRoutingModule
  ],
  exports: [
    MainComponent,
    ListComponent,
    AddComponent,
    EditComponent
  ],
  providers: [
    UserService,
    AnimalService,
    AdminGuard
  ]
})
export class AdminModule { }
