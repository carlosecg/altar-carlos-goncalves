import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
@Component({
  selector: 'app-grid-generator',
  templateUrl: './grid-generator.component.html',
  styleUrl: './grid-generator.component.scss',
})
export class GridGeneratorComponent implements OnInit {
  public biasChar!: string;
  public grid: string[][] = [];
  public liveCode!: string;
  public serverMessages: string[] = [];
  public gridRefreshInterval!: any;

  constructor(private socketService: WebsocketService) {}

  ngOnInit(): void {
    this.generateDefaultTable();
    this.socketService.connect();
    this.socketService.socketMessage.subscribe((message) => {
      try {
        const grid = JSON.parse(message);
        this.grid = grid.grid;
        this.liveCode = grid.code;
      } catch (error) {
        console.log(error);
        clearInterval(this.gridRefreshInterval);
      }
    });
  }

  generateDefaultTable() {
    this.grid = [];
    for (let index = 0; index < 10; index++) {
      const rowOfAlpha = [];
      for (let index = 0; index < 10; index++) {
       
        rowOfAlpha.push('');
      }
      this.grid.push(rowOfAlpha);
    }
  }

  checkConnection() {
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

  generateGrid() {
    clearInterval(this.gridRefreshInterval);
    try {
      this.gridRefreshInterval = setInterval(() => {
        this.socketService.sendMessage('');
      }, 1000);
    } catch (error) {
      clearInterval(this.gridRefreshInterval);
    }
  }

  stopGenerating() {
    clearInterval(this.gridRefreshInterval);
  }
}
