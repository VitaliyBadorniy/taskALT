import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Agenda} from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  // save item Agenda for change component
  itemAgenda: Agenda;
  // save item Date calendar for create component
  dataShareDate = '';

  readonly rootUrl = 'http://localhost:8020/api/agenda';
  readonly reqHeader = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  });

  constructor(private httpClient: HttpClient) {}

  getAllAgenda(start: string, end: string): Observable<Agenda[]> {
    return this.httpClient.get<Agenda[]>(this.rootUrl + '/listAgendaByDate?start=' + start + '&end=' + end);
  }

  addAgenda(agenda: any) {
    return this.httpClient.post(this.rootUrl + '/addEvent', JSON.stringify(agenda), {headers: this.reqHeader, responseType: 'text'});
  }

  updateAgenda(agenda: any) {
    return this.httpClient.put(this.rootUrl + '/updateEvent', JSON.stringify(agenda), {headers: this.reqHeader});
  }

  deleteAgenda(id: number) {
    const delHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpClient.post(this.rootUrl + '/deleteEvent', 'id=' + id, {headers: delHeader});
  }
  
}
