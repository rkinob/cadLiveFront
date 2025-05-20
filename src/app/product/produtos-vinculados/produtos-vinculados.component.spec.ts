import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosVinculadosComponent } from './produtos-vinculados.component';

describe('ProdutosVinculadosComponent', () => {
  let component: ProdutosVinculadosComponent;
  let fixture: ComponentFixture<ProdutosVinculadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosVinculadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosVinculadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
