import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  nombre: any = '';
  apellido: any;
  email: any;
  pass: any;
  enabled: any;
  roles: any;
  isModalOpen = false;
  constructor(private userService: UsersService,) { }

  ngOnInit() {}

  addUser() {
    // this.enabled = 1 ? this.enabled = 1 : this.enabled = 0;
    if(this.enabled){
      this.enabled = 1;
    } else {
      this.enabled = 0;
    }
    const newUser = {
      nombre: this.nombre,
      apellido: this.apellido,
      password:this.pass,
      email:this.email,
      enabled: this.enabled
    };
    console.log(newUser);
    this.userService.addUser(newUser).subscribe((resp) => {
      console.log(resp);
      Swal.fire({
        title:'Usuario creado!',
        text:'Usuario creado correctamente!',
        icon:'success',
        heightAuto: false
      });
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
}
