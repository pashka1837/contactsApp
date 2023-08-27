import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './guards/auth.guard';
import { PreventLoginGuard } from './guards/prevent-login.guard';
import { StatusBar, Style } from '@capacitor/status-bar';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService, AlertService, AuthGuard, PreventLoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
  ionViewWillEnter() {
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setBackgroundColor({color: '#3880ff'}); 
  }
 
}
