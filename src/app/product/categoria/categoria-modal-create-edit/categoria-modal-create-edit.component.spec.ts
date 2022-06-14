import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaModalCreateEditComponent } from './categoria-modal-create-edit.component';

describe('CategoriaModalCreateEditComponent', () => {
  let component: CategoriaModalCreateEditComponent;
  let fixture: ComponentFixture<CategoriaModalCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaModalCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaModalCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
