import { Component, OnInit } from '@angular/core';
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

  constructor(private gridService: GridService) {}

  ngOnInit(): void {
    this.generateDefaultTable();
    this.gridService.gridDataSubject.subscribe((gridDataUpdate) => {
      this.grid = gridDataUpdate.grid;
      this.liveCode = gridDataUpdate.code;
    });

    this.gridService.liveStatus.subscribe((generating) => {
      this.liveStatus = generating;
    });
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
    this.generatingGrid = false;
    this.gridService.stopUpdate();
  }

  generateGrid() {
    this.generatingGrid = true;
    if (this.gridService.biasCharacterSubject.getValue() !== this.biasChar) {
      this.gridService.changeBiasInput(this.biasChar);
      this.allowBiasChange = false;
      this.biasTimeout = setTimeout(() => {
        this.allowBiasChange = true;
      }, 4000);
    }
    this.gridService.generateGrid();
  }

  validateBias(newBiasChar: string) {
    this.validBiasCharacter = new RegExp(/^([A-Za-z]|)$/).test(newBiasChar);
  }
}
