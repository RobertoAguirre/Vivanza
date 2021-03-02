import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmsubmediosComponent } from './crmsubmedios.component';

describe('CrmsubmediosComponent', () => {
  let component: CrmsubmediosComponent;
  let fixture: ComponentFixture<CrmsubmediosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmsubmediosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmsubmediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
