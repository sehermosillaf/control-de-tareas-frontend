import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Validators } from '@angular/forms';
//import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router, private loadingCtrl: LoadingController) {}
  ngOnInit() {}
  name: string;
  email: string;
  password: any;
  confirm_password: any;

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
  }
  //TODO: verificar si esta bien la expresión regular
  validarEmail(email) {
    const regex = new RegExp('^(.+)@(.+)$', 'i');
    let result = regex.test(email);
    return result
      ? this.router.navigateByUrl('home')
      : Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El formato del correo no es correcto!',
          heightAuto: false, // resuelve problema con ionic
        });
  }
  onSubmit(form: NgForm) {
    if (this.validarEmail(form.value['email'])) {
    } else {
    }
  }
}
