import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureInformationComponent } from './feature-information.component';

describe('FeatureInformationComponent', () => {
  let component: FeatureInformationComponent;
  let fixture: ComponentFixture<FeatureInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
