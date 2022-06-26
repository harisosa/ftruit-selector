import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    public userSubject = new BehaviorSubject<User | null>(null);
    public currentUser ;
    public get userValue(): (User | null){
        return this.userSubject.value;
    }
  constructor(private http : HttpClient,private router : Router) { 
      let curr = JSON.parse(localStorage.getItem('currentUser') || "{}")
      if (curr !== "{}"){
        this.userSubject.next(curr)
      }else {
        this.userSubject.next(null)
      }
      
      this.currentUser = this.userSubject.asObservable();    
  }

  login(user : User){
    return this.http.get<any>(`./assets//user.json`)
  }
  logout(){
    localStorage.removeItem('currentUser');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
  }
}
