import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesChapterComponent } from './images-chapter.component';

describe('ImagesChapterComponent', () => {
  let component: ImagesChapterComponent;
  let fixture: ComponentFixture<ImagesChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
