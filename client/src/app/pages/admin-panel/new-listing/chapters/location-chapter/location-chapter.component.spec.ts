import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationChapterComponent } from './location-chapter.component';

describe('LocationChapterComponent', () => {
  let component: LocationChapterComponent;
  let fixture: ComponentFixture<LocationChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
