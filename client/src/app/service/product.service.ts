import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()

export class ProductService {

  constructor(private http: HttpClient) {}

  addProduct(newProductData) {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };
    return this.http.post(`${environment.apiserver}/products`, JSON.stringify(newProductData), options)
      .map((res) => res)
      .catch(this.handleObservableError);
  }

  getProducts() {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'GET' };
    return this.http.get(`${environment.apiserver}/products`, options)
      .map((res) => res)
      .catch(this.handleObservableError);
  }
 
  getProduct(productId) {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'GET' };
    return this.http.get(`${environment.apiserver}/products/${productId}`, options)
      .map((res) => res)
      .catch(this.handleObservableError);
  }

  updateProduct(productId, newProductData) {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'PUT' };
    return this.http.put(`${environment.apiserver}/products/${productId}`, JSON.stringify(newProductData), options)
      .map((res) => res)
      .catch(this.handleObservableError);
  }

  removeProduct(productId) {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'DELETE' };
    return this.http.delete(`${environment.apiserver}/products/${productId}`, options)
      .map((res) => res)
      .catch(this.handleObservableError);
  }
  

  handleObservableError(error: any) {
    return Observable.throw(error.json().error || error.json());
  }
}