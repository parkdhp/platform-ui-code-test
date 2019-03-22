import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public selectedProviders = [];
  public unselectedProviders = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];

  // saves selected and unselected providers to local storage
  saveToLocalStorage(): void {
    localStorage.setItem('selectedProviders', JSON.stringify(this.selectedProviders));
    localStorage.setItem('unselectedProviders', JSON.stringify(this.unselectedProviders));
  }

  // gets selected and unselected providers from local storage
  getLocalStorage(): void {
    this.selectedProviders = JSON.parse(localStorage.getItem('selectedProviders'));
    this.unselectedProviders = JSON.parse(localStorage.getItem('unselectedProviders'));
  }

  // swaps provider from one array to another by id and saves to local storage
  swapProvider(id, arr1, arr2): void {
    for(let i = 0 ; i < arr1.length; i++) {
      if(id === arr1[i].id) {
        arr2.push(arr1[i])
        arr1.splice(i,1);
        this.saveToLocalStorage();
        // prevent iteration since target provider reached
        return;
      }
    }
  }

  // saves unselectedProvider to selectedProviders array 
  saveProvider(e): void {
    this.getLocalStorage();
    this.swapProvider(e.target.id, this.unselectedProviders, this.selectedProviders);
  }

  // removes selected provider to unselectedProviders array
  removeProvider(e): void {
    this.getLocalStorage();
    this.swapProvider(e.target.id, this.selectedProviders, this.unselectedProviders);
  }

  constructor() {}

  ngOnInit() {
    // checks if providers have been saved to local storage
    const initialized = JSON.parse(localStorage.getItem('initialized')) || false;

    if(!initialized) {
      // if not in local storage, save to local storage
      localStorage.setItem('initialized', JSON.stringify(true));
      this.saveToLocalStorage();
    } else {
      // get providers from local storage
      this.getLocalStorage();
    }
  }

}
