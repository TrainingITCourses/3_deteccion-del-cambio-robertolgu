import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../store/store/api.service';

@Component({
  selector: 'app-shell-container',
  templateUrl: './shell-container.component.html',
  styleUrls: ['./shell-container.component.css']
})
export class ShellContainerComponent implements OnInit {
  public loaded = false;

  constructor(
    private api: ApiService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.api
    .getLaunches$()
    .subscribe(res =>
      this.api.getStatusTypes$().subscribe(this.setDataAndUpdateViews)
    );
  }
  private setDataAndUpdateViews = () => {
    setTimeout(() => {
      this.loaded = true;
      this.cdRef.detectChanges();
    }, 3000);
  }

}
