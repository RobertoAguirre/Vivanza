import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmeditarusuariosComponent } from './crmeditarusuarios.component';

describe('CrmeditarusuariosComponent', () => {
  let component: CrmeditarusuariosComponent;
  let fixture: ComponentFixture<CrmeditarusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmeditarusuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmeditarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
