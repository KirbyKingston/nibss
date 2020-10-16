import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentService } from 'src/core/data/incident/incident.service';
import * as $ from 'jquery'
@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  id: any;
  incident: any;
  noteMessage: any = '';
  document: any;
  constructor(private incidentService: IncidentService, private location: Location, private route: ActivatedRoute) { }
  ngOnInit() {
    this.getId()
    this.getIncident()
    $('.showinfo').click(function () {
      $('#information').show(300);
      $('.showinfo').hide(0);
      $('.hideinfo').show(0);
    });
    $('.hideinfo').click(function () {
      $('#information').hide(300);
      $('.showinfo').show(0);
      $('.hideinfo').hide(0);
    });
  }

  backClicked() {
    this.location.back();
  }

  getId() {
    this.route.params.subscribe(
      res => {
        this.id = res['id']
      })
  }

  getDocument(id){
    this.incidentService.getDocument(id).subscribe(
      res => {
        this.document = res['payload']
      }
    )
  }
  getIncident() {
    this.incidentService.getIncidentById(this.id).subscribe(
      res => {
        console.log(res)
        this.incident = res['payload']
        // this.getDocument()
      },
      err => {
        console.log(err)
      }
    )
  }

  createNote(id){
    this.incidentService.addNote(id, this.noteMessage).subscribe(
      res => {
        console.log(res)
      }
    )
  }

}
