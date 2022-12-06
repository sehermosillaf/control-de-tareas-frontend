import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email, password) {
    return this.http.post<Response>(
      'http://localhost:8080/api/usuarios/login',
      { email, password },
      { responseType: 'json' }
    );
  }
}
