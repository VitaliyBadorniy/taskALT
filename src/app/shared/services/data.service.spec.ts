import {async, inject, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {DataService} from './data.service';

describe('DataService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    })
      .compileComponents();
  }));

  it('should create DataService', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should get Agenda[]', inject([DataService, HttpTestingController],
    (service: DataService, backend: HttpTestingController) => {

    const mockAgendas = [
        {id: '1', name: 'breakfast', date: new Date(new Date('2019-10-20 08:00:00Z')), description: 'breakfast'},
        {id: '2', name: 'dinner', date: new Date(new Date('2019-10-20 12:00:00Z')), description: 'dinner'}
      ];
      service.getAllAgenda('', '').subscribe(agenda => {
        expect(agenda).toEqual(mockAgendas);
      });

      backend.expectOne({
        method: 'GET',
        url: 'http://localhost:8020/api/agenda/listAgendaByDate?start=&end='
      }).flush(mockAgendas);
    }));

  it('should create Agenda', inject([DataService, HttpTestingController],
    (service: DataService, backend: HttpTestingController) => {
      const mockAgenda = {name: 'breakfast', date: new Date(new Date('2019-10-20 08:00:00Z')), description: 'breakfast'};

      service.addAgenda(mockAgenda).subscribe(agenda => {
        expect(agenda).toEqual('true');
      });

      backend.expectOne({
        method: 'POST',
        url: 'http://localhost:8020/api/agenda/addEvent'
      }).flush('true');
    }));

  it('should update Agenda', inject([DataService, HttpTestingController],
    (service: DataService, backend: HttpTestingController) => {
      const mockAgenda = {name: 'breakfast', date: new Date(new Date('2019-10-20 08:00:00Z')), description: 'breakfast'};

      service.updateAgenda(mockAgenda).subscribe(agenda => {
        expect(agenda).toEqual('true');
      });

      backend.expectOne({
        method: 'PUT',
        url: 'http://localhost:8020/api/agenda/updateEvent'
      }).flush('true');
    }));

  it('should delete Agenda', inject([DataService, HttpTestingController],
    (service: DataService, backend: HttpTestingController) => {

      service.deleteAgenda(1).subscribe(agenda => {
        expect(agenda).toEqual('true');
      });

      backend.expectOne({
        method: 'POST',
        url: 'http://localhost:8020/api/agenda/deleteEvent'
      }).flush('true');
    }));

});
