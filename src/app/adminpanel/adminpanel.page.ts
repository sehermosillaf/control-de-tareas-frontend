import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { TasksService } from '../services/tasks.service';
import { UsersService } from '../services/users.service';
import { IonModal } from '@ionic/angular';
import { UnitService } from '../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfService } from '../services/pdf.service';
import { TaskFlowService } from '../services/task-flow.service';
@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.page.html',
  styleUrls: ['./adminpanel.page.scss'],
})
export class AdminpanelPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  loggedUser: any;
  lsUserID = localStorage.getItem('userID');
  userID = localStorage.getItem('userID');
  userUnitID = localStorage.getItem('userUnit');
  companyID = localStorage.getItem('companyID');
  funcUserList: any;
  userList: any;
  unitList: any;
  userTasks: any;
  tasks: any;
  isModalOpen = false;
  flujos: any;
  declinedTaskCount: any;
  expiredTaskCount: any;
  alertTaskCount: any;
  validTaskCount: any;
  completedTaskCOunt: any;
  constructor(
    private userService: UsersService,
    private taskService: TasksService,
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router,
    private pdfService: PdfService,
    private flujoService: TaskFlowService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.taskService.updateTaskState().subscribe((resp) => {
      console.log(resp);
    });
  }

  ngOnInit() {
    this.taskService.declinedTaskCount(this.userUnitID).subscribe((resp) => {
      this.declinedTaskCount = resp;
    });
    this.taskService.expiredTaskCount(this.userUnitID).subscribe((resp) => {
      this.expiredTaskCount = resp;
    });
    this.taskService.validTaskCount(this.userUnitID).subscribe((resp) => {
      this.validTaskCount = resp;
    });
    this.taskService.alertTaskCount(this.userUnitID).subscribe((resp) => {
      this.alertTaskCount = resp;
    });
    this.taskService.completedTaskCount(this.userUnitID).subscribe((resp) => {
      this.completedTaskCOunt = resp;
    });
    this.userService.getUserByID(this.userID).subscribe((resp) => {
      this.loggedUser = resp;
      console.log(resp);
    });
    this.userService.getFuncByCompany(this.companyID).subscribe((resp) => {
      this.userList = resp;
      console.log(resp);
    });
    this.unitService.getUnitByCompany(this.companyID).subscribe((resp) => {
      this.unitList = resp;
    });
    this.flujoService.getFlows().subscribe((resp) => {
      console.log(resp);
      this.flujos = resp;
    });
  }
  tasksByUser(id) {
    this.taskService.getTasksByUser(id).subscribe((resp) => {
      this.userTasks = resp;
      console.log(this.userTasks);
    });
    console.log(id);
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  deleteUser(id) {
    console.log(id);
    Swal.fire({
      title: 'Estas seguro de eliminar este usuario?',
      text: 'No podras de revertir este cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar usuario!',
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // this.userService.deleteUser(id).subscribe((resp) => {
        //   console.log(resp);
        // });
        Swal.fire({
          title: 'Eliminado!',
          text: 'Este usuario a sido eliminado.',
          icon: 'success',
          heightAuto: false,
        });
      }
    });
  }
  logout() {
    localStorage.removeItem('userID');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  execFlow() {
    Swal.fire({
      title: 'Ejecutando...',
      icon: 'success',
      heightAuto: false,
    });
  }

  deleteFlow() {
    Swal.fire({
      title: 'Eliminando...',
      icon: 'success',
      heightAuto: false,
    });
  }

  generatePDF() {
    this.pdfService.generatePDF().subscribe(
      (data: Blob) => {
        const file = new Blob([data], { type: 'aplication/pdf' });
        const fileUrl = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = fileUrl;
        a.target = '_blank';
        a.download = 'tareas.pdf';
        document.body.appendChild(a);
        a.click();
      },
      (error) => {
        console.log('error', error);
      }
    );
    console.log('pdf');
  }
  // refresh(): void {
  //   window.location.reload();
  // }
}
