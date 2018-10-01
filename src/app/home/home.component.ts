import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService, UploadService]
})
export class HomeComponent implements OnInit {
	public url;
	public user;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService:UserService,
		private _uploadService:UploadService
	) { this.url = GLOBAL.url;}

  ngOnInit() {
  	this.user = this._userService.getSession();

  }

}
