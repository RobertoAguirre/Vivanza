import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmeditarmotivoscancelacionComponent } from './crmeditarmotivoscancelacion.component';

describe('CrmeditarmotivoscancelacionComponent', () => {
  let component: CrmeditarmotivoscancelacionComponent;
  let fixture: ComponentFixture<CrmeditarmotivoscancelacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmeditarmotivoscancelacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmeditarmotivoscancelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
