import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../store/store/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() public criterio: string;
  public statuses: any[];
  public agencies: any[];
  public missionTypes: any[];
  public filterSelection: string;


  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getStatusTypes$().subscribe(data => {
      this.statuses = data;
    });

    this.api.getAgencies().subscribe(data => {
      this.agencies = data;
    });

    this.api.getMissionTypes().subscribe(data => {
      this.missionTypes = data;
    });
  }

}
