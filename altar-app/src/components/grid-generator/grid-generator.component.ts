import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { MessageType } from '../../models/message.model';
import { GridService } from '../../services/grid.service';
@Component({
  selector: 'app-grid-generator',
  templateUrl: './grid-generator.component.html',
  styleUrl: './grid-generator.component.scss',
})
export class GridGeneratorComponent implements OnInit {
  public biasChar: string = '';
  public grid: string[][] = [];
  /* Used for placeholder only */
  public defaultGridLayout: string[][] = [];
  public liveCode!: number | null;
  public liveStatus = false;
  public validBiasCharacter = true;
  public allowBiasChange = true;
  public generatingGrid!: boolean;
  public biasTimeout: any;

  constructor(private gridService: GridService, private websocket: WebsocketService) {}

  ngOnInit(): void {
    this.generateDefaultTable();
    this.gridService.gridDataSubject.subscribe((gridDataUpdate) => {
      this.grid = gridDataUpdate.grid;
      this.liveCode = gridDataUpdate.code;
    });

    this.gridService.generatingStatus.subscribe((generating) => {
      this.generatingGrid = generating;
    });

    this.websocket.socketStatus.subscribe(status => {
      this.liveStatus = status;
    })
  }

  generateDefaultTable() {
    this.defaultGridLayout = [];
    for (let index = 0; index < 10; index++) {
      const rowOfAlpha = [];
      for (let index = 0; index < 10; index++) {
        rowOfAlpha.push('');
      }
      this.defaultGridLayout.push(rowOfAlpha);
    }
  }

  changeCharacter(character: string) {
    this.gridService.changeBiasInput(character);
  }

  stopGenerating() {
    this.gridService.stopAutoUpdate();
  }

  generateGrid() {
    if (this.allowBiasChange) {
      if (this.gridService.biasCharacterSubject.getValue() !== this.biasChar) {
        this.gridService.changeBiasInput(this.biasChar);
        this.allowBiasChange = false;
        this.biasTimeout = setTimeout(() => {
          this.allowBiasChange = true;
        }, 4000);
      }

      this.gridService.attemptGridGeneration();
    }
  }

  validateBias(newBiasChar: string) {
    this.validBiasCharacter = new RegExp(/^([A-Za-z]|)$/).test(newBiasChar);
  }
}
