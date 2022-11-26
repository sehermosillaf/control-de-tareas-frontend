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
  taskAutor: any;
  userList: any;
  tasksUser: any;
  currentUserSource: any;
  lsUserID = localStorage.getItem('userID');
  justificacion: any;
  name: string;

  constructor(
    private userService: UsersService,
    private modal: ModalController,
    private taskService: TasksService
  ) {}

  ngOnInit() {
    this.userService.getUserByID(this.lsUserID).subscribe((resp) => {
      this.user = resp;
    });
    this.taskService.getTasksByUser(this.lsUserID).subscribe((resp) => {
      this.tasksUser = resp;
      console.log(this.tasksUser);
    });
    this.userService
      .getUserByID(this.tasksUser.usuarioCreador)
      .subscribe((resp) => {
        this.taskAutor = resp;
        console.log(this.taskAutor);
      });
  }

  tareaClick(id) {
    console.log(id);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  declineTask(id, usuarioCreador) {
    this.modal.dismiss('confirm');
    const declinedTask = {
      idTarea: Number(id),
      justificacion: this.justificacion,
      idResponsable: Number(usuarioCreador),
    };
    this.taskService.declineTask(declinedTask).subscribe((resp) => {
      console.log(resp);
      console.log(declinedTask);
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.justificacion = `Hello, ${ev.detail.data}!`;
    }
  }
  //cerrar session - localstorage.
}
