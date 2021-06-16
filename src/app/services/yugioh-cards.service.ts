import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class YugiohCardsService  {
  url: string = `${environment.db_ygoprodeck}`;
  showMenu = new EventEmitter<boolean>();

  constructor(
    private httpClient: HttpClient
  ) { }

  listarTodos(){
    let headers = new HttpHeaders();
    // headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.get(`${environment.db_ygoprodeck}`);
  }
  filtroPorNome(nome : any){
    let headers = new HttpHeaders();
    // headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    return this.httpClient.get(`${environment.db_ygoprodeck}/${nome}`);
  }

}
