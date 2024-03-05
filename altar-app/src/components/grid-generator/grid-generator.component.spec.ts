import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridGeneratorComponent } from './grid-generator.component';
import { GridService } from '../../services/grid.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { GridData } from '../../models/grid.model';
import { LiveCodeComponent } from '../live-code/live-code.component';

describe('GridGeneratorComponent', () => {
  let component: GridGeneratorComponent;
  let fixture: ComponentFixture<GridGeneratorComponent>;
  let gridServiceSpy: jasmine.SpyObj<GridService>;

  beforeEach(() => {
    const gridServiceSpyObj = jasmine.createSpyObj('GridService', [
      'changeBiasInput',
      'stopUpdate',
      'generateGrid',
    ]);

    TestBed.configureTestingModule({
      declarations: [GridGeneratorComponent, LiveCodeComponent],
      imports: [FormsModule],
      providers: [{ provide: GridService, useValue: gridServiceSpyObj }],
    });

    fixture = TestBed.createComponent(GridGeneratorComponent);
    component = fixture.componentInstance;
    gridServiceSpy = TestBed.inject(GridService) as jasmine.SpyObj<GridService>;

    gridServiceSpy.gridDataSubject = new BehaviorSubject<GridData>({
      grid: [[]],
      code: 25,
    });
    gridServiceSpy.liveStatus = new BehaviorSubject(false);
  });

  it('should bind ngModel to biasChar input', async () => {
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;

    component.biasChar = 'A';
    inputElement.value = 'A';
    inputElement.dispatchEvent(new Event('input'));

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.biasChar).toBe('A');
  });

  it('should disable the input when allowBiasChange is false', async () => {
    component.allowBiasChange = false;
    fixture.detectChanges();
    await fixture.whenStable();
    const inputElement = fixture.debugElement.query(
      By.css('#biasValue')
    ).nativeElement;
    expect(inputElement.disabled).toBe(true);
  });

  it('should disable the "Generate 2D Grid" button when allowBiasChange or validBiasCharacter is false', () => {
    component.allowBiasChange = false;
    fixture.detectChanges();
    const generateButton = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    expect(generateButton.disabled).toBe(true);

    component.allowBiasChange = true;
    component.validBiasCharacter = false;
    fixture.detectChanges();
    expect(generateButton.disabled).toBe(true);

    component.allowBiasChange = true;
    component.validBiasCharacter = true;
    fixture.detectChanges();
    expect(generateButton.disabled).toBe(false);
  });
});
