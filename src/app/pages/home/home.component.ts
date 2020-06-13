import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router' 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _auth:AuthService, private router:Router) { }

  ngOnInit() {
  }

  logOut(){
    this._auth.logOut();
    this.router.navigateByUrl('/login');
  }

}
