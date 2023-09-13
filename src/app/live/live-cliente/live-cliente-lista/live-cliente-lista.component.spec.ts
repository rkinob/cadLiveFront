import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveClienteListaComponent } from './live-cliente-lista.component';

describe('LiveClienteListaComponent', () => {
  let component: LiveClienteListaComponent;
  let fixture: ComponentFixture<LiveClienteListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveClienteListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveClienteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
