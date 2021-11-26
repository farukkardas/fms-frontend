import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { UserImage } from '../models/userImage';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {
  apiUrl = "http://localhost:5000/api/";

  constructor(private httpClient: HttpClient) { }


  addUserImage(file: File, userId: string): Observable<ResponseModel> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', null);
    headers.append('Accept', 'application/json');

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('userId', userId);

    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "userimage/add", formData, { headers: headers });
  }

  updateUserImage(file: File, userId: string): Observable<ResponseModel> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', null);
    headers.append('Accept', 'application/json');

    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('userId', userId);
    
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "userimage/update", formData, { headers: headers,reportProgress:true });
  }
}
