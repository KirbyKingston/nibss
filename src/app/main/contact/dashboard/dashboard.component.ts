import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  Amount: string;
  TXDate: string;
  ValueDate: string;
  Reference: string;
  TXType: string;
  Balance: string;
  Remarks: string;
 }
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [
    { Amount: '50,000.00', TXDate: '12 Jan 2020', ValueDate: '12 Jan 2020', Reference: 'T009998201131', TXType: 'Credit', Balance: '50,000.00', Remarks: 'TUD/IBG/FUND-...' },
    { Amount: '10,000.00', TXDate: '12 Jan 2020', ValueDate: '12 Jan 2020', Reference: 'T009998201131', TXType: 'Debit', Balance: '50,000.00', Remarks: 'TUD/IBG/FUND-...' },
    { Amount: '10,000.00', TXDate: '12 Jan 2020', ValueDate: '12 Jan 2020', Reference: 'T009998201131', TXType: 'Credit', Balance: '50,000.00', Remarks: 'TUD/IBG/FUND-...' },
    { Amount: '25,000.00', TXDate: '12 Jan 2020', ValueDate: '12 Jan 2020', Reference: 'T009998201131', TXType: 'Credit', Balance: '50,000.00', Remarks: 'TUD/IBG/FUND-...' },
    { Amount: '10,000.00', TXDate: '12 Jan 2020', ValueDate: '12 Jan 2020', Reference: 'T009998201131', TXType: 'Credit', Balance: '50,000.00', Remarks: 'TUD/IBG/FUND-...' }
  ];

  displayedColumns: string[] = ['Amount', 'TXDate', 'ValueDate', 'Reference', 'TXType', 'Balance', 'Remarks'];

  dataSource: MatTableDataSource<any>;
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([...this.ELEMENT_DATA]);
  }


}
