import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
//import { AuthService } from '../auth.service';
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

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.router.navigate(['/home']);
  }
}
