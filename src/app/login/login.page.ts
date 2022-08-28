import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}
  nombre: any;
  email: any;
  password: any;
  confirm_password: any;

  validarCamposVacios() {}

  iniciarSesion() {
    console.log(this.nombre, this.email, this.password, this.confirm_password);
    if (this.password === this.confirm_password) {
      this.router.navigate(['/home']);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        heightAuto: false,
      });
    }
  }

  validarEmail() {}
}
