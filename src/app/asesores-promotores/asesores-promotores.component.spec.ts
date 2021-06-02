import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesoresPromotoresComponent } from './asesores-promotores.component';

describe('AsesoresPromotoresComponent', () => {
  let component: AsesoresPromotoresComponent;
  let fixture: ComponentFixture<AsesoresPromotoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsesoresPromotoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesoresPromotoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
