import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSmComponent } from './modal-sm.component';

describe('ModalSmComponent', () => {
  let component: ModalSmComponent;
  let fixture: ComponentFixture<ModalSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
