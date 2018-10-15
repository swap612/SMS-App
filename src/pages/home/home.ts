import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sms_var: any;
  smsList: any = [];
  constructor(public navCtrl: NavController, public androidPermission: AndroidPermissions, public platform: Platform) {
    this.checkPermission();
  }

  //checks the permission and ask for grant
  checkPermission() {
    this.androidPermission.checkPermission
      (this.androidPermission.PERMISSION.READ_SMS).then(
        success => {
          this.ReadSmsList();
        },
        err => {
          this.androidPermission.requestPermission
            (this.androidPermission.PERMISSION.READ_SMS).
            then(success => {
              this.ReadSmsList();
            },
              err => {
                alert("cancelled")
              });
        });

    this.androidPermission.requestPermissions
      ([this.androidPermission.PERMISSION.READ_SMS]);


  }

  ReadSmsList(){
    this.platform.ready().then((readySource)=>{
      let option ={
        box:'inbox',
        indexFrom: 0,
        maxCount: 20
      };

      if(this.sms_var)
      this.sms_var.listSMS(option,(ListSms)=>{
        this.smsList = ListSms 
      },
      Error => {
        alert(JSON.stringify(Error))
      });
    });     
  }
}
