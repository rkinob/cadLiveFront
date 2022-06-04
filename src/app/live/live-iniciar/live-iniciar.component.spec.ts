import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveIniciarComponent } from './live-iniciar.component';

describe('LiveIniciarComponent', () => {
  let component: LiveIniciarComponent;
  let fixture: ComponentFixture<LiveIniciarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveIniciarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveIniciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
