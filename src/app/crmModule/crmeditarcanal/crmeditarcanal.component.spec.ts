import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmeditarcanalComponent } from './crmeditarcanal.component';

describe('CrmeditarcanalComponent', () => {
  let component: CrmeditarcanalComponent;
  let fixture: ComponentFixture<CrmeditarcanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmeditarcanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmeditarcanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
