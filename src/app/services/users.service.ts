import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioI } from '../models/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:8080/api/usuarios/';
  constructor(private http: HttpClient) {}

  getUserByID(id) {
    return this.http.get(this.url + id);
  }
  getAllUsers() {
    return this.http.get(this.url);
  }
  getUsersByUnit(id) {
    return this.http.get(this.url + `unit/${id}`);
  }
  getFuncByUnit(id) {
    return this.http.get(this.url + `unit/${id}/func/`);
  }
  getEmailByUserID(id) {
    return this.http.get(this.url + `mail/${id}`);
  }
  getAdmins(): Observable<UsuarioI> {
    return this.http.get<UsuarioI>(this.url + 'admins');
  }
  getFunc(): Observable<UsuarioI> {
    return this.http.get<UsuarioI>(this.url + 'func');
  }
  addUser(newUser) {
    return this.http.post(this.url, newUser);
  }
  addUsernRol(newUser) {
    return this.http.post(this.url + 'register', newUser);
  }
  deleteUser(id) {
    return this.http.delete(this.url + id);
  }
  editUser(id, user: UsuarioI) {
    return this.http.put(this.url + id, user);
  }
}
