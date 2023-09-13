import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveClienteModalCreateEditComponent } from './live-cliente-modal-create-edit.component';

describe('LiveClienteModalCreateEditComponent', () => {
  let component: LiveClienteModalCreateEditComponent;
  let fixture: ComponentFixture<LiveClienteModalCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveClienteModalCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveClienteModalCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
