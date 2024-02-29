import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridGeneratorComponent } from './grid-generator.component';

describe('GridGeneratorComponent', () => {
  let component: GridGeneratorComponent;
  let fixture: ComponentFixture<GridGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
