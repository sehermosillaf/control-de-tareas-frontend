import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaI } from '../models/taks.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private url = 'http://localhost:8080/api/tareas/';
  constructor(private http: HttpClient) {
   }
  getAllTasks(): Observable<TareaI>{
    return this.http.get<TareaI>(this.url);
  }
  getTasksByUser(id): Observable<TareaI>{
    return this.http.get<TareaI>(this.url + `user/${id}`);
  }

  addTask(newTask){
    return this.http.post(this.url,newTask);
  }
}
