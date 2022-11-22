import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioI } from '../models/user.interfaces';
import { ModalController } from '@ionic/angular';
import { JsonPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  userList: any;
  currentUserSource: any;
  lsUserID = localStorage.getItem('userID');
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  constructor(private userService: UsersService, private http: HttpClient,private modal: ModalController) {}

  ngOnInit() {
    this.userService.getUserByID(this.lsUserID).subscribe((resp) => {
      this.user = resp;
    });
    this.userService.getAllUsers().subscribe((resp) => {
      this.userList = resp;
    });
  }
  cardClick(){
    Swal.fire({
      icon: 'info',
      title: 'a...',
      text: 'aaa',
      heightAuto: false
    });
  }
  deleteUser(id) {
    Swal.fire({
      title: 'Estas seguro de eliminar este usuario?',
      text: 'No podras de revertir este cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar usuario!',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'Eliminado!',
          text: 'Este usuario a sido eliminado.',
          icon:'success',
          heightAuto: false
        });
      }
    });
  }

  tareasClick(){
    Swal.fire({
      title: 'Estas seguro de eliminar este usuario?',
      text: 'No podras de revertir este cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar usuario!',
      heightAuto: false
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  //cerrar session - localstorage.
  }

