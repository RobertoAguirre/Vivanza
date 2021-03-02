import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmeditarinstitucionfinancieraComponent } from './crmeditarinstitucionfinanciera.component';

describe('CrmeditarinstitucionfinancieraComponent', () => {
  let component: CrmeditarinstitucionfinancieraComponent;
  let fixture: ComponentFixture<CrmeditarinstitucionfinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmeditarinstitucionfinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmeditarinstitucionfinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
