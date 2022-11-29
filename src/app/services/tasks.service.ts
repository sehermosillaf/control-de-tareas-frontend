import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaI } from '../models/tasks.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private url = 'http://localhost:8080/api/tareas/';
  constructor(private http: HttpClient) {}
  getAllTasks() {
    return this.http.get(this.url);
  }
  getTasksByUser(id) {
    return this.http.get<Response>(this.url + `user/${id}`, {
      responseType: 'json',
    });
  }

  addTask(newTask) {
    return this.http.post(this.url, newTask);
  }
  addTaskWithResponsible(newTask) {
    return this.http.post(this.url + 'add', newTask);
  }
  declineTask(task) {
    return this.http.post(this.url + 'rechazar', task);
  }

  declinedTaskCount(id) {
    return this.http.get(this.url + `unidad/rechazadas/${id}`);
  }
  updateTaskState() {
    return this.http.get(this.url + 'estado');
  }
  getTaskAutor(idTarea) {
    return this.http.get(this.url + `creador/${idTarea}`);
  }
}
