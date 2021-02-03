import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsmultipleComponent } from './barsmultiple.component';

describe('BarsmultipleComponent', () => {
  let component: BarsmultipleComponent;
  let fixture: ComponentFixture<BarsmultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarsmultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsmultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
