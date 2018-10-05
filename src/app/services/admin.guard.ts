import { Injectable } from '@angular/core';
import {Router, ActivatedRoute, CanActivate} from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AdminGuard implements CanActivate{

	constructor(
		private _router: Router,
		private _userService: UserService
	){}

	canActivate(){
		let session = this._userService.getSession();
		if(session && session.role == 'ROLE_ADMIN'){
			return true;
		}else{
			this._router.navigate(['/home']);
			return false;
		}
	}

}