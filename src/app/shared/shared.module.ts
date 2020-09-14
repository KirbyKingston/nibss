import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { TableComponent } from './components/table/table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TrustedUrlPipe } from './pipes/trustedUrl/trusted-url.pipe';



@NgModule({
  declarations: [AlertComponent, TableComponent, LoaderComponent, TrustedUrlPipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
