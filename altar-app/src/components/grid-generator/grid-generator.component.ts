import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-grid-generator',
  templateUrl: './grid-generator.component.html',
  styleUrl: './grid-generator.component.scss'
})
export class GridGeneratorComponent implements OnInit {
  
  public grid: string[][] = [];
  public randomCharsGenerated: Record<string, number> = {}; 
  public alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor(){}

  ngOnInit(): void {

    setTimeout(() => {
      this.generateRandomChars();
      this.getCoordinatesBySystemClock();
    }, 1000);

  }

  generateRandomChars() {
    this.grid = [];
    this.randomCharsGenerated = {};
    for (let index = 0; index < 10; index++) {
      const rowOfAlpha = [];
      for (let index = 0; index < 10; index++) {
        const generatedChar = this.alphabet.charAt(Math.floor(Math.random() * 26));
        this.randomCharsGenerated[generatedChar] = this.randomCharsGenerated[generatedChar] || 0;
        this.randomCharsGenerated[generatedChar]++;
        rowOfAlpha.push(generatedChar);
      }
      this.grid.push(rowOfAlpha);
    }
  }

  getCoordinatesBySystemClock() {

    const utcDateSeconds = new Date().getUTCSeconds();
    const utcDateSecondsFormatted = utcDateSeconds < 10 ? `0${utcDateSeconds}` : utcDateSeconds;
    const coordinates: number[][] = [];
    const firstCoordinate = parseInt(utcDateSecondsFormatted.toString().charAt(0)); 
    const secondCoordinate = parseInt(utcDateSecondsFormatted.toString().charAt(1)); 
    coordinates.push([firstCoordinate, secondCoordinate]);
    coordinates.push([secondCoordinate, firstCoordinate]);
    console.log(utcDateSecondsFormatted);
    console.log(coordinates);

    console.log(this.grid);
    
    console.log('first', this.grid[coordinates[0][1]][coordinates[0][0]]);
    console.log('second', this.grid[coordinates[1][1]][coordinates[1][0]]);
    console.log(this.randomCharsGenerated[this.grid[coordinates[0][1]][coordinates[0][0]]]);
    console.log(this.randomCharsGenerated[this.grid[coordinates[1][1]][coordinates[1][0]]]);
    
    
  }
  
}
