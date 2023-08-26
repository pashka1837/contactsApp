import { Injectable } from '@angular/core';
import { ContactPayload, Contacts } from '@capacitor-community/contacts';
import { RequestPermissionsService } from './request-permissions.service';
import { AlertMessage } from '../models/alertMsgs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private permission: RequestPermissionsService, private alert: AlertService) { }

  async getContacts(): Promise<ContactPayload[]> {
    const alertMsg: AlertMessage = {
      header: 'Permission denied!',
      message: 'Please grant contacts permisson.',
      buttons: ['OK']
    } 
    let contacts: ContactPayload[]=[];
    const granted = await this.permission.requestPermissionsContacts();
    if(!granted) {
      this.alert.presentAlert(alertMsg);
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
