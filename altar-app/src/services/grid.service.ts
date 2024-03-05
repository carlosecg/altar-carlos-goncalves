import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GridData } from '../models/grid.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  public biasCharacterSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public gridDataSubject: BehaviorSubject<GridData> = new BehaviorSubject<GridData>(new GridData());
  public liveStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public gridRefreshInterval!: any;
  public eventSource!: EventSource;

  constructor(private ngZone: NgZone) {}

  changeBiasInput(newBiasChar: string) {
    /* Force the BIAS character to be in the A-z format or empty */
    if (new RegExp(/^([A-Za-z]|)$/).test(newBiasChar)) {
      this.biasCharacterSubject.next(newBiasChar);
    }
  }

  generateGrid() {
    if(this.eventSource) {
      this.eventSource.close();
    }
    this.eventSource = new EventSource(`${environment.apiUrl}/grid/${this.biasCharacterSubject.getValue()}`);
    this.liveStatus.next(true);
    this.eventSource.onopen = () => {
      this.ngZone.run(() => {
        this.liveStatus.next(true);
      });
    }

    this.eventSource.onmessage = (event) => {
      const gridData: GridData = JSON.parse(event.data);
      this.ngZone.run(() => {
        this.gridDataSubject.next(gridData);
      });
    };

    this.eventSource.onerror = (event) => {
      this.eventSource.close();
      this.ngZone.run(() => {
        this.liveStatus.next(false);
      });
    }
  }

  stopUpdate() {
    this.eventSource.close();
    this.liveStatus.next(false);
  }
}
