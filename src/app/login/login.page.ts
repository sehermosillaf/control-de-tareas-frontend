import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
  name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';

  iniciarSesion() {
    alert(
      this.name +
        ', ' +
        this.email +
        ', ' +
        this.password +
        ', ' +
        this.confirm_password
    );

    this.router.navigate(['/home']);
  }
}
