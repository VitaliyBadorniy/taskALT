import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import * as moment from 'moment';

import {Agenda} from '../shared/interfaces';
import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  // Select date in calendar
  selectDate: Date;
  // Default state ( day week month )
  defaultCalendar = 'month';
  // Local object Agenda
  dataLocal: Agenda[] = [];
  // Data for table
  dataAgenda;
  // Pikers banding
  first = '';
  end = '';

// Sorting and paginator table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

// Columns table
  DispleyColumns = [
    'date',
    'name',
    'description',
    'manage'
  ];

  constructor(private apiService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.getAllAgenda();
  }

// Main service get all Agenda
  getAllAgenda() {
    this.apiService.getAllAgenda(this.first, this.end).subscribe((AllAgenda: any) => {
      // console.log(AllAgenda);
      // Set result to table
      this.workWithAgenda(AllAgenda);
      // Set result to Local DB
      this.dataLocal = AllAgenda;
    }, error0 => {
      console.log(error0);
      // On error go to registration
    });
  }

  // Set result to table
  workWithAgenda(AllAgenda: any) {
    this.dataAgenda = new MatTableDataSource<Agenda>(AllAgenda);
    this.dataAgenda.paginator = this.paginator;
    this.dataAgenda.sort = this.sort;
  }

// Delete from Local DB and SERVER
  deleteMsg(value: Agenda) {
    const isYes = confirm('Ви дійсно хочете видалити подію: ' + value.name);
    if (isYes === true) {
      this.apiService.deleteAgenda(value.id).subscribe((response: any) => {
        console.log(response);
        const index: number = this.dataLocal.indexOf(value);
        // console.log(value);
        if (index !== -1) {
          this.dataLocal.splice(index, 1);
          this.workWithAgenda(this.dataLocal);
          // alert('Ви щойно видалили подію');
        }
      }, error0 => {
        console.log(error0);
        alert('Помилка зʼєднання з сервером');
        // On error go to registration
      });
    }
  }

// go to Chenge page with selected item
  changeMsg(value: Agenda) {
    const index: number = this.dataLocal.indexOf(value);
    if (index !== -1) {
      this.apiService.itemAgenda = value;
      this.goToPage();
    }
  }

// Date modul
  acceptCalendar() {
    // switch button Calendar
    switch (this.defaultCalendar) {
      case 'day': {
        this.first = moment(this.selectDate).startOf('day').format('DD-MM-YYYY HH:mm:ss');
        this.end = moment(this.selectDate).endOf('day').format('DD-MM-YYYY HH:mm:ss');
        break;
      }
      case 'week': {
        this.first = moment(this.selectDate).startOf('week').format('DD-MM-YYYY HH:mm:ss');
        this.end = moment(this.selectDate).endOf('week').format('DD-MM-YYYY HH:mm:ss');
        break;
      }
      case 'month': {
        this.first = moment(this.selectDate).startOf('month').format('DD-MM-YYYY HH:mm:ss');
        this.end = moment(this.selectDate).endOf('month').format('DD-MM-YYYY HH:mm:ss');
        break;
      }
      default: {
        this.first = moment(this.selectDate).startOf('day').format('DD-MM-YYYY HH:mm:ss');
        this.end = moment(this.selectDate).endOf('day').format('DD-MM-YYYY HH:mm:ss');
        break;
      }
    }
    // save selected date from calendar in services for create Agenda
    this.apiService.dataShareDate = moment(this.selectDate).startOf('day').format('YYYY-MM-DD');

    // result show in table
    this.getAllAgenda();
    // console.log(this.first);
    // console.log(this.end);
    // clear banding pikers
    this.first = '';
    this.end = '';
  }

  // Work with filter pikers
  acceptPikers() {
    if (this.first) {
      this.first = moment(this.first).startOf('day').format('DD-MM-YYYY HH:mm:ss');
    } else {
      this.first = '';
    }

    if (this.end) {
      this.end = moment(this.end).endOf('day').format('DD-MM-YYYY HH:mm:ss');
    } else {
      this.end = '';
    }

    this.getAllAgenda();
    this.first = '';
    this.end = '';
  }

// Filter table
  applyFilter(filterValue: any) {

    this.dataAgenda.filterPredicate = (data, filter) => {
      const dataStr = data.description + data.name;
      console.log(dataStr);
      return dataStr.indexOf(filter) !== -1;
    };
    filterValue = filterValue.trim(); // Remove whitespace
    //  filterValue = filterValue.toLowerCase();  // MatTableDataSource defaults to lowercase matches
    console.log(filterValue);
    this.dataAgenda.filter = filterValue;
    console.log(this.dataAgenda);
  }

// Navigate to page
  goToPage() {
    this.router.navigate(['/create-and-redact']);
  }

}
