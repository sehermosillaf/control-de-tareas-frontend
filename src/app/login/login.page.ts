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

  // async showLoading() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Dismissing after 3 seconds...',
  //     duration: 3000,
  //   });

  //   loading.present();
  // }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.router.navigate(['/home']);
  }
}
