import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import * as moment from 'moment';
import { TasksService } from 'src/app/services/tasks.service';
import { Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MailSenderService } from 'src/app/services/mail-sender.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-tarea',
  templateUrl: './modal-tarea.component.html',
  styleUrls: ['./modal-tarea.component.scss'],
})
export class ModalTareaComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Output() newItemEvent = new EventEmitter();
  isModalOpen = false;
  nombre: any;
  descripcion: any;
  fechaCreacion: any;
  fechaInicio: any;
  fechaTermino: any;
  usuarioResponsable: any;
  currentDate = new Date();
  formattedDate = this.currentDate.toLocaleDateString();
  minDate = moment().format();
  funcList: any;
  currentSelectedUser = undefined;
  email: any;
  loggedUser = localStorage.getItem('userID');
  loggedUserUnit = localStorage.getItem('userUnit');

  constructor(
    private taskService: TasksService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.userService.getFunc().subscribe((resp) => {
      this.funcList = resp;
    });
  }
  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  handleChange(ev) {
    this.currentSelectedUser = ev.target.value;
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
  addTarea() {
    const newTask = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      fechaCreacion: this.minDate,
      fechaInicio: this.fechaInicio,
      fechaTermino: this.fechaTermino,
      usuarioResponsable: this.currentSelectedUser.usuario_ID,
      usuarioCreador: Number(this.loggedUser),
      unidadID: Number(this.loggedUserUnit),
    };
    console.log(newTask);
    this.taskService.addTaskWithResponsible(newTask).subscribe((resp) => {
      Swal.fire({
        title: 'Tarea creada!',
        text: 'Se le envio un correo al usuario responsable!',
        icon: 'success',
        heightAuto: false,
      });
    });
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  cancel() {
    this.modal.dismiss('cancel');
  }
  confirm() {
    this.modal.dismiss('confirm');
  }
  refresh(): void {
    window.location.reload();
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.nombre = `Hello, ${ev.detail.data}!`;
    }
  }
}
