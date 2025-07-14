import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdenacaoConcluidaComponent } from './modal-ordenacao-concluida.component';

describe('ModalOrdenacaoConcluidaComponent', () => {
  let component: ModalOrdenacaoConcluidaComponent;
  let fixture: ComponentFixture<ModalOrdenacaoConcluidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrdenacaoConcluidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrdenacaoConcluidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
