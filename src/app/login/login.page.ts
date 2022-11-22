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

  // async showLoading() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Iniciando sesion...',
  //     duration: 1000,
  //   });
  //   loading.present();
  // }

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe((resp) => {
      this.user = resp;
      localStorage.setItem('userID',this.user.id);
      console.log(this.user.roles[0]?.nombre);
      // this.showLoading();
      if(this.user.roles[0]?.id === 1) {
        this.router.navigate(['/adminpanel']);
      }
      else if (this.user.roles[0]?.id === 2){
        this.router.navigate(['/home']);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No posees rol asignado',
          heightAuto: false
        });
      }

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
    // validarEmail(email) {
  //   const regex = new RegExp('^(.+)@(.+)$', 'i');
  //   const result = regex.test(email);
  //   if (!result) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
}
