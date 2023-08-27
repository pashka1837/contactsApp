import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PreventLoginGuard } from './guards/prevent-login.guard';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    title: 'ContactApp'
  },
  {
    path: 'login',
    title: 'Login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [PreventLoginGuard]
    
  },
  {
    path: 'contacts',
    title: 'Contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    title: 'Contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
