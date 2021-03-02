import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuroCreditoComponent } from './buro-credito.component';

describe('BuroCreditoComponent', () => {
  let component: BuroCreditoComponent;
  let fixture: ComponentFixture<BuroCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuroCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuroCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
