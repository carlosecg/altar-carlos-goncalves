import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsComponent } from './payments.component';
import { GridService } from '../../services/grid.service';
import { PaymentsService } from '../../services/payments.service';
import { of } from 'rxjs';
import { Payment } from '../../models/payment.model';
import { LiveCodeComponent } from '../live-code/live-code.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;
  let gridServiceSpy: jasmine.SpyObj<GridService>;
  let paymentsServiceSpy: jasmine.SpyObj<PaymentsService>;

  beforeEach(() => {
    gridServiceSpy = jasmine.createSpyObj('GridService', ['generateGrid']);
    paymentsServiceSpy = jasmine.createSpyObj('PaymentsService', ['getPayments', 'addPayment']);

    TestBed.configureTestingModule({
      declarations: [PaymentsComponent, LiveCodeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: GridService, useValue: gridServiceSpy },
        { provide: PaymentsService, useValue: paymentsServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from subscriptions on component destruction', () => {
    const unsubscribeSpy = jasmine.createSpy('unsubscribe');
    component.gridDataSubscription = { unsubscribe: unsubscribeSpy } as any;
    component.liveStatusSubscription = { unsubscribe: unsubscribeSpy } as any;

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalledTimes(2);
  });
});
