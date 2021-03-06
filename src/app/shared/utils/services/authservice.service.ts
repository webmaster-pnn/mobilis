import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from "@auth0/angular-jwt";

import { Usuarios } from 'src/app/core/models/usuarios';
import { API_CONFIG } from 'src/app/core/config/api.config';
import { LocalUser } from 'src/app/core/models/local_user';
import { StorageService } from './storage.service';
import { tap, finalize, mergeMap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { SubjectSubscriber } from 'rxjs/internal/Subject';



@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  jwt = new JwtHelperService();


  constructor(
    private http: HttpClient,
    private storage: StorageService, 
    private account: AccountService,
    private router: Router
    ) { }

  authenticate(usuario: any){
    return this.http.post(`${API_CONFIG.baseurl}/login`, usuario, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      tap(response => {
        this.succesfulLogin(response.headers.get('Authorization'))
      })
);
  }



  succesfulLogin(authorizationValue: String){
    if(authorizationValue != null){
      let user = this.extractToken(authorizationValue.substring(7));
      this.storage.setLocalUser(user);

    }
    
    return null;
  }

  logout(){
    this.storage.setLocalUser(null);
    this.storage.setUser(null);
    localStorage.clear();
    this.account.isLoggedIn.next(false);
    this.router.navigate(['login'])

  }
  

  private extractToken(token: any){
    let nome =  JSON.stringify(this.jwt.decodeToken(token))
    let user: LocalUser = {
      nome_usuario: JSON.parse(nome).sub,
      token: token
    }
    return user;
  }
}
