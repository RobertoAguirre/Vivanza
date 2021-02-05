import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmeditarmediosComponent } from './crmeditarmedios.component';

describe('CrmeditarmediosComponent', () => {
  let component: CrmeditarmediosComponent;
  let fixture: ComponentFixture<CrmeditarmediosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmeditarmediosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmeditarmediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
