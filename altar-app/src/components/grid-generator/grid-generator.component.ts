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

    setInterval(() => {
      this.generateRandomChars();
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
  
}
