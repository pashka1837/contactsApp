import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  constructor( private isAuth: AuthService) { }
  contact: any;
  
  ngOnInit(): void {
    // this.isAuth.redirect();
    this.contact = history.state.contact;  
  }

}
