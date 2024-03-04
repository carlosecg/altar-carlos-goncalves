import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { MessageType, SocketMessage } from '../models/message.model';
import { BehaviorSubject } from 'rxjs';
import { GridData } from '../models/grid.model';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  public biasCharacterSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public gridDataSubject: BehaviorSubject<GridData> = new BehaviorSubject<GridData>(new GridData());
  public generatingStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public gridRefreshInterval!: any;

  constructor(private socketService: WebsocketService) {
    this.socketService.connect();
    this.socketService.socketMessage.subscribe((message) => {
      this.parseSocketMessage(message);
    });

    this.socketService.socketStatus.subscribe((status) => {
      if (!status) {
        this.stopAutoUpdate();
      }
    });
  }

  attemptGridGeneration() {
    if (!this.socketService.isConnected()) {
      this.socketService.connect();
      this.socketService.socketStatus.subscribe((value) => {
        if (value) {
          this.generateGrid();
        }
      });
    } else {
      this.generateGrid();
    }
  }

  changeBiasInput(newBiasChar: string) {
    /* Force the BIAS character to be in the A-z format or empty */
    if (new RegExp(/^([A-Za-z]|)$/).test(newBiasChar)) {
      this.biasCharacterSubject.next(newBiasChar);
    }
  }

  generateGrid() {
    this.stopAutoUpdate();
    try {
      this.gridRefreshInterval = setInterval(() => {
        this.generatingStatus.next(true);
        this.socketService.sendMessage({
          type: MessageType.GridUpdate,
          data: { character: this.biasCharacterSubject.getValue() },
        });
      }, 1000);
    } catch (error) {
      alert('An unexpected error occurred');
      this.stopAutoUpdate();
    }
  }

  parseSocketMessage(message: string) {
    try {
      const socketData: SocketMessage = JSON.parse(message);

      switch (socketData.status) {
        case 200:
          if (socketData.data.grid && socketData.data.code) {
            this.gridDataSubject.next(socketData.data);
          }

          break;
        case 400:
          this.stopAutoUpdate();
          console.log('Bad socket request');
          break;
        case 500:
          this.stopAutoUpdate();
          break;
        default:
          break;
      }
    } catch (error) {
      alert('An unexpected error occurred');
      this.stopAutoUpdate();
    }
  }

  stopAutoUpdate() {
    clearInterval(this.gridRefreshInterval);
    this.generatingStatus.next(false);
  }
}
