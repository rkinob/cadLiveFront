import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoModalCreateEditComponent } from './product-modal-create-edit.component';

describe('ProdutoModalCreateEditComponent', () => {
  let component: ProdutoModalCreateEditComponent;
  let fixture: ComponentFixture<ProdutoModalCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoModalCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoModalCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
