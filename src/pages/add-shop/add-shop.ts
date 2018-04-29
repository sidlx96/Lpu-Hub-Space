import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


import {  AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { HomePage } from '../home/home';


/**
 * Generated class for the AddShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
class Shop{
  shopName:string
  shopLocation:string
  shopWorkingHours:string
  shopWorkingDays:string
  shopSignatureDishes:any
  shopDomain:string
  shopContact:number
  shopPaymentMode:any
  shopDeliveryOption:any  
  shopImage:any  
  shopLikes:any
  shopComments:any
  
  

  constructor(){}
}

@Component({
  selector: 'page-add-shop',
  templateUrl: 'add-shop.html',
})
export class AddShopPage {

  

  captureDataUrl: string;
  alertCtrl: AlertController;

  // @Input('useURI') useURI: Boolean = true;
   
 
  shop:Shop = new Shop();
  constructor(private database: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,
    alertCtrl: AlertController,private camera: Camera) {
      this.alertCtrl=alertCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddshopPage');
  }

  getPicture(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };

    this.camera.getPicture(cameraOptions)
     .then((captureDataUrl) => {
       this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
    }, (err) => {
        console.log(err);
    });
  }  

  submit(){
      this.shop.shopImage=this.captureDataUrl;
      this.database.list('/shopsList').push(this.shop)
    this.shop = new Shop();
    this.navCtrl.push(HomePage);

    
     
  }

}
