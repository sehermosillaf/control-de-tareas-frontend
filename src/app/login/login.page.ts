import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

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

  iniciarSesion() {
    console.log(this.nombre);
    this.router.navigate(['/home']);
  }
}
