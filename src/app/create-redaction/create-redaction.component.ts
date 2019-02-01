import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';

import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-create-redaction',
  templateUrl: './create-redaction.component.html',
  styleUrls: ['./create-redaction.component.css'],
})
export class CreateRedactionComponent implements OnInit {

// Banding fields
  _id = -1;
  _description = '';
  _name = '';
  _date = '';
  _hour = '00';
  _minute = '00';

// Time picker DB
  hourM = [];
  minuteM = [];

// Object send to server
  agenda$;

// Date from calendar on MAIN page
  sharedDate$ = this.apiService.dataShareDate;

  constructor(private router: Router, private apiService: DataService) {
  }

  ngOnInit() {
    // Date from calendar main to create new event
    if (this.sharedDate$ !== '') {
      this._date = this.apiService.dataShareDate;
    } else {
      this._date = moment(Date.now()).startOf('day').format('YYYY-MM-DD');
    }

// Data from main to fill fields
    if (this.apiService.itemAgenda !== undefined) {
      const itemAgenda$ = this.apiService.itemAgenda;
      // console.log(itemAgenda$);
      this._id = itemAgenda$.id;
      this._date = moment(itemAgenda$.date).startOf('day').format('YYYY-MM-DD');
      this._name = itemAgenda$.name;
      this._description = itemAgenda$.description;
      this.apiService.itemAgenda = undefined;
    }
// Push time pikers
    for (let _i = 0; _i < 24; _i++) {
      if (_i < 10) {
        this.hourM.push({hour: '0' + _i});
      } else {
        this.hourM.push({hour: '' + _i});
      }
    }
    for (let _i = 0; _i < 60; _i++) {
      if (_i < 10) {
        this.minuteM.push({minute: '0' + _i});
      } else {
        this.minuteM.push({minute: '' + _i});
      }
    }
    // console.log(this.apiService.dataShareDate);
  }

// GO HOME
  goToPage() {
    this.router.navigate(['/task-ALT']);
  }

// Button submit event
  createEvent() {
    // create date
    const _dMY = moment(this._date).startOf('day').format('YYYY-MM-DD');
    const _date = _dMY + 'T' + this._hour + ':' + this._minute + ':00';

    // create Agenda item!!!!
    this.agenda$ = {id: this._id, name: this._name, date: _date, description: this._description};
    // create or redaction by id value on server
    if (this._id === -1) {
      // create event on server
      this.apiService.addAgenda(this.agenda$).subscribe((response: any) => {
        // console.log(response);
        this.goToPage();
      }, error0 => {
        console.log(error0);
        console.log('Error whith connection');
      });
    } else {
      // update Agenda on server!!!
      this.apiService.updateAgenda(this.agenda$).subscribe((response: any) => {
        // console.log(response);
        this.goToPage();

      }, error0 => {
        console.log(error0);
        console.log('Error whith connection');
      });
    }

    console.log(this.agenda$);
  }

}
