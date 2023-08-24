import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Contacts } from '@capacitor-community/contacts';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  constructor(private authServ: AuthService, private router: Router) {}
  errorMsg: string;
  permission: any;
  someD:any;
  contacts: any;
  


  ngOnInit(): void {
    this.authServ.redirect();
    this.getContactsPermit();
  } 

  async getContactsPermit() {
  //  this.permission = Contacts.requestPermissions().subscribe(v=>)
  try{
    let permission = await Contacts.requestPermissions();
    if(!permission?.contacts) return;
    else if(permission.contacts === 'granted') {
      let data = await Contacts.getContacts({projection: {
        name: true,
        phones: true,
        emails: true,
        birthday: true
      }});
      this.contacts = data.contacts;
    }
  }
  catch (e) {
    this.cathcPermError(e)
  } 
  }

  filterName(cont){
    let name = cont.name;
    if(name) return name.display;
    return 'No Name Provided';
  }

  filterPhone(cont) {
    let phoneArr = cont.phones;
    if(phoneArr) return phoneArr[0].number;
    return 'No Phone Provided'   
  }

  cathcPermError(e) {
     this.errorMsg = e;
  } 

  openContact(contact) {
    this.router.navigate(['/contact'], {state: {contact}})
    
  }

}

/* async getContactsPermit() {
  //  this.permission = Contacts.requestPermissions().subscribe(v=>)
   let permission = await Contacts.requestPermissions().catch(this.cathcPermError); 
   if(!permission?.contacts) 
   this.permission = permission;
    //  this.someD = permission.contacts
  }*/
