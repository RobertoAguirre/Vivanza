import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionModulosComponent } from './asignacion-modulos.component';

describe('AsignacionModulosComponent', () => {
  let component: AsignacionModulosComponent;
  let fixture: ComponentFixture<AsignacionModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionModulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
