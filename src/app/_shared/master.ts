import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerModel } from '../model/CustomerModel';
@Injectable({
  providedIn: 'root',
})
export class Master {

  baseUrl = 'http://localhost:3000/customers'

  constructor(private http: HttpClient) {

  }

  SaveCustomer(data: CustomerModel) {
    return this.http.post(this.baseUrl, data);
  }

  UpdateCustomer(data: CustomerModel, id: string) {
    return this.http.put(this.baseUrl + '/' + id, data);
  }

  DeleteCustomer(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  GetAllCustomers(){
    return this.http.get<CustomerModel[]>(this.baseUrl);
  }

  Getcustomer(id:string){
     return this.http.get<CustomerModel>(this.baseUrl + '/' + id);
  }

}
