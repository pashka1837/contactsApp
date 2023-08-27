import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ContactPayload } from '@capacitor-community/contacts';
import { Observable, retry } from 'rxjs';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertService } from '../services/alert.service';
import { AlertMessage } from '../models/alertMsgs';
import { ContactsService } from '../services/contacts.service';
import { ScanBarcodeService } from '../services/scan-barcode.service';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  constructor(private contactServ: ContactsService,private scanServ: ScanBarcodeService, private authServ: AuthService, private router: Router, private alert: AlertService) {}

  
  contacts: Array<ContactPayload>;
  isSupported = false;
  barcodes: Barcode[] = []; 
  
  ionViewWillEnter(): void {
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setBackgroundColor({color: '#3880ff'});
  }

 async ngOnInit(): Promise<void> {
    await this.getContacts();
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });  
  } 

  async getContacts(): Promise<void> {
    const alertErrorMsg: AlertMessage = {
      header: 'Permission denied!',
      message: 'Please grant contacts permisson.',
      buttons: ['OK']
    } 
    let contacts = await this.contactServ.getContacts();
    if(contacts.length===0) {
      this.alert.presentAlert(alertErrorMsg);
      return;
    }
    this.contacts = contacts.sort(this.sortContactsByName);
  }
  

  async getScan(): Promise<void> {
    const alertErrorMsg: AlertMessage = {
      header: 'Permission denied!',
      message: 'Please grant camera permisson.',
      buttons: ['OK']
    } 
    let barcodes = await this.scanServ.scan();
    if(barcodes.length===0) {
      this.alert.presentAlert(alertErrorMsg);
      return;
    }
    const rawValue = barcodes[barcodes.length-1].rawValue;
    const format = barcodes[barcodes.length-1].format;
    const alertDataMsg : AlertMessage = {
      header: format,
      message: rawValue,
      buttons: ['OK']
    }
    this.alert.presentAlert(alertDataMsg);
    this.barcodes.push(...barcodes);
  }

  
  sortContactsByName(a :ContactPayload,b: ContactPayload) :number {
    let nameA =``;
    let nameB =``;
    (a.name)? nameA = a.name.display: nameA = `Z9!`;     
    (b.name)? nameB = b.name.display: nameB = `Z9!`;    
    return nameA.localeCompare(nameB);    
  }

  filterName(cont:ContactPayload):string{
    let name = cont.name;
    if(name) return name.display;
    return '';
  }

  filterPhone(cont:ContactPayload):string {
    let phoneArr = cont.phones;
    if(phoneArr) return phoneArr[0].number;
    return 'No Phone Provided'   
  }

  openContact(contact:ContactPayload) :void {
    this.router.navigate(['/contact'], {state: {contact}});    
  }

}

