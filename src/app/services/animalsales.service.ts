import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AnimalSales } from '../models/animalSales';
import { AnimalSalesDto } from '../models/animalSalesDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AnimalsalesService {
  
  apiUrl = "http://localhost:5000/api/animalsales/";
  constructor(private httpClient: HttpClient) { }

  add(animalModel: AnimalSales): Observable<ResponseModel> {
    let allPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(allPath, animalModel)
  }

  update(animalSales: AnimalSales): Observable<ResponseModel> {
    let allPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(allPath, animalSales)
  }

  delete(animalModel: AnimalSales) : Observable<ResponseModel> {
    let allPath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(allPath, animalModel)
  }

  getUserAnimalSales(): Observable<ListResponseModel<AnimalSalesDto>> {
    let allPath = this.apiUrl + "getuseranimalsales";
    return this.httpClient.get<ListResponseModel<AnimalSalesDto>>(allPath)
  }
}
