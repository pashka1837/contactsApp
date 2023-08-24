import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }
  
  userName = `1`;
  password = `1`;
  isAuthed: boolean = false;

  validate(uN,p): boolean {
   if(uN === this.userName && p === this.password) {
    this.isAuthed = true;
    return true;
  }
   return false;
  }

  redirect() {
    if(!this.isAuthed) this.router.navigate(['/login']);
  }  
}
