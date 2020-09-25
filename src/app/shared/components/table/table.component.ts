import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  exemption = ['actionView', 'new_price', 'total_price', 'created_at', 'quantity_supplied', 'detailsView', 'deleteView', 'status', 'category',
    'subCategory', 'popularProducts', 'categoryProducts', 'priceProducts', 'verifiedView', 'product_name', 'unit_price', 'editView'];

  // Inputs

  @Input() displayedColumns = [];
  @Input() isPaginated = true;
  @Input() noPagination: boolean = false;

  @Output() actionView = new EventEmitter<number>();
  @Output() actionOne = new EventEmitter<any>();
  @Output() detailsView = new EventEmitter<number>();
  @Output() deleteView = new EventEmitter<any>();
  @Output() editView = new EventEmitter<any>();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private _dataSource;
  get dataSource(): MatTableDataSource<any> {
    return this._dataSource;
  }

  @Input() 
  set dataSource(val: MatTableDataSource<any>) {
  this._dataSource = val;
  if(this._dataSource !== undefined) {
  this._dataSource.paginator = this.paginator;
  }
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  actionOneEvent(value, element) {
    this.actionOne.emit({ action: value, element });
  }

  viewHandle(element) {
    this.detailsView.emit(element);
  }

  deleteHandle(element) {
    this.deleteView.emit(element);
  }

  editHandle(element) {
    this.editView.emit(element);
  }
}
