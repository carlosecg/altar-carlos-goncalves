import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-code',
  templateUrl: './live-code.component.html',
  styleUrl: './live-code.component.scss'
})
export class LiveCodeComponent implements OnInit {

  @Input() liveCode!: number | null;
  @Input() liveStatus!: boolean;

  constructor() {}

  ngOnInit(): void {
    
  }
}
