import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ContactPayload, Contacts } from '@capacitor-community/contacts';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  data: any;
  constructor(private authServ: AuthService, private router: Router, private alertController: AlertController) {}
  errorMsg: string;
  permission: any;
  someD:any;
  contacts: Array<ContactPayload> | null;
  isSupported = false;
  barcodes: Barcode[] = [];
  
  

  ngOnInit(): void {
    // this.authServ.redirect();
    this.getContacts();  
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });  
  } 

  async getContacts() {
    const errorPermisMsg = 'Please grant contacts permisson.'
    const granted = await this.requestPermissionsContacts();
    if(!granted) {
      this.presentAlert(errorPermisMsg);
      this.contacts = null;
      return;
    }
    let data = await Contacts.getContacts({projection: {
      name: true,
      phones: true,
      emails: true,
      birthday: true,
      image: true
    }});
    this.contacts =  data.contacts.sort(this.sortContactsByName); 
  }

  async scan(): Promise<void> {
    const errorPermisMsg = 'Please grant camera permisson.'
    const granted = await this.requestPermissionsCamera();
    if (!granted) {
      this.presentAlert(errorPermisMsg);
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    const rawValue = barcodes[barcodes.length-1].rawValue;
    this.data = rawValue
    this.presentAlert(rawValue);
    this.barcodes.push(...barcodes);
  }
  
  async requestPermissionsContacts(): Promise<boolean>{
    const {contacts} = await Contacts.requestPermissions();
    return contacts === 'granted' || contacts === "prompt" ;
  }

  async requestPermissionsCamera(): Promise<boolean>{
    const {camera} = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === "limited" ;
  }

  async presentAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  
  sortContactsByName(a :ContactPayload,b: ContactPayload) :any {
    let contactA:ContactPayload  = a;
    let contactB:ContactPayload = b;
    let nameA =``;
    let nameB =``;
    if(contactA.name) nameA = contactA.name.display;
    else nameA = `X`
    if(contactB.name) nameB = contactB.name.display;
    else nameB = `X`;
    return nameA.localeCompare(nameB);    
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



  // ngOnInit(): void {
  //   this.authServ.redirect();
  //   this.getContactsPermit();    
  // } 

  // async getContactsPermit() {
  //   try{
  //     let permission = await Contacts.requestPermissions();
  //     if(!permission?.contacts) return;
  //     else if(permission.contacts === 'granted') {
  //       let data = await Contacts.getContacts({projection: {
  //         name: true,
  //         phones: true,
  //         emails: true,
  //         birthday: true,
  //         image: true
  //       }});
  //       this.contacts =  data.contacts.sort(this.sortContactsByName);
  //     }
  //   }
  //   catch (e) {
  //     this.cathcPermError(e)
  //   } 
  // }