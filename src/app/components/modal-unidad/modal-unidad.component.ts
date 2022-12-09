import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { UnitService } from 'src/app/services/unit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-unidad',
  templateUrl: './modal-unidad.component.html',
  styleUrls: ['./modal-unidad.component.scss'],
})
export class ModalUnidadComponent implements OnChanges {
  @ViewChild(IonModal) modal: IonModal;
  nombre: any;
  descripcion: any;
  funcion: any;
  isModalOpen = false;
  idEmpresa = localStorage.getItem('companyID');
  constructor(private unitService: UnitService) {}

  ngOnChanges() {
    // create header using child_id
    console.log();
  }

  addUnit() {
    const newUnit = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      funcion: this.funcion,
      idEmpresa: Number(this.idEmpresa),
    };
    console.log(newUnit);
    this.unitService.insertUnit(newUnit).subscribe((resp) => {
      Swal.fire({
        title: 'Unidad creado!',
        text: 'Unidad creado correctamente!',
        icon: 'success',
        heightAuto: false,
      });

      console.log(resp);
    });
  }
  cancel() {
    this.modal.dismiss('cancel');
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
