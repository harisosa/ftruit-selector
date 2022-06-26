import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  constructor(private http : HttpClient) { }

  GettAllFruit(){
    return this.http.get<any>(`./assets/fruit.json`)
  }

  getFavoriteFruit(name : string) : Observable<string>{

    return new Observable((observer) => {
      let fruit = localStorage.getItem(name) || ""
      observer.next(fruit);
    })
  }

  remove(name : string){

    return new Observable((observer) => {
      localStorage.removeItem(name);
      observer.next();
    })

  }

  add(name : string,fav : string){

    return new Observable((observer) => {
      localStorage.setItem(name,fav);
      observer.next();
    })

  }

}
