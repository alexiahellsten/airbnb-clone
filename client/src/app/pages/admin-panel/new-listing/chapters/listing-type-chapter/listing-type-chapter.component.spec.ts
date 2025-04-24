import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTypeChapterComponent } from './listing-type-chapter.component';

describe('ListingTypeChapterComponent', () => {
  let component: ListingTypeChapterComponent;
  let fixture: ComponentFixture<ListingTypeChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingTypeChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingTypeChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
