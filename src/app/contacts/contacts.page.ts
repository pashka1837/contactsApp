import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Contacts } from '@capacitor-community/contacts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  constructor(private authServ: AuthService) {}
  errorMsg: string;
  permission: any;
  someD:any;
  


  ngOnInit(): void {
    this.authServ.redirect();
    this.getContactsPermit();
  }

  async getContactsPermit() {
  //  this.permission = Contacts.requestPermissions().subscribe(v=>)
   let permission = await Contacts.requestPermissions().catch(this.cathcPermError); 
   this.permission = permission;
    //  this.someD = permission.contacts
  }

  cathcPermError(e) {
     this.errorMsg = e;
  }

}
