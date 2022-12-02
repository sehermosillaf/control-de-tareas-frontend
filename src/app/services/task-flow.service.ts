import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskFlowService {
  url = 'http://localhost:8080/api/flujos';
  constructor(private http: HttpClient) {}

  getFlows() {
    return this.http.get(this.url);
  }
}
