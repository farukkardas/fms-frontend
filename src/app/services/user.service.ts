import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDetail } from '../models/userDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://localhost:5000/api/users/";
  constructor(private httpClient: HttpClient,) { 
   
  }


  getUserDetail(id: string,securitykey:string): Observable<SingleResponseModel<UserDetail>> {
    let getAllPath = this.apiUrl + "getuserdetails?"
    let parameters = new HttpParams().set('id', id).set('securitykey',securitykey)

    return this.httpClient.get<SingleResponseModel<UserDetail>>(getAllPath, { params: parameters });
  }


}
