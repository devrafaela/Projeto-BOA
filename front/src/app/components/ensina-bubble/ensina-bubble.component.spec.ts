import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsinaBubbleComponent } from './ensina-bubble.component';

describe('EnsinaBubbleComponent', () => {
  let component: EnsinaBubbleComponent;
  let fixture: ComponentFixture<EnsinaBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnsinaBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnsinaBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
