import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmcanalesComponent } from './crmcanales.component';

describe('CrmcanalesComponent', () => {
  let component: CrmcanalesComponent;
  let fixture: ComponentFixture<CrmcanalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmcanalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmcanalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
