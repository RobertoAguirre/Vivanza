import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmclientesapartadoComponent } from './crmclientesapartado.component';

describe('CrmclientesapartadoComponent', () => {
  let component: CrmclientesapartadoComponent;
  let fixture: ComponentFixture<CrmclientesapartadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmclientesapartadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmclientesapartadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
