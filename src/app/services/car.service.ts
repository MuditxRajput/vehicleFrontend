import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  private getAdvisorById = 'https://localhost:7053/api/advisor/getAdvisorById'
  constructor(private http: HttpClient) {}
  getCars() {
    return this.http.get<Car[]>(this.apiUrl);
  }

  addCar(car: Car) {
   // we need to hit the add vehicle api 
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, car, { headers });
  }
  getAdvisors() {
    return this.http.get<AdvisorsResponse>(this.advisorApiUrl);
  }
  getAllVehicle()
  {
    return this.http.get<any>(this.getAllCar);
  }
  getWokerName(id:any){
    return this.http.get<any>( `${this.getAdvisorById}?id=${id}`)
  }
  deleteVehicleById(id:any)
  {
    return this.http.delete<any>(`${this.deleteVehicle}?id=${id}`)
  }
 
}


