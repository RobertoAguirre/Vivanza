import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmeditartipodecreditoComponent } from './crmeditartipodecredito.component';

describe('CrmeditartipodecreditoComponent', () => {
  let component: CrmeditartipodecreditoComponent;
  let fixture: ComponentFixture<CrmeditartipodecreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmeditartipodecreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmeditartipodecreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
