import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get(this.url + `user/${id}`);
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
  expiredTaskCount(id) {
    return this.http.get(this.url + `unidad/atrasadas/${id}`);
  }
  validTaskCount(id) {
    return this.http.get(this.url + `unidad/enplazo/${id}`);
  }
  alertTaskCount(id) {
    return this.http.get(this.url + `unidad/alerta/${id}`);
  }
  updateTaskState() {
    return this.http.get(this.url + 'estado');
  }
  getTaskAutor(idTarea) {
    return this.http.get(this.url + `creador/${idTarea}`);
  }
}
