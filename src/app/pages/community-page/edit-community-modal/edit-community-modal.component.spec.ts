import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommunityModalComponent } from './edit-community-modal.component';

describe('EditCommunityModalComponent', () => {
  let component: EditCommunityModalComponent;
  let fixture: ComponentFixture<EditCommunityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCommunityModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCommunityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
