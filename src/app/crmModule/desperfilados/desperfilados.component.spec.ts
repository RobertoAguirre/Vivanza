import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesperfiladosComponent } from './desperfilados.component';

describe('DesperfiladosComponent', () => {
  let component: DesperfiladosComponent;
  let fixture: ComponentFixture<DesperfiladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesperfiladosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesperfiladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
