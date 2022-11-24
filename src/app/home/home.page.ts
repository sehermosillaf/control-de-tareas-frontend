import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { OverlayEventDetail } from '@ionic/core/components';
import { TasksService } from '../services/tasks.service';
import { IonModal } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  userList: any;
  tasksUser: any;
  currentUserSource: any;
  lsUserID = localStorage.getItem('userID');
  comentario: string;
  name: string;
  constructor(private userService: UsersService, private modal: ModalController, private taskService: TasksService) {}

  ngOnInit() {
    this.userService.getUserByID(this.lsUserID).subscribe((resp) => {
      this.user = resp;
    });
    this.taskService.getTasksByUser(this.lsUserID).subscribe((resp) => {
      this.tasksUser = resp;
    });
  }
  // cardClick(){
  //   Swal.fire({
  //     icon: 'info',
  //     title: 'a...',
  //     text: 'aaa',
  //     heightAuto: false
  //   });
  // }
  // deleteUser(id) {
  //   Swal.fire({
  //     title: 'Estas seguro de eliminar este usuario?',
  //     text: 'No podras de revertir este cambio!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, eliminar usuario!',
  //     heightAuto: false
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title:'Eliminado!',
  //         text: 'Este usuario a sido eliminado.',
  //         icon:'success',
  //         heightAuto: false
  //       });
  //     }
  //   });
  // }
  declineTask(){

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
      this.comentario = `Hello, ${ev.detail.data}!`;
    }
  }
  //cerrar session - localstorage.
  }

