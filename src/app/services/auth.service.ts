import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }
  
  userName = `greeTgo`;
  password = `1`;
  isAuthed: boolean = false;

  validate(userName,password): void {
  if(userName === this.userName && password === this.password) this.isAuthed = true; 
 }
 
  redirect(path:string): void {
    if(!this.isAuthed) this.router.navigate([path]);
  }  
}



