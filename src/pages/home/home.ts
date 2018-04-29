import { Component } from '@angular/core';
import { NavController,AlertController,NavParams ,NavPush} from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ViewShopPage } from '../view-shop/view-shop';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shops: Observable<any[]>;
  alertCtrl:AlertController;
  params:any;
  constructor(
    alertCtrl: AlertController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public authProvider: AuthService,
    private afDB: AngularFireDatabase) {
      this.shops = afDB.list('shopsList').snapshotChanges().map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        });
      this.alertCtrl = alertCtrl;
    }

  viewPage(shop){
    this.navCtrl.push(ViewShopPage,{key:shop});
  }
  

}
