import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryScrollerComponent } from './category-scroller.component';

describe('CategoryScrollerComponent', () => {
  let component: CategoryScrollerComponent;
  let fixture: ComponentFixture<CategoryScrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryScrollerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
