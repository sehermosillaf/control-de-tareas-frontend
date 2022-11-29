import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { TasksService } from '../services/tasks.service';
import { SubtasksService } from '../services/subtasks.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  taskAutor: number;
  userList: any;
  tasksUser: any;
  currentUserSource: any;
  lsUserID = localStorage.getItem('userID');
  justificacion: string;
  name: string;
  isModalOpen = false;
  isModalDetailsOpen = false;
  clickedTaskID: any;
  taskID: number;
  subtask: any;
  constructor(
    private userService: UsersService,
    private modal: ModalController,
    private taskService: TasksService,
    private subtaskService: SubtasksService
  ) {}

  ngOnInit() {
    this.userService.getUserByID(this.lsUserID).subscribe((resp) => {
      this.user = resp;
    });
    this.taskService.getTasksByUser(this.lsUserID).subscribe((resp) => {
      this.tasksUser = resp;
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getSubtareas(subtareas) {
    this.subtask = subtareas;
    console.log(subtareas);
  }

  getTareaID(id) {
    this.taskService.getTaskAutor(id).subscribe((resp) => {
      this.taskAutor = Number(resp);
      this.clickedTaskID = id;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  declineTask(id) {
    this.modal.dismiss('confirm');
    const declinedTask = {
      idTarea: Number(id),
      justificacion: this.justificacion,
      idResponsable: this.taskAutor,
    };
    this.taskService.declineTask(declinedTask).subscribe((resp) => {
      console.log(resp);
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.justificacion = `Hello, ${ev.detail.data}!`;
    }
    console.log('nasty');
  }
  //cerrar session - localstorage.
}
