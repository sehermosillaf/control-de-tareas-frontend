import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminpanelPageRoutingModule } from './adminpanel-routing.module';

import { AdminpanelPage } from './adminpanel.page';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalUnidadComponent } from '../components/modal-unidad/modal-unidad.component';
import { FlujosComponent } from '../components/flujos/flujos.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminpanelPageRoutingModule,
  ],
  declarations: [
    AdminpanelPage,
    ModalComponent,
    ModalUnidadComponent,
    FlujosComponent,
  ],
})
export class AdminpanelPageModule {}
