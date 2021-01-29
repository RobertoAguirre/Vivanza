import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmUsuariosComponent } from './crm-usuarios.component';

describe('CrmUsuariosComponent', () => {
  let component: CrmUsuariosComponent;
  let fixture: ComponentFixture<CrmUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
