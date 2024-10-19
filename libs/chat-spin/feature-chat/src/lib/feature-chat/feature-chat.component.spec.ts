import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureChatComponent } from './feature-chat.component';

describe('FeatureChatComponent', () => {
  let component: FeatureChatComponent;
  let fixture: ComponentFixture<FeatureChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
