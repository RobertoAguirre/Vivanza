import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmmotivoscancelacionComponent } from './crmmotivoscancelacion.component';

describe('CrmmotivoscancelacionComponent', () => {
  let component: CrmmotivoscancelacionComponent;
  let fixture: ComponentFixture<CrmmotivoscancelacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmmotivoscancelacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmmotivoscancelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
