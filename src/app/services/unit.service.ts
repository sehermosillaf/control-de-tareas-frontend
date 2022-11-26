import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitI } from '../models/unit.interface';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  url = 'http://localhost:8080/api/unidades/';
  constructor(private http: HttpClient) {}

  getAllUnits(): Observable<UnitI> {
    return this.http.get<UnitI>(this.url);
  }

  getUnitByCompany(id) {
    return this.http.get(this.url + `empresa/${id}`);
  }

  addUnit(newUnit: any) {
    return this.http.post(this.url, newUnit);
  }
}
