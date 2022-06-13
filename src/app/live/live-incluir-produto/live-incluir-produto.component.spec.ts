import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveIncluirProdutoComponent } from './live-incluir-produto.component';

describe('LiveIncluirProdutoComponent', () => {
  let component: LiveIncluirProdutoComponent;
  let fixture: ComponentFixture<LiveIncluirProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveIncluirProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveIncluirProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
