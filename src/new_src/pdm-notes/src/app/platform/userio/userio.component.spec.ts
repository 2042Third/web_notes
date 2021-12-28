/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserioComponent } from './userio.component';

describe('UserioComponent', () => {
  let component: UserioComponent;
  let fixture: ComponentFixture<UserioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
