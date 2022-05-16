import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User = new User();
  readonly _baseUrlUser = "http://localhost:38201/api/v1.0/user"; 
  list: User[] = [];  

    constructor(private http: HttpClient) {}  
    httpOptions = {  
      headers: new HttpHeaders({  
        'Content-Type': 'application/json'
      })  
    }    
    registerUser() {
      return this.http.post(this._baseUrlUser + '/register', this.formData);
    }

    userLogin() {
      return this.http.post(this._baseUrlUser + '/login', this.formData);
    }

    resetPassword() {
      return this.http.put(this._baseUrlUser + '/' + this.formData.Login_Id + '/forgot', this.formData, {observe: 'response'});
    }

    userLogout() {
      return this.http.post(this._baseUrlUser + '/logout', this.formData);
    }

    getCurrentUser(loginId: string) {
      return this.http.get(this._baseUrlUser + '/search' + '/' + loginId, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }

    getAllUsers() {
      return this.http.get(this._baseUrlUser + '/all', {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
  }  
