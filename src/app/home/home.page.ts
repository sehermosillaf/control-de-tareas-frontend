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
  taskAutor: number;
  clickedTaskID: any;
  userList: any;
  tasksUser: any;
  currentUserSource: any;
  lsUserID = localStorage.getItem('userID');
  justificacion: string;
  isModalOpen = false;
  constructor(
    private userService: UsersService,
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
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  tareaClick(id) {
    console.log(id);
  }

  getTareaID(id) {
    this.taskService.getTaskAutor(id).subscribe((resp) => {
      this.taskAutor = Number(resp);
      this.clickedTaskID = Number(id);
      console.log(resp);
    });
  }

  declineTask() {
    const declinedTask = {
      idTarea: Number(this.clickedTaskID),
      justificacion: this.justificacion,
      idResponsable: Number(this.taskAutor),
    };
    console.log(this.declineTask);
    this.taskService.declineTask(declinedTask).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Tarea rechazada',
        text: 'Se le ha enviado una notificacion al usuario creador',
        heightAuto: false,
      });
    });
  }

  //cerrar session - localstorage.
}
