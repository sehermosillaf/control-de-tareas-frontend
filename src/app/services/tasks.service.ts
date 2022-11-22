import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaI } from '../models/taks.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
   }
  getAllTasks(): Observable<TareaI>{
    return this.http.get<TareaI>('http://localhost:8080/api/tareas/');
  }
}
