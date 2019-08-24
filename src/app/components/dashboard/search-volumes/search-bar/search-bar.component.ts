import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  debounceTime,
  takeUntil,
  filter,
  tap,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() formControlName: string;
  @Output() queryChanged: EventEmitter<string> = new EventEmitter();

  private unsubscribe$ = new Subject<void>();
  progress: boolean;

  searchForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: null
    });
    this.setSearchSubscirption();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setSearchSubscirption() {

    this.searchForm.valueChanges.pipe(
      tap(() => this.progress = true),
      debounceTime(700),
      distinctUntilChanged(),
      filter((data) => !!data.query),
      tap(() => this.progress = false),
      takeUntil(this.unsubscribe$)
    ).subscribe((value: { query: string }) => {
      this.queryChanged.emit(value.query);
    });
  }

}
