import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth-error',
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.scss'],
})
export class AuthErrorComponent  implements OnInit {
  @Input() messageReq:string;
  @Input() messageInval:string;
  @Input() field: FormControl;

  constructor() { }

  ngOnInit() {}

  ifRequired() : boolean {
     if(this.field.errors?.required && this.field.touched) return true;
     return false;
  }

  ifInvalid() :boolean {
    if(this.field.errors?.noSpaceValidation) return true;
    return false;
  }

}
