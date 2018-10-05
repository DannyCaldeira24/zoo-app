import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';

export interface option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-zoo-nav',
  templateUrl: './zoo-nav.component.html',
  styleUrls: ['./zoo-nav.component.css'],
  providers: [UserService]
})
export class ZooNavComponent implements OnInit{
	public session;
  public url;
	options: option[] = [
    	{value: 'perfil-0', viewValue: 'Perfil'},
      {value: 'datos-1', viewValue: 'Modificar datos'},
      {value: 'admin', viewValue: 'Administración'},
      {value: 'logout-2', viewValue: 'Cerrar sesión'}
	];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
	constructor(
		private breakpointObserver: BreakpointObserver,
    private _route: ActivatedRoute,
    private _router: Router,
		private _userService:UserService
	){this.url=GLOBAL.url;}

	ngOnInit(){
		this.session=this._userService.getSession();
	}

  ngDoCheck(){
    this.session = this._userService.getSession();
  }

  logout(){
    localStorage.clear();
    this.session = null;
    this._router.navigate(['/home']);
  }
}
