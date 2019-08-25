import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProgressService } from '@services';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Output() queryChanged: EventEmitter<string> = new EventEmitter();

  private unsubscribe$ = new Subject<void>();
  progress: boolean;
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private progressService: ProgressService
  ) {
    this.searchForm = this.fb.group({
      query: null
    });
    this.initSearchSubscirption();
    this.initProgressSubscription();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initSearchSubscirption() {
    this.searchForm.valueChanges
      .pipe(
        // Show spinner indication
        tap(data => {
          if (data.query && data.query.trim()) {
            this.progress = true;
          }
        }),
        debounceTime(700), // Debounce query
        tap(() => (this.progress = false)), // Stop spinner indication
        filter(data => !!data.query && data.query.trim()), // Filter empty queries
        takeUntil(this.unsubscribe$)
      )
      .subscribe((value: { query: string }) => {
        this.queryChanged.emit(value.query);
      });
  }

  /**
   * Initialize progress subscription. Once there's an HTTP request, disable the
   * search input. Thus preventing a request going out while one is taking place.
   */
  initProgressSubscription() {
    this.progressService.isProgress
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isProgress: boolean) =>
        this.searchForm
          .get('query')
          [isProgress ? 'disable' : 'enable']({ emitEvent: false })
      );
  }
}
