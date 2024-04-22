import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMyChildComponent } from './check-my-child.component';

describe('CheckMyChildComponent', () => {
  let component: CheckMyChildComponent;
  let fixture: ComponentFixture<CheckMyChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckMyChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckMyChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
