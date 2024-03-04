import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  public socketMessage: Subject<string> = new Subject();
  public socketStatus: Subject<boolean> = new Subject();
  private socket!: WebSocket;

  constructor() {
  }

  public connect(): void {
    const wsUrl = 'ws://localhost:3000'; // Replace with your server's URL

    this.socket = new WebSocket(wsUrl);

    this.socket.addEventListener('open', (event) => {
      this.socketStatus.next(true);
      console.log('WebSocket connection opened:', event);
    });

    this.socket.addEventListener('message', (event) => {
      console.log('Received message:', event.data);
      this.socketMessage.next(event.data);
    });

    this.socket.addEventListener('close', (event) => {
      this.socketStatus.next(false);
      console.log('WebSocket connection closed:', event);
    });
  }

  isConnected() {
    return this.socket.readyState === (WebSocket.CLOSED || WebSocket.CLOSING) ? false : true;
  }

  sendMessage(message: ClientMessage): void {
    this.socket.send(JSON.stringify(message));
  }
}