import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveResumoComponent } from './live-resumo.component';

describe('LiveResumoComponent', () => {
  let component: LiveResumoComponent;
  let fixture: ComponentFixture<LiveResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveResumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
