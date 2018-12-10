import { Component } from '@angular/core';
import {UserService} from './services/user.service';

import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zoo-app';
  constructor(
	private _route: ActivatedRoute,
	private _router: Router
  ){}
}
