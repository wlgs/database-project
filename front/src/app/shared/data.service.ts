import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';


const url = 'http://localhost:4269';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get(`${url}/clients?skip=0&limit=1000`);
  }

  getReviews() {
    return this.http.get(`${url}/reviews?skip=0&limit=100`);
  }

  postReview(id: string, stars: number, description: string) {
    return this.http.post(`${url}/reviews`,{client_id: id, stars: stars, body: description});
  }

  getClientReservations(mail: string) {
    return this.http.get(`${url}/reservations/client/${mail}`);
  }

  cancelReservation(id:string) {
    return this.http.patch(`${url}/reservations/${id}`,{status: 'canceled'});
  }

  //TEST
  updateReservation(id:string, start_date: string, end_date: string, status: string, room_id: string) {
    return this.http.patch(`${url}/reviews/${id}`,{start_date: start_date, end_date: end_date, status: status, room_number: room_id});
  }

  //TEST
  makeReservation(start_date: string, end_date: string, room_type:string, email:string) {
    return this.http.post(`${url}/reservations`,{start_date: start_date, end_date: end_date, room_type: room_type, email: email});
  }

  //TEST
  getEmployees() {
    return this.http.get(`${url}/employees?skip=0&limit=1000`);
  }
}
