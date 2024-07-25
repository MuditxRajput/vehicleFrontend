import { Component } from '@angular/core';

@Component({
  selector: 'app-advisor-dashbord',
  templateUrl: './advisor-dashbord.component.html',
  styleUrl: './advisor-dashbord.component.css'
})
export class AdvisorDashbordComponent {


  services: Service[] = [
    { name: 'Engine Oil', checked: false },
    { name: 'Fuel Filter', checked: false },
    { name: 'Clutch Plate', checked: false },
    { name: 'Brake Wire', checked: false },
    { name: 'Tyre', checked: false },
    { name: 'Puncture', checked: false },
    { name: 'Wheel Alignment', checked: false }
  ];

  doneBtnClick(){

    const popupDiv = document.getElementById('popup');
    if(popupDiv != null)
    {
      popupDiv.style.display = 'flex';
    }
  }

  submitBtnClick(){
    const selectedServices = this.services
      .filter(service => service.checked)
      .map(service => service.name);
    
    console.log('Selected services:', selectedServices);
    this.closePopup();
  }

  closePopup(){
    const popupDiv = document.getElementById('popup');
    if(popupDiv != null)
    {
      popupDiv.style.display = 'none';
    }
  }

}


interface Service {
  name: string;
  checked: boolean;
}