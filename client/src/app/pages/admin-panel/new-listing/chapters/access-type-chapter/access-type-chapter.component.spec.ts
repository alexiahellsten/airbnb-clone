import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTypeChapterComponent } from './access-type-chapter.component';

describe('AccessTypeChapterComponent', () => {
  let component: AccessTypeChapterComponent;
  let fixture: ComponentFixture<AccessTypeChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessTypeChapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessTypeChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
