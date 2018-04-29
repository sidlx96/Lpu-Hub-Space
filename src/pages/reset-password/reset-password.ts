import { Component } from '@angular/core';
import { IonicPage,AlertController,LoadingController,Loading, NavController, NavParams, Alert } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmailValidator } from '../../validators/email';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthService,
    formBuilder: FormBuilder
  ) {
    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  async resetPassword(): Promise<any> {
    if (!this.resetPasswordForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.resetPasswordForm.value}`
      );
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

       const email = this.resetPasswordForm.value.email; 

      try {
        const loginUser: void = await this.authProvider.resetPassword(email);
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: 'Check your inbox for a password reset link',
          buttons: [
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Ok',
              handler: data => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      }
    }
  }
}
