import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  name: any;
  email: any;
  password: any;
  confirm_password: any;

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesion...',
      duration: 2000,
    });

    loading.present();
  }
  validarEmail(email) {
    const regex = new RegExp('^(.+)@(.+)$', 'i');
    let result = regex.test(email);
    if (result) return true;
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El formato del correo no es correcto',
        heightAuto: false, // resuelve problema con ionic
      });
    }
  }
  onSubmit() {
    console.log(this.email);
    if (this.validarEmail(this.email)) {
      this.showLoading();
      this.router.navigate(['/home']);
    }
  }
}
