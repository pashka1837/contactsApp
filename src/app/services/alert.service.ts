import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertMessage } from '../models/alertMsgs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async presentAlert(alertMsg: AlertMessage): Promise<void> {
    const alert = await this.alertController.create(alertMsg);
    await alert.present();
  }
}
