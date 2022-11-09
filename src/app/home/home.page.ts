import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioI } from '../models/user.interfaces';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  userList: any;
  currentUserSource: any;
  constructor(private userService: UsersService, private http: HttpClient,private modal: ModalController) {}

  ngOnInit() {
    this.userService.getUserByID(1).subscribe((resp) => {
      this.user = resp;
      console.log(resp);
    });
  }
  listarUsuario() {
    this.userService.getUsers().subscribe((resp) => {
      this.userList = resp;
      console.log(resp);
    });
  }

}
