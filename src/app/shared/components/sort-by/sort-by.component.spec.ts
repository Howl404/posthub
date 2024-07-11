import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByComponent } from './sort-by.component';

describe('SortByComponent', () => {
  let component: SortByComponent<object>;
  let fixture: ComponentFixture<SortByComponent<object>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortByComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
