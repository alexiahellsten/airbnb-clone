import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePerNightChapterComponent } from './price-per-night-chapter.component';

describe('PricePerNightChapterComponent', () => {
  let component: PricePerNightChapterComponent;
  let fixture: ComponentFixture<PricePerNightChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricePerNightChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePerNightChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
