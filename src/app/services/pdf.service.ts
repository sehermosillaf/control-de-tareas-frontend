import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  url = 'http://localhost:8080/api/pdf/tareas';

  constructor(private http: HttpClient) {}

  generatePDF() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.url, { headers, responseType: 'blob' });
  }
}
