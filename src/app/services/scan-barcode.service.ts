import { Injectable } from '@angular/core';
import { RequestPermissionsService } from './request-permissions.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root'
})
export class ScanBarcodeService {
  constructor(private permission: RequestPermissionsService) { }

  async scan(): Promise<Barcode[]> {
    
    const granted = await this.permission.requestPermissionsCamera();
    let scanner: Barcode[] = [];
    if (!granted) {
      return scanner;
    }
    const { barcodes } = await BarcodeScanner.scan();
    return barcodes;
  }
}
