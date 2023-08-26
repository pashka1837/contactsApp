import {  Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BirthdayPayload, ContactPayload, OrganizationPayload } from '@capacitor-community/contacts';
import { Phone } from '../models/contactPhone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  constructor( private authServ: AuthService, private router : Router) { }

  spaceRegex: RegExp = /\s|\-/g; 

  contact: ContactPayload;

  organization: OrganizationPayload | null;  
  
  name: string;
  phones: Array<Phone> = [];
  birthday: string | null;
  note: string | null;
  imgUrl: string | null;
  
  ngOnInit(): void {
    this.contact = history.state.contact; 
    this.decompose(this.contact);
  }

  
  decompose(contact:ContactPayload): void {    
    this.name = this.getName(contact);
    this.getPhones(contact);

    this.organization = this.getOrganization(contact);

    this.birthday = this.getBirthday(contact);

    this.imgUrl = this.getImage(contact);
  }

  getName(contact: ContactPayload):string {
    if(!contact.name) return 'No Name Provided';
    return contact.name.display;    
  }

  getPhones(contact: ContactPayload): void {
    if(contact.phones) {
      
      let curPhone:any = contact.phones[0];      
      curPhone.number = curPhone.number.replace(this.spaceRegex, '');

      if(contact.phones.length >1 ) {        
        for(let i=0; i< contact.phones.length-1; i++) {
          let thisN = contact.phones[i].number.replace(this.spaceRegex, '');
          this.phones.push({type: contact.phones[i].type, number: thisN});
          
          for(let y=i+1; y< contact.phones.length-1; y++) {
            let seaechN = contact.phones[y].number.replace(this.spaceRegex, '');
            if(thisN === seaechN) contact.phones.splice(y,1);
          }
        }
      }
      else  this.phones.push({type: curPhone.type, number: curPhone.number});
    }
  }

  getOrganization(contact) {
    let organization: OrganizationPayload;
    if(contact.organization) {
      organization = {
        company: contact.organization.company || '',
        jobTitle: contact.organization.jobTitle || '',
        department: contact.organization.department || '',
      }
    }
    else organization = null;
    return organization;
  }

  getBirthday(contact) : string| null {
    let birthdayObj:BirthdayPayload = contact.birthday;
    let birthday:string = ``;
    if(birthdayObj) {
      birthday = `${birthdayObj.day || 'XX'}.${(birthdayObj.month) || 'XX'}.${(birthdayObj.year) || 'XXXX'}`;
    }
    return birthday || null;    
  }

  getImage(contact) : string| null{
    let imgUrl= ``;
    if(contact.image) imgUrl = contact.image.base64String;
    return imgUrl || null;
  }  
} 


