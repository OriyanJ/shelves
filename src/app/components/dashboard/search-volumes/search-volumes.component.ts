import { Component, OnDestroy, OnInit } from '@angular/core';
import { Volume, VolumesPaginated } from '@models';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BookService } from 'src/app/services/book.service';
import { VisitorService } from 'src/app/services/visitor.service';

interface Pagination {
  page: number;
  itemsPerPage: number;
}

@Component({
  selector: 'app-search-volumes',
  templateUrl: './search-volumes.component.html',
  styleUrls: ['./search-volumes.component.scss']
})
export class SearchVolumesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  visitor$: Observable<string> = new Observable();
  volumeResults: Volume[];
  page = 1;
  totalResults: number;
  currentQuery: string;

  constructor(
    private bookService: BookService,
    private visitorService: VisitorService
  ) {
    this.initVisitorInto();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Initialize the visitor's name.
   */
  initVisitorInto(): void {
    this.visitor$ = this.visitorService.name;
  }

  /**
   * Initiate search.
   * @param query Query to search books by.
   */
  searchBooks(): void {
    const index = this.getStartingIndex();
    this.bookService
      .searchVolumes(this.currentQuery, index)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((results: VolumesPaginated) => {
        this.totalResults = results.totalItems;
        this.volumeResults = results.items ? results.items : [];
      });
  }

  /**
   * Handle query changes coming from the search-bar.
   * @param query Query to search books by.
   */
  onQueryChange(query: string): void {
    // Don't make a search of the query hasn't changed.
    if (this.currentQuery === query.trim() && this.volumeResults.length) {
      return;
    }
    this.currentQuery = query.trim();

    this.page = 1; // When changing query, always reset the starting index.
    this.searchBooks();
  }

  /**
   * Handle a change in page by searching for books.
   */
  onPageChange(pagination: Pagination): void {
    this.page = pagination.page;
    this.searchBooks();
  }

  /**
   * Get the starting index based on the pagination page.
   */
  getStartingIndex(): number {
    return this.page === 1 ? 0 : (this.page - 1) * 20;
  }
}
