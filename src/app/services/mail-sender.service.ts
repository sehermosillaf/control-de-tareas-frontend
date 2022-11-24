import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MailSenderService {
  private url = 'http://localhost:8080/api/mail/';
  constructor(private http: HttpClient) { }

  sendMailAssignedTask(correo: string) {
    return this.http.post(this.url,correo);
  }
}
