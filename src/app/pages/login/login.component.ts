import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/user.model';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UsuarioModel;
  recordar = false;

  constructor(private _auth: AuthService, private router:Router) {
    this.user = new UsuarioModel('', '', '');
  }

  ngOnInit() {
    if(localStorage.getItem('email')){
    this.user.email = localStorage.getItem('email');
    this.recordar = true;  
    }
  }

  get(f: NgForm) {
    Swal.fire({
      icon: 'info',
      title: 'Wait please...',
    });
    Swal.showLoading();
    if (f.valid) {
      this._auth.signIn(this.user).subscribe(
        res => {
          Swal.fire({
            icon: 'success',
            title: 'Welcome',
          });
          if(this.recordar){
            localStorage.setItem('email',this.user.email);
            this.recordar = true;
          }else{
            localStorage.removeItem('email');
            this.recordar = false;
          }
          this.user = new UsuarioModel('', '', '');
          this.router.navigateByUrl('/home');
        }
        , (err) => {
          Swal.close();
          Swal.fire({
            icon: 'warning',
            title: 'Please enter a valid email',
            text: err.error.error.message,
            allowOutsideClick: false
          });
        });
    } else {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Please, check and complete the fields.',
        allowOutsideClick: false
      });
      return;
    }
  }
}