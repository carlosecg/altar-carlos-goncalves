import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCodeComponent } from './live-code.component';

describe('LiveCodeComponent', () => {
  let component: LiveCodeComponent;
  let fixture: ComponentFixture<LiveCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
