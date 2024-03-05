import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private httpClient: HttpClient) { }

  getPayments() {
    return this.httpClient.get<Payment[]>(`${environment.apiUrl}/payments`);
  }

  addPayment(payment: Payment) {
    return this.httpClient.post(`${environment.apiUrl}/payments`, payment);
  }
}
