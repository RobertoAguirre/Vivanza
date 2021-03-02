import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmusuariosComponent } from './crmusuarios.component';

describe('CrmusuariosComponent', () => {
  let component: CrmusuariosComponent;
  let fixture: ComponentFixture<CrmusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmusuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
