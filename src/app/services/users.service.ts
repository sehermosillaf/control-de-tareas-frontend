import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioI } from '../models/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public http: HttpClient) {}


  getUserByID(id): Observable<UsuarioI[]> {
    return this.http.get<UsuarioI[]>(`http://localhost:8080/api/users/${id}`);
  }
}
