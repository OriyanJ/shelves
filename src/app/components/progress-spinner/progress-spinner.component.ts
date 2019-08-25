import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgressService } from '@services';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {
  progress$ = new Observable<boolean>();
  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progress$ = this.progressService.isProgress;
  }
}
