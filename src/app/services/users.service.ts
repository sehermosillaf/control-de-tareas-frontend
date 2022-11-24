import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioI } from '../models/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:8080/api/users/';
  constructor(private http: HttpClient) {}

  getUserByID(id): Observable<UsuarioI[]> {
    return this.http.get<UsuarioI[]>(this.url + id);
  }
  getAllUsers(): Observable<UsuarioI>{
    return this.http.get<UsuarioI>(this.url);
  }
  getAdmins(): Observable<UsuarioI> {
    return this.http.get<UsuarioI>(this.url + '/admins');
  }
  getFunc(): Observable<UsuarioI> {
    return this.http.get<UsuarioI>(this.url + '/func');
  }
  addUser(newUser){
    return this.http.post(this.url, newUser);
  }
  deleteUser(id) {
    return this.http.delete(this.url + id);
  }
  editUser(id,user: UsuarioI){
    return this.http.put(this.url + id,user);
  }
}
