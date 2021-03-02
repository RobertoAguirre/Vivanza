import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmeditarsubmediosComponent } from './crmeditarsubmedios.component';

describe('CrmeditarsubmediosComponent', () => {
  let component: CrmeditarsubmediosComponent;
  let fixture: ComponentFixture<CrmeditarsubmediosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmeditarsubmediosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmeditarsubmediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
