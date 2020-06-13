import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UsuarioModel;

  constructor(private _auth: AuthService, private router:Router) { }

  ngOnInit() {
    this.user = new UsuarioModel('', '', '');
  }

  get(form: NgForm) {
    Swal.fire({
      icon: 'info',
      title: 'Wait please...',
    });
    Swal.showLoading();
    if (form.valid) {
      this._auth.signUp(this.user).subscribe(
        (res) => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'You have registered successfully',
            allowOutsideClick: false
          });
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
        })
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
