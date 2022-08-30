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
  name: any;
  email: any;
  password: any;
  confirm_password: any;

  // async showLoading() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Dismissing after 3 seconds...',
  //     duration: 3000,
  //   });

  //   loading.present();
  // }
  //TODO: verificar si esta bien la expresión regular
  validarEmail(email): any {
    const pattern = new RegExp('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\');
    let result = pattern.test(email);
    return result;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (this.validarEmail(this.email)) {
      this.router.navigate(['/home']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El formato del correo no es correcto!',
        heightAuto: false, // resuelve problema con ionic
      });
    }
  }
}
