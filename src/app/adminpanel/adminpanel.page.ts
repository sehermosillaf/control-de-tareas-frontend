import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.page.html',
  styleUrls: ['./adminpanel.page.scss'],
})
export class AdminpanelPage implements OnInit {
  user: any;
  tasks: any;
  lsUserID = localStorage.getItem('userID');
  userList: any;
  constructor(private userService: UsersService, private taskService: TasksService) { }

  ngOnInit() {
    this.userService.getUserByID(this.lsUserID).subscribe((resp) => {
      this.user = resp;
    });
   this.userService.getAllUsers().subscribe((resp) => {
    console.log(resp);
    this.userList = resp;
   });
   this.taskService.getAllTasks().subscribe((resp) => {
      this.tasks = resp;
   });
  }



}
