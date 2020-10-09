import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/core/classes/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  status: any;

  constructor(private loader:LoaderService) { }

  ngOnInit() {
    this.loader.showLoader.subscribe(
      res => {
        this.status = res['show'];
      }
    )
  }

}
