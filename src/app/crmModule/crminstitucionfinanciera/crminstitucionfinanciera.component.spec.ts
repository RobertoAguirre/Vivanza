import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrminstitucionfinancieraComponent } from './crminstitucionfinanciera.component';

describe('CrminstitucionfinancieraComponent', () => {
  let component: CrminstitucionfinancieraComponent;
  let fixture: ComponentFixture<CrminstitucionfinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrminstitucionfinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrminstitucionfinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
