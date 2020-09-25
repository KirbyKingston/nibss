import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { TableComponent } from './components/table/table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TrustedUrlPipe } from './pipes/trustedUrl/trusted-url.pipe';
import { HumanizePipe } from './components/table/humanize';
import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatOptionModule
} from '@angular/material';


@NgModule({
  declarations: [AlertComponent, TableComponent, LoaderComponent, TrustedUrlPipe, HumanizePipe],
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatOptionModule,
    MatCheckboxModule
  ],
  exports: [
    TableComponent, HumanizePipe
  ]
})
export class SharedModule { }
