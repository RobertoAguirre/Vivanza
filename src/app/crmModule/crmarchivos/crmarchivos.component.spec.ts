import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmarchivosComponent } from './crmarchivos.component';

describe('CrmarchivosComponent', () => {
  let component: CrmarchivosComponent;
  let fixture: ComponentFixture<CrmarchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmarchivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmarchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
