import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmhomeComponent } from './crmhome.component';

describe('CrmhomeComponent', () => {
  let component: CrmhomeComponent;
  let fixture: ComponentFixture<CrmhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
