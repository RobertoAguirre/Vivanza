import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmtipodecreditoComponent } from './crmtipodecredito.component';

describe('CrmtipodecreditoComponent', () => {
  let component: CrmtipodecreditoComponent;
  let fixture: ComponentFixture<CrmtipodecreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmtipodecreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmtipodecreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
