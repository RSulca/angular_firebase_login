import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/user.model';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private API_KEY: string = 'AIzaSyBFmBwOlqe_PiWLtJW22G4eQW4-brbOaaU';

  private userToken: string;

  //SignUp
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //SignIn
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) { 
    this.getToken();
  }

  logOut() { 
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
   }

  signIn(user: UsuarioModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };
    return this.http.post(`${this.URL}signInWithPassword?key=${this.API_KEY}`, authData).pipe(
      map(res => {
        this.saveToken(res['idToken']);
        return res;
      }))
  }

  signUp(user: UsuarioModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };
    return this.http.post(`${this.URL}signUp?key=${this.API_KEY}`, authData).pipe(
      map(res => {
        this.saveToken(res['idToken']);
        return res;
      }))
  }

  private saveToken(token: string) {
    this.userToken = token;
    localStorage.setItem('token', token);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  getToken() {
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated() {
    if(this.userToken.length < 2){
      return false;
    }else{
      const fecha = Number(localStorage.getItem('expira'));
      let dateExpira = new Date();
      dateExpira.setTime(fecha);
      if( new Date() < dateExpira ){
        return true;
      }else {
        return false;
      }
    }
  }
}