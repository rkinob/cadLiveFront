import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReajustarPrecoComponent } from './reajustar-preco.component';

describe('ReajustarPrecoComponent', () => {
  let component: ReajustarPrecoComponent;
  let fixture: ComponentFixture<ReajustarPrecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReajustarPrecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReajustarPrecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
