"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2968],{2968:(Y,v,e)=>{e.r(v),e.d(v,{ContactsPageModule:()=>F});var g=e(6814),D=e(95),u=e(7027),f=e(6958),m=e(5861),h=e(2726);const C=(0,h.fo)("BarcodeScanner",{web:()=>e.e(7338).then(e.bind(e,7338)).then(t=>new t.BarcodeScannerWeb)});var d=e(3020),s=e(6689);const N=(0,h.fo)("Contacts",{web:()=>e.e(7138).then(e.bind(e,7138)).then(t=>new t.ContactsWeb)});let l=(()=>{var t;class o{constructor(){}requestPermissionsContacts(){return(0,m.Z)(function*(){const{contacts:n}=yield N.requestPermissions();return"granted"===n||"prompt"===n})()}requestPermissionsCamera(){return(0,m.Z)(function*(){const{camera:n}=yield C.requestPermissions();return"granted"===n||"limited"===n})()}}return(t=o).\u0275fac=function(n){return new(n||t)},t.\u0275prov=s.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),o})(),A=(()=>{var t;class o{constructor(n){this.permission=n}getContacts(){var n=this;return(0,m.Z)(function*(){let r=[];return(yield n.permission.requestPermissionsContacts())&&(r=(yield N.getContacts({projection:{name:!0,phones:!0,emails:!0,birthday:!0,image:!0}})).contacts),r})()}}return(t=o).\u0275fac=function(n){return new(n||t)(s.LFG(l))},t.\u0275prov=s.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),o})(),O=(()=>{var t;class o{constructor(n){this.permission=n}scan(){var n=this;return(0,m.Z)(function*(){if(!(yield n.permission.requestPermissionsCamera()))return[];const{barcodes:a}=yield C.scan();return a})()}}return(t=o).\u0275fac=function(n){return new(n||t)(s.LFG(l))},t.\u0275prov=s.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),o})();var b=e(2333),R=e(3251);function k(t,o){if(1&t){const c=s.EpF();s.TgZ(0,"ion-list")(1,"ion-item",6),s.NdJ("click",function(){const i=s.CHM(c).$implicit,a=s.oxw();return s.KtG(a.openContact(i))}),s.TgZ(2,"ion-avatar",7),s._UZ(3,"img",8),s.qZA(),s.TgZ(4,"ion-label")(5,"h1"),s._uU(6),s.qZA(),s.TgZ(7,"p"),s._uU(8),s.qZA()()()()}if(2&t){const c=o.$implicit,n=s.oxw();s.xp6(6),s.Oqu(n.filterName(c)),s.xp6(2),s.Oqu(n.filterPhone(c))}}const w=[{path:"",component:(()=>{var t;class o{constructor(n,r,i,a,E){this.contactServ=n,this.scanServ=r,this.authServ=i,this.router=a,this.alert=E,this.isSupported=!1,this.barcodes=[]}ionViewWillEnter(){d.A_.setOverlaysWebView({overlay:!1}),d.A_.setBackgroundColor({color:"#3880ff"})}ngOnInit(){var n=this;return(0,m.Z)(function*(){yield n.getContacts(),C.isSupported().then(r=>{n.isSupported=r.supported})})()}getContacts(){var n=this;return(0,m.Z)(function*(){let i=yield n.contactServ.getContacts();0!==i.length?n.contacts=i.sort(n.sortContactsByName):n.alert.presentAlert({header:"Permission denied!",message:"Please grant contacts permisson.",buttons:["OK"]})})()}getScan(){var n=this;return(0,m.Z)(function*(){let i=yield n.scanServ.scan();0!==i.length?(n.alert.presentAlert({header:i[i.length-1].format,message:i[i.length-1].rawValue,buttons:["OK"]}),n.barcodes.push(...i)):n.alert.presentAlert({header:"Permission denied!",message:"Please grant camera permisson.",buttons:["OK"]})})()}sortContactsByName(n,r){let i="",a="";return i=n.name?n.name.display:"Z9!",a=r.name?r.name.display:"Z9!",i.localeCompare(a)}filterName(n){let r=n.name;return r?r.display:""}filterPhone(n){let r=n.phones;return r?r[0].number:"No Phone Provided"}openContact(n){this.router.navigate(["/contact"],{state:{contact:n}})}}return(t=o).\u0275fac=function(n){return new(n||t)(s.Y36(A),s.Y36(O),s.Y36(b.e),s.Y36(f.F0),s.Y36(R.c))},t.\u0275cmp=s.Xpm({type:t,selectors:[["app-contacts"]],decls:8,vars:4,consts:[[3,"translucent"],["color","primary"],["color","light","fill","clear","slot","end",3,"disabled","click"],["name","scan"],["color","light",3,"fullscreen"],[4,"ngFor","ngForOf"],["detail","true","button","",3,"click"],["slot","start"],["alt","Silhouette of a person's head","src","https://ionicframework.com/docs/img/demos/avatar.svg"]],template:function(n,r){1&n&&(s.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title"),s._uU(3,"Contacts"),s.qZA(),s.TgZ(4,"ion-button",2),s.NdJ("click",function(){return r.getScan()}),s._UZ(5,"ion-icon",3),s.qZA()()(),s.TgZ(6,"ion-content",4),s.YNc(7,k,9,2,"ion-list",5),s.qZA()),2&n&&(s.Q6J("translucent",!0),s.xp6(4),s.Q6J("disabled",!r.isSupported),s.xp6(2),s.Q6J("fullscreen",!0),s.xp6(1),s.Q6J("ngForOf",r.contacts))},dependencies:[g.sg,u.BJ,u.YG,u.W2,u.Gu,u.gu,u.Ie,u.Q$,u.q_,u.wd,u.sr],styles:[".contact[_ngcontent-%COMP%]{width:90vw;height:100px;padding:3% 5%;grid-template-columns:5fr 1fr}ion-icon[_ngcontent-%COMP%]{width:50px;height:50px}"]}),o})()}];let I=(()=>{var t;class o{}return(t=o).\u0275fac=function(n){return new(n||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[f.Bz.forChild(w),f.Bz]}),o})(),F=(()=>{var t;class o{}return(t=o).\u0275fac=function(n){return new(n||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({providers:[l,A,O],imports:[g.ez,D.u5,u.Pc,I]}),o})()}}]);