import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
//import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any;
  password: any;
  user: any;
  error: '';

  constructor(
    public router: Router,
    private loadingCtrl: LoadingController,
    public auth: AuthService
  ) {}
  ngOnInit() {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesion...',
      duration: 1000,
    });

    loading.present();
  }
  // validarEmail(email) {
  //   const regex = new RegExp('^(.+)@(.+)$', 'i');
  //   const result = regex.test(email);
  //   if (!result) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  onSubmit() {
    this.auth.login(this.email, this.password).subscribe((resp) => {
      this.user = resp;
      this.showLoading();
      this.router.navigate(['/home']);
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email o contraseña',
        heightAuto: false
      });
    }
    );
  }
}
