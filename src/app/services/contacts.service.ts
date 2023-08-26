import { Injectable } from '@angular/core';
import { ContactPayload, Contacts } from '@capacitor-community/contacts';
import { RequestPermissionsService } from './request-permissions.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private permission: RequestPermissionsService) { }

  async getContacts(): Promise<ContactPayload[]> {
    let contacts: ContactPayload[]=[];
    const granted = await this.permission.requestPermissionsContacts();
    if(!granted) {
      return contacts;
    }
    let data = await Contacts.getContacts({projection: {
      name: true,
      phones: true,
      emails: true,
      birthday: true,
      image: true
    }});
    contacts =  data.contacts; 
    return contacts;
  }
}
