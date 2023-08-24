import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { myValidator } from '../validators/nospace.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: any;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
     userName: ['', [
        Validators.required,
        myValidator.noSpaceValidation
     ]],
     password: ['',[
        Validators.required,
        myValidator.noSpaceValidation
     ]]
  })
   }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.fc)
  }

  get fc() {
    return this.form.controls
  }

}
