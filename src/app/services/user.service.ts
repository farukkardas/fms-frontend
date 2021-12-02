import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDetail } from '../models/userDetail';
import { UserEdit } from '../models/userEdit';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://localhost:5000/api/users/";
  constructor(private httpClient: HttpClient,) { 
   
  }


  getUserDetail(): Observable<SingleResponseModel<UserDetail>> {
    let getAllPath = this.apiUrl + "getuserdetails"

    return this.httpClient.get<SingleResponseModel<UserDetail>>(getAllPath);
  }

  updateUser(userModel:UserEdit) : Observable<ResponseModel>{
    let getAllPath = this.apiUrl + "updateuser"
    return this.httpClient.put<ResponseModel>(getAllPath,userModel)
  }

 
}
