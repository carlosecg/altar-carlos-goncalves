import { Component, OnDestroy, OnInit } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { GridService } from '../../services/grid.service';
import { PaymentsService } from '../../services/payments.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent implements OnInit, OnDestroy {
  public payments: Payment[] = [];
  public grid: string[][] = [];
  public liveCode!: number | null;
  public liveStatus = false;
  public paymentName!: string;
  public paymentAmount!: number;
  /* Subscriptions */
  gridDataSubscription: any;
  liveStatusSubscription: any;

  constructor(
    private gridService: GridService,
    private paymentsService: PaymentsService
  ) {}

  ngOnInit(): void {
    this.liveStatusSubscription = this.gridService.liveStatus.subscribe(
      (status) => {
        this.liveStatus = status;
      }
    );

    this.gridDataSubscription = this.gridService.gridDataSubject.subscribe(
      (gridData) => {
        this.grid = gridData.grid;
        this.liveCode = gridData.code;
      }
    );

    this.getPayments();
  }

  async getPayments() {
    try {
      const $payments = this.paymentsService.getPayments();
      const paymentList = await lastValueFrom($payments);
      this.payments = paymentList;
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  }

  async addPayment() {
    try {
      if (this.liveCode && this.paymentAmount && this.paymentName) {
        const newPayment = new Payment();
        newPayment.name = this.paymentName;
        newPayment.amount = this.paymentAmount;
        newPayment.code = this.liveCode || 10;
        newPayment.grid = this.grid;

        const $addPayment = this.paymentsService.addPayment(newPayment);
        await lastValueFrom($addPayment);

        this.paymentAmount = 0;
        this.paymentName = '';
        /* Since there is no database connection, this simulates getting the information after async/promise function */
        setTimeout(() => {
          this.getPayments();
        }, 500);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  }

  startGrid() {
    this.gridService.generateGrid();
  }

  ngOnDestroy() {
    if (this.gridDataSubscription) {
      this.gridDataSubscription.unsubscribe();
    }
    if (this.liveStatusSubscription) {
      this.liveStatusSubscription.unsubscribe();
    }
  }
}
