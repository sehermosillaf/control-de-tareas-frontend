import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TasksService } from '../services/tasks.service';
import * as moment from 'moment';
import { SubtasksService } from '../services/subtasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskFlowService } from '../services/task-flow.service';
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
  subtask: any;
  currentUserSource: any;
  lsUserID = localStorage.getItem('userID');
  justificacion: string;
  isModalOpen = false;
  isModalDetailsOpen = false;
  nombre: any;
  descripcion: any;
  minDate = moment().format();
  fechaInicio: any;
  fechaTermino: any;
  flujos: any;

  constructor(
    private userService: UsersService,
    private taskService: TasksService,
    private subtaskService: SubtasksService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskService.updateTaskState().subscribe((resp) => {
      console.log(resp);
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.userService.getUserByID(this.lsUserID).subscribe((resp) => {
      this.user = resp;
    });
    this.taskService.getTasksByUser(this.lsUserID).subscribe((resp) => {
      console.log(resp);
      this.tasksUser = resp;
    });
    this.taskService.updateTaskState().subscribe((resp) => {
      console.log(resp);
    });
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  openDetails(isOpen: boolean) {
    this.isModalDetailsOpen = isOpen;
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
    this.subtaskService.getSubtaskByTaskID(id).subscribe((resp) => {
      this.subtask = resp;
    });
  }

  declineTask() {
    const tareaRechazada = {
      idTarea: Number(this.clickedTaskID),
      justificacion: this.justificacion,
      idResponsable: Number(this.taskAutor),
    };
    console.log(tareaRechazada);
    this.taskService.declineTask(tareaRechazada).subscribe((resp) => {
      console.log(resp);
      this.ngOnInit();
      Swal.fire({
        icon: 'success',
        title: 'Tarea rechazada',
        text: 'Se le ha enviado una notificacion al usuario creador',
        heightAuto: false,
      });
    });
  }

  terminar(id) {
    console.log(id);
    this.taskService.completeTask(id).subscribe((resp) => {
      this.ngOnInit();
      console.log(id);
      Swal.fire({
        icon: 'success',
        title: 'Tarea terminada',
        text: 'Se ha terminado la tarea con exito',
        heightAuto: false,
      });
    });
  }

  logout() {
    localStorage.removeItem('userID');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  addSubtask() {
    const subtask = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      fechaCreacion: this.minDate,
      fechaInicio: this.fechaInicio,
      fechaTermino: this.fechaTermino,
      idTarea: this.clickedTaskID,
    };
    console.log(subtask);
    this.subtaskService.insertSubtask(subtask).subscribe((resp) => {
      console.log(resp);
      this.ngOnInit();
      Swal.fire({
        icon: 'success',
        title: 'Subtarea agregada',
        text: 'Se ha agregado una subtarea ha esta tarea',
        heightAuto: false,
      });
      console.log(resp);
      console.log(subtask);
    });
    this.taskService.updateTaskState();
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  //cerrar session - localstorage.
}
