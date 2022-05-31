import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveModalCreateComponent } from './live-modal-create.component';

describe('LiveModalCreateComponent', () => {
  let component: LiveModalCreateComponent;
  let fixture: ComponentFixture<LiveModalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveModalCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
