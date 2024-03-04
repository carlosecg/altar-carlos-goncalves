import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GridData } from '../models/grid.model';

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
    this.liveStatus.next(true);
    if(this.eventSource) {
      this.eventSource.close();
    }
    this.eventSource = new EventSource(`http://localhost:3000/grid/${this.biasCharacterSubject.getValue()}`);
    this.eventSource.onmessage = (event) => {
      const gridData: GridData = JSON.parse(event.data);
      this.ngZone.run(() => {
        this.gridDataSubject.next(gridData);
      })
    };
  }

  stopUpdate() {
    this.eventSource.close();
    this.liveStatus.next(false);
  }
}
