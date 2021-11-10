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
  apiUrl: string = "http://localhost:5000/api/"
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<FuelConsumption>> {
    let allPath = this.apiUrl + "fuelconsumption/getall";
    return this.httpClient.get<ListResponseModel<FuelConsumption>>(allPath);
  }

  addFuel(fuelConsumption: FuelConsumption): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "fuelconsumption/add", fuelConsumption);
  }

  updateFuel(fuelConsumption:FuelConsumption) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "fuelconsumption/update",fuelConsumption);
  }

  deleteFuel(fuelConsumption:FuelConsumption) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "fuelconsumption/delete",fuelConsumption);
  }

  getUserFuelConsumptions(id:number,securityKey:string) : Observable<ListResponseModel<FuelConsumption>>{
let allPath = this.apiUrl + "fuelconsumption/getuserfuelconsumption";

let parameters = new HttpParams().set('id', id).set('securitykey', securityKey)

return this.httpClient.get<ListResponseModel<FuelConsumption>>(allPath, {params:parameters});


  }
}
