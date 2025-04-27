import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionChapterComponent } from './description-chapter.component';

describe('DescriptionChapterComponent', () => {
  let component: DescriptionChapterComponent;
  let fixture: ComponentFixture<DescriptionChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
