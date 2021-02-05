import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmmediosComponent } from './crmmedios.component';

describe('CrmmediosComponent', () => {
  let component: CrmmediosComponent;
  let fixture: ComponentFixture<CrmmediosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmmediosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmmediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
