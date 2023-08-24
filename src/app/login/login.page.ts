import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { myValidator } from '../validators/nospace.validator';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private fb: FormBuilder, private authServ: AuthService, public router: Router) {}

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

  ngOnInit() {
  }

  onSubmit(unInput, psInput) {    
    let userName =  this.fc.userName;
    let password =  this.fc.password;
    unInput.value = ``;
    psInput.value = ``;
    if(this.authServ.validate(userName.value, password.value)) this.router.navigate(['/contacts'])
    else this.authFail = true;
  }

  clear() {
    this.authFail = false;
  }

  get fc() {
    return this.form.controls;
  }

}
