import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesChapterComponent } from './amenities-chapter.component';

describe('AmenitiesChapterComponent', () => {
  let component: AmenitiesChapterComponent;
  let fixture: ComponentFixture<AmenitiesChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmenitiesChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmenitiesChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
