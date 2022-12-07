import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { OverlayEventDetail } from '@ionic/core/components';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  companyID = localStorage.getItem('companyID');
  nombre: any;
  apellido: any;
  email: any;
  pass: any;
  enabled: number;
  unidad: number;
  rol: number;
  isModalOpen = false;
  unitList: any;
  logs: number[] = [];
  constructor(
    private userService: UsersService,
    private unitService: UnitService
  ) {}

  ngOnInit() {
    this.unitService.getUnitByCompany(this.companyID).subscribe((resp) => {
      console.log(resp);
      this.unitList = resp;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.nombre = `Hello, ${ev.detail.data}!`;
    }
  }
  pushLog(msg) {
    this.logs.unshift(msg);
  }

  checkUnitValue(e) {
    this.unidad = Number(e.detail.value);
  }
  checkRolValue(e) {
    this.pushLog(e.detail.value);
    console.log(e.detail.value);
    this.rol = Number(e.detail.value);
  }
  addUser() {
    // this.enabled = 1 ? this.enabled = 1 : this.enabled = 0;
    if (this.enabled) {
      this.enabled = 1;
    } else {
      this.enabled = 0;
    }
    const newUser = {
      nombre: this.nombre,
      apellido: this.apellido,
      pass: this.pass,
      email: this.email,
      enabled: this.enabled,
      idunidad: this.unidad,
      rolid: this.rol,
    };
    console.log(newUser);
    this.userService.addUsernRol(newUser).subscribe((resp) => {
      console.log(resp);
      Swal.fire({
        title: 'Usuario creado!',
        text: 'Usuario creado correctamente!',
        icon: 'success',
        heightAuto: false,
      });
    });
  }
}
