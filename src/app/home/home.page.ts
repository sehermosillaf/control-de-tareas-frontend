import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioI } from '../models/user.interfaces';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  currentUserSource: any;
  constructor(private userService: UsersService, private http: HttpClient) {}

  ngOnInit() {
    this.userService.getUserByID(2).subscribe((resp) => {
      this.user = resp;
      console.log(resp);
    });
  }
}
