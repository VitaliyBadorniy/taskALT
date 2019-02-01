import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MainComponent} from './main.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from '../shared/services/data.service';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import moment = require('moment');
import {of} from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let dataService: DataService;
  let spy: jasmine.Spy;
  let mockAgendas;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NoopAnimationsModule
      ],
      declarations: [MainComponent],
      providers: [DataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    dataService = fixture.debugElement.injector.get(DataService);
    mockAgendas = [
      {id: '1', name: 'breakfast', date: new Date(new Date('2019-10-20 08:00:00Z')), description: 'breakfast'},
      {id: '2', name: 'dinner', date: new Date(new Date('2019-10-20 12:00:00Z')), description: 'dinner'}
    ];
    spy = spyOn(dataService, 'getAllAgenda').and.returnValue(of(mockAgendas));
    fixture.detectChanges();
  });

  it('should create MainComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call DataService', () => {
    component.ngOnInit();
    expect(spy.calls.any()).toBeTruthy();
  });

});
