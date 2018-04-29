import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-view-shop',
  templateUrl: 'view-shop.html',
})
export class ViewShopPage {
  shop:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shop=this.navParams.get('key');
  }

  ionViewDidLoad() {
    
    console.log(this.navParams.get('key').shopContact);
  }




}
