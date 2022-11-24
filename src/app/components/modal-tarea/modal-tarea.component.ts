import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import * as moment from 'moment';
import { TasksService } from 'src/app/services/tasks.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-tarea',
  templateUrl: './modal-tarea.component.html',
  styleUrls: ['./modal-tarea.component.scss'],
})
export class ModalTareaComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Output() newItemEvent = new EventEmitter();

  nombre: any;
  descripcion: any;
  fechaCreacion: any;
  fechaInicio: any;
  fechaTermino: any;
  isModalOpen = false;
  currentDate = new Date();
  formattedDate = this.currentDate.toLocaleDateString();
  minDate = moment().format();

  constructor(private taskService: TasksService) { }

  ngOnInit() {
    console.log(this.formattedDate);
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

  addTarea(){
  const newTask = {
    nombre: this.nombre,
    descripcion: this.descripcion,
    fechaCreacion:this.minDate,
    fechaInicio: this.fechaInicio,
    fechaTermino: this.fechaTermino
  };
  console.log(newTask);
    this.taskService.addTask(newTask).subscribe((resp) => {
      console.log(resp);
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
