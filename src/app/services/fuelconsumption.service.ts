import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuelConsumption } from '../models/fuelConsumption';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FuelConsumptionService {
  apiUrl: string = "http://localhost:5000/api/fuelconsumption/"
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<FuelConsumption>> {
    let allPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<FuelConsumption>>(allPath);
  }

  addFuel(fuelConsumption: FuelConsumption): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(getAllPath, fuelConsumption);
  }

  updateFuel(fuelConsumption: FuelConsumption): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(getAllPath, fuelConsumption);
  }

  deleteFuel(fuelConsumption: FuelConsumption): Observable<ResponseModel> {
    let getAllPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(getAllPath, fuelConsumption);
  }

  getUserFuelConsumptions(): Observable<ListResponseModel<FuelConsumption>> {
    let getAllPath = this.apiUrl + "getuserfuelconsumption";
    return this.httpClient.get<ListResponseModel<FuelConsumption>>(getAllPath);


  }
}
