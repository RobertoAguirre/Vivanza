import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmcreditoComponent } from './crmcredito.component';

describe('CrmcreditoComponent', () => {
  let component: CrmcreditoComponent;
  let fixture: ComponentFixture<CrmcreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmcreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmcreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
