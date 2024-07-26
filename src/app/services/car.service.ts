import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { AdvisorsResponse } from '../interfaces/AdvisorsResponse';
import { AdvisorsResponse } from '../interfaces/AdvisorsResponse ';
import { Car } from '../interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'https://localhost:7053/api/Vehicle/addVehicle';
  private deleteVehicle = 'https://localhost:7053/api/Vehicle/deleteVehicle';
  private advisorApiUrl = 'https://localhost:7053/api/advisor/getAdvisor';
  private getAllCar = 'https://localhost:7053/api/Vehicle/allVehicle';
  private getAdvisorById = 'https://localhost:7053/api/advisor/getAdvisorById';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('JwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  addCar(car: Car): Observable<any> {
    return this.http.post<any>(this.apiUrl, car, { headers: this.getHeaders() });
  }

  getAdvisors(): Observable<AdvisorsResponse> {
    return this.http.get<AdvisorsResponse>(this.advisorApiUrl, { headers: this.getHeaders() });
  }

  getAllVehicle(): Observable<any> {
    return this.http.get<any>(this.getAllCar, { headers: this.getHeaders() });
  }

  getWokerName(id: any): Observable<any> {
    return this.http.get<any>(`${this.getAdvisorById}?id=${id}`, { headers: this.getHeaders() });
  }

  deleteVehicleById(id: any): Observable<any> {
    return this.http.delete<any>(`${this.deleteVehicle}?id=${id}`, { headers: this.getHeaders() });
  }
}
