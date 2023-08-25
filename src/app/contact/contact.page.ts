import { AfterContentInit, Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BirthdayPayload, ContactPayload } from '@capacitor-community/contacts';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  
  birthday: string|null;
  note: string | null;
  // emails: any;
  imgUrl: string | null;
  constructor( private isAuth: AuthService) { }

  name: string;
  organization: Object | null;  
  contact: ContactPayload;
  phones: Array<Phone> = [];
  
  
  ngOnInit(): void {
    // this.isAuth.redirect();
    this.contact = history.state.contact; 
    this.decompose(this.contact);
    
    

    // for( let key in this.contact) {
    //   if(key)
    //   this.data.push(key);
    // }  
  }

  // filterName(key){
  //   if(name) return name.display;
  //   return 'No Name Provided';
  // }

  decompose(contact:ContactPayload): void {
    // delete contact.contactId;
    
    this.name = this.getName(contact);
    // delete contact.name;

    this.getPhones(contact);
    // delete contact.phones;

    this.organization = this.getOrganization(contact);

    this.birthday = this.getBirthday(contact);

    this.imgUrl = this.getImage(contact);

    // this.note = contact.note || null;
    
  }

  getName(contact: ContactPayload):string {
    if(!contact.name) return 'Name is not Provided';
    return contact.name.display;    
  }

  getPhones(contact) {
    if(contact.phones) {
      
      let curPhone:any = contact.phones[0];      
      curPhone.number = curPhone.number.replace(/\s|\-/g, '');

      if(contact.phones.length >1 ) {
        
        for(let i=0; i< contact.phones.length-1; i++) {
          let thisN = contact.phones[i].number.replace(/\s|\-/g, '');
          this.phones.push({type: contact.phones[i].type, number: thisN});
          
          for(let y=i+1; y< contact.phones.length-1; y++) {
            let seaechN = contact.phones[y].number.replace(/\s|\-/g, '');
            if(thisN === seaechN) contact.phones.splice(y,1);
          }

        }
      }
      else  this.phones.push({type: curPhone.type, number: curPhone.number});
    }
    // else this.phones.push({type: 'Phone Number', number: 'Not Provided'});
    
  }

  getOrganization(contact) {
    let organization: Object;
    if(contact.organization) {
      organization = {
        Company: contact.organization.company || '',
        Position: contact.organization.jobTitle || '',
        Depatment: contact.organization.department || '',
      }
    }
    else organization = null;
    return organization;
  }

  getBirthday(contact) {
    let birthdayObj:BirthdayPayload;
    let birthday:string
    if(contact.birthday) {
      birthdayObj = contact.birthday;
      birthday = `${birthdayObj.day || 'XX'}.${(birthdayObj.month) || 'XX'}.${(birthdayObj.year) || 'XXXX'}`;
    }
    else birthday = null;
    return birthday;    
  }

  // getEmails(contact) {
  //   if(contact.emails) {
  //     contact.emails.forEaach(email=> {
  //       this.emails.push({})
  //     })
  //   }
  // }

  getImage(contact) {
    let imgUrl= ``;
    if(contact.image) {
      imgUrl = contact.image.base64String;
      return imgUrl;
    }
    return null;
  }


  
} 

interface Phone {
  type: string,
  number: string
}
