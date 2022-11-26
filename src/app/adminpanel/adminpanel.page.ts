import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { TasksService } from '../services/tasks.service';
import { UsersService } from '../services/users.service';
import { IonModal } from '@ionic/angular';
import { UnitService } from '../services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.page.html',
  styleUrls: ['./adminpanel.page.scss'],
})
export class AdminpanelPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  loggedUser: any;
  // lsUserID = localStorage.getItem('userID');
  userID = localStorage.getItem('userID');
  userUnitID = localStorage.getItem('userUnit');
  funcUserList: any;
  userList: any;
  unitList: any;
  userTasks: any;
  tasks: any;
  isModalOpen = false;
  companyID = localStorage.getItem;
  declinedTaskCount: any;
  constructor(
    private userService: UsersService,
    private taskService: TasksService,
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.userService.getUserByID(this.userID).subscribe((resp) => {
      this.loggedUser = resp;
    });
    // this.userService.getAllUsers().subscribe((resp) => {
    //   this.userList = resp;
    // });
    this.userService.getUsersByUnit(this.userID).subscribe((resp) => {
      this.userList = resp;
      console.log(resp);
    });
    this.userService.getFunc().subscribe((resp) => {
      this.funcUserList = resp;
    });
    this.taskService.getAllTasks().subscribe((resp) => {
      this.tasks = resp;
    });
    this.unitService.getUnitByCompany(this.companyID).subscribe((resp) => {
      this.unitList = resp;
    });
    this.taskService.declinedTaskCount(this.userUnitID).subscribe((resp) => {
      this.declinedTaskCount = resp;
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
        this.userService.deleteUser(id).subscribe((resp) => {
          console.log(resp);
        });
        Swal.fire({
          title: 'Eliminado!',
          text: 'Este usuario a sido eliminado.',
          icon: 'success',
          heightAuto: false,
        });
      }
    });
    Swal.fire({
      icon: 'error',
      title: 'No se ha eliminado el usuario',
      text: 'Este usuario posee tareas asignadas',
      heightAuto: false,
    });
  }
  // refresh(): void {
  //   window.location.reload();
  // }
}
