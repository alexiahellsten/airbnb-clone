import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleChapterComponent } from './title-chapter.component';

describe('TitleChapterComponent', () => {
  let component: TitleChapterComponent;
  let fixture: ComponentFixture<TitleChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
