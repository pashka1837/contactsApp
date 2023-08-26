import { Component } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { myValidator } from '../validators/nospace.validator';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage  {
  constructor(private fb: FormBuilder, private authServ: AuthService, public router: Router) {}
  spinner  =false;
  authFail = false;  

  form = this.fb.group({
    userName: ['', [
       Validators.required,
       myValidator.noSpaceValidation,
    ]],
    password: ['',[
       Validators.required,
       myValidator.noSpaceValidation,
    ]]
  });

  async await(ms){
    return new Promise((resolve)=>setTimeout(resolve, ms))};

  async onSubmit():Promise<void> {
    this.spinner = true;      
    let userName =  this.fc.userName.value;
    let password =  this.fc.password.value;
    this.authServ.validate(userName, password);
    await this.await(1200);
    this.spinner = false;  
    if(this.authServ.isAuthed) this.router.navigate(['/contacts']);
    else {
      this.authFail = true;
      this.form.reset({userName:'', password: ''});
    }
  }

  clear():void {
    this.authFail = false;
  }

  get fc() {
    return this.form.controls;
  }

}
