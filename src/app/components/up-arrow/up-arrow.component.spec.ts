import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpArrowComponent } from './up-arrow.component';

describe('UpArrowComponent', () => {
  let component: UpArrowComponent;
  let fixture: ComponentFixture<UpArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpArrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

