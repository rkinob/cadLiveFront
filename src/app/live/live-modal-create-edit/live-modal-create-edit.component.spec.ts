import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveModalCreateEditComponent } from './live-modal-create-edit.component';

describe('LiveModalCreateEditComponent', () => {
  let component: LiveModalCreateEditComponent;
  let fixture: ComponentFixture<LiveModalCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveModalCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveModalCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
