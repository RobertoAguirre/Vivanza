import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmeditarcreditoComponent } from './crmeditarcredito.component';

describe('CrmeditarcreditoComponent', () => {
  let component: CrmeditarcreditoComponent;
  let fixture: ComponentFixture<CrmeditarcreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmeditarcreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmeditarcreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
