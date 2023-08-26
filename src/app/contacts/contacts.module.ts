import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { RequestPermissionsService } from '../services/request-permissions.service';
import { ContactsService } from '../services/contacts.service';
import { ScanBarcodeService } from '../services/scan-barcode.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsPageRoutingModule
  ],
  declarations: [ContactsPage],
  providers: [RequestPermissionsService, ContactsService, ScanBarcodeService]
})
export class ContactsPageModule {}
