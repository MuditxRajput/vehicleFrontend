import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { PopupService } from '../services/popup.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers: [DatePipe]
})

export class AdminComponent implements OnInit {
  allVehicles: any = [];
  showStatusTable = false;

  constructor( private datePipe: DatePipe,public popupService: PopupService ,private carService:CarService) {}

  openAddCar() {
    this.popupService.show();
  }

  showStatus() {
    this.showStatusTable = true;
  }
  fetchWokerName(workerId:any)
  {
      return new Promise((resolve)=>{
            this.carService.getWokerName(workerId).subscribe(
              (res:any)=>{ 
                resolve(res.name)
              },
              ()=>{
                resolve('Unknown');
              }
            )
      },
    )
    
  }
  fetchAllVehicle()
  {
    this.carService.getAllVehicle().subscribe(
     async(res:any)=>{
      const vehicles = res.$values;
      for(let vehicle of vehicles)
      { 
        vehicle.workerId= await this.fetchWokerName(vehicle.workerId);
        vehicle.serviceStartDate = this.formatTimestamp(vehicle.serviceStartDate);
      }
      this.allVehicles = vehicles;
      console.log(this.allVehicles);
      
      
     }
    )

  }
  formatTimestamp(timestamp: string): string {
    const formattedTimestamp = this.datePipe.transform(timestamp, 'MMM d, y, h:mm:ss a');
    return formattedTimestamp ? formattedTimestamp : timestamp;
  }

  deleteVehicle(id:any)
  {
    
    this.carService.deleteVehicleById(id).subscribe(
      (res:any)=>{
        console.log(res);
        
        this.fetchAllVehicle();
      }
    )
  }
ngOnInit():void{
  this.fetchAllVehicle();
}
          
}

