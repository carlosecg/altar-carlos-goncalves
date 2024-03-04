import { Component, OnDestroy, OnInit } from '@angular/core';
import { Payment } from '../../models/payment.model';
import { GridService } from '../../services/grid.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit, OnDestroy {

  public payments: Payment[] = [];
  public grid: string[][] = [];
  public liveCode!: number | null;
  public liveStatus = false;
  gridDataSubscription: any;
  liveStatusSubscription: any;

  constructor(private gridService: GridService){}

  ngOnInit(): void {

    this.liveStatusSubscription = this.gridService.liveStatus.subscribe(status => {
      this.liveStatus = status;
    });

    this.gridDataSubscription = this.gridService.gridDataSubject.subscribe(gridData => {
      this.grid = gridData.grid;
      this.liveCode = gridData.code;
    })

    this.payments.push({
      id: '',
      amount: 32,
      name: 'Payment 1',
      code: 32,
    });
    this.payments.push({
      id: '',
      amount: 32,
      name: 'Payment 1',
      code: 32,
    });
    this.payments.push({
      id: '',
      amount: 32,
      name: 'Payment 1',
      code: 32,
    });
  }

  ngOnDestroy() {
    this.gridDataSubscription.unsubscribe();
    this.liveStatusSubscription.unsubscribe();
  }
}

