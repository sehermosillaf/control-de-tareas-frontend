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
  name: any;
  email: any;
  password: any;
  confirm_password: any;

  //valida campos vacios
  //TODO: Considerar refactorizar
  validarCamposVacios() {
    if (
      this.name > 0 ||
      this.email > 0 ||
      this.password > 0 ||
      this.confirm_password > 0
    ) {
      return true;
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos deben ser ingresados',
        icon: 'error',
        heightAuto: false,
      });
    }
  }

  validarPassword() {
    if (this.password === this.confirm_password) {
      return true;
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        heightAuto: false,
      });
    }
  }
  //TODO: considerar refactorizar
  iniciarSesion() {
    if (this.validarCamposVacios() && this.validarPassword()) {
      this.router.navigate(['/home']);
    }
  }

  /* TODO: Buscar formas de validar formularios en Angular
  validarEmail() {
    let formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
      String(this.email).toLowerCase()
    );

    if (this.email.match(formatoEmail)) {
      return true;
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Formato de correo no valido',
        icon: 'error',
        heightAuto: false,
      });
    }
  }
  */
}
