import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
// import { SMS } from '@ionic-native/sms';
declare var SMS:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  smsList:any=[];
  constructor(public navCtrl: NavController, public androidPermission: AndroidPermissions, public platform: Platform) {
     this.checkPermission();
  }

  //checks the permission and ask for grant
  checkPermission() {
    // alert("checkpermiassion")
   // ionViewDidEnter(){

    this.androidPermission.checkPermission (this.androidPermission.PERMISSION.READ_SMS).then(
      success => {
        this.ReadSmsList();
      },
      err => {
        this.androidPermission.requestPermission (this.androidPermission.PERMISSION.READ_SMS).then(
          success => {
            this.ReadSmsList();
          },
          err => {
            alert("cancelled")
          });
      });

    this.androidPermission.requestPermissions([this.androidPermission.PERMISSION.READ_SMS]);

  }

  ReadSmsList() {
    this.platform.ready().then((readySource) => {
      let filter = {
        box: 'inbox',            // 'inbox' (default), 'sent', 'draft'
        indexFrom: 0,            // start from index 0
        maxCount: 2000,             // count of SMS to return each time
        
      };

      if (SMS) SMS.listSMS(filter, (listSMS)=>{
          this.smsList = listSMS
          // alert("Read");
        },
          Error => {
            alert(JSON.stringify(Error))
          });
    });
  }
}
