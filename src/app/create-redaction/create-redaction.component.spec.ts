import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {CreateRedactionComponent} from './create-redaction.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from '../shared/services/data.service';
import {MaterialModule} from '../shared/frameworks/material.module';
import {of} from 'rxjs';

describe('CreateRedactionComponent', () => {
  let component: CreateRedactionComponent;
  let fixture: ComponentFixture<CreateRedactionComponent>;
  let testBedDataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [CreateRedactionComponent],
      providers: [DataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRedactionComponent);
    component = fixture.componentInstance;
    testBedDataService = TestBed.get(DataService);
    fixture.detectChanges();
  });

  it('should create CreateRedactionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('DataService injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([DataService], (injectService: DataService) => {
      expect(injectService).toBe(testBedDataService);
    }));

});
