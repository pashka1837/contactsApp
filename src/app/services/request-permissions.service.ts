import { Injectable } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root'
})
export class RequestPermissionsService {
  constructor() { }
  async requestPermissionsContacts(): Promise<boolean>{
    const {contacts} = await Contacts.requestPermissions();
    return contacts === 'granted' || contacts === "prompt" ;
  }

  async requestPermissionsCamera(): Promise<boolean>{
    const {camera} = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === "limited" ;
  }
}
