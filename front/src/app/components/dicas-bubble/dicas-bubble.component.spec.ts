import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicasBubbleComponent } from './dicas-bubble.component';

describe('DicasBubbleComponent', () => {
  let component: DicasBubbleComponent;
  let fixture: ComponentFixture<DicasBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DicasBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicasBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
