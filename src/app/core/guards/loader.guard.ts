import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/shared/utils/services/account.service';
import { finalize, map, mergeMap, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/utils/services/storage.service';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoaderGuard implements Resolve<any> {
  user: any
  constructor(
    private account: AccountService,
    private storage: StorageService
    ){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    this.user = this.storage.getLocalUser();
    let nome_usuario = this.user.nome_usuario
    
      
    return this.account.findByPerfil(nome_usuario).pipe( 
      tap( (usuarios: Usuarios) => {
        this.storage.setUser(usuarios);
        
      }
      ),
      finalize( () => {
        this.account.isLoggedIn.next(true);
      })
    );
  }
  
}
