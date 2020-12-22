import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcclientesComponent } from './abcclientes.component';

describe('AbcclientesComponent', () => {
  let component: AbcclientesComponent;
  let fixture: ComponentFixture<AbcclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbcclientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
