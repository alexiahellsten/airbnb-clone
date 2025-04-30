import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityChapterComponent } from './capacity-chapter.component';

describe('CapacityChapterComponent', () => {
  let component: CapacityChapterComponent;
  let fixture: ComponentFixture<CapacityChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacityChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacityChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
