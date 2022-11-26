import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubtasksService {
  url = 'http://localhost:8080/api/subtareas/';

  constructor(private http: HttpClient) {}

  getSubtaskByTaskID(id) {
    this.http.get(this.url + `tarea/${id}`);
  }
}
