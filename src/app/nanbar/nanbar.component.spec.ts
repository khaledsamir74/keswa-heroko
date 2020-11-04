import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NanbarComponent } from './nanbar.component';

describe('NanbarComponent', () => {
  let component: NanbarComponent;
  let fixture: ComponentFixture<NanbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NanbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NanbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
