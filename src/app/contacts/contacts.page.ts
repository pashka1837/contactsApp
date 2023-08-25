import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ContactPayload, Contacts } from '@capacitor-community/contacts';
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
  contacts: Array<ContactPayload>;
  


  ngOnInit(): void {
    console.log(`hey`)
    // this.authServ.redirect();
    this.getContactsPermit();
  } 

  async getContactsPermit() {
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
      // this.contacts = data.contacts.sort(this.sortContactsByName);
      this.contacts = data.contacts;

    }
  }
  catch (e) {
    this.cathcPermError(e)
  } 
  } 
  
  sortContactsByName(a :ContactPayload,b: ContactPayload) :any {
    let nameA = a.name;
    let nameB = b.name;
    // if(!nameA) nameA.display = 'z';
    // if(!nameB) nameB.display = 'z';
    return nameA.display.localeCompare(nameB.display);    
  }

  filterName(cont:ContactPayload){
    let name = cont.name;
    if(name) return name.display;
    return 'No Name Provided';
  }

  filterPhone(cont:ContactPayload) {
    let phoneArr = cont.phones;
    if(phoneArr) return phoneArr[0].number;
    return 'No Phone Provided'   
  }

  cathcPermError(e) {
     this.errorMsg = e;
  } 

  openContact(contact:ContactPayload) :void {
    this.router.navigate(['/contact'], {state: {contact}});    
  }

}

/* async getContactsPermit() {
  //  this.permission = Contacts.requestPermissions().subscribe(v=>)
   let permission = await Contacts.requestPermissions().catch(this.cathcPermError); 
   if(!permission?.contacts) 
   this.permission = permission;
    //  this.someD = permission.contacts
  }*/
