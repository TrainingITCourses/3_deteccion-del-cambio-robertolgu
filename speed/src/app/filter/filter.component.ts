import { Status } from './../store/models/status';
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
  public filteredLaunches: any[] = [];
  public allLaunches: any[];


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

    this.api.getLaunches$().subscribe(data => {
      this.allLaunches = data;
    });
  }

  selectChange() {
    let filteredLaunches;
    if (this.allLaunches !== undefined) {
      if (this.criterio === 'Estado') {
        filteredLaunches = this.allLaunches.filter(l =>
          l.status == this.filterSelection
        );
      } else if (this.criterio === 'Agencias') {
        filteredLaunches = this.allLaunches.filter(l =>
          l.rocket !== undefined &&
          l.rocket.agencies !== null &&
          l.rocket.agencies[0] !== undefined &&
          l.rocket.agencies[0].id == this.filterSelection
        );
      } else if (this.criterio === 'Tipo') {
        filteredLaunches = this.allLaunches.filter(l =>
          l.missions !== undefined &&
          l.missions[0] !== undefined &&
          l.missions[0].type == this.filterSelection
        );
      }
  }
    this.filteredLaunches = filteredLaunches;
  }

}
