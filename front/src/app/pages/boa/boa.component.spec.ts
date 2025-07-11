import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoaComponent } from './boa.component';

describe('BoaComponent', () => {
  let component: BoaComponent;
  let fixture: ComponentFixture<BoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
