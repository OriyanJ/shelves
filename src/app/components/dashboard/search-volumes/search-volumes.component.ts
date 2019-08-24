import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VisitorService } from 'src/app/services/visitor.service';
import { VolumesPaginated, Volume } from '@models';

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
  progress: boolean;

  constructor(private bookService: BookService, private visitorService: VisitorService) {
    this.initVisitorInto();
  }

  ngOnInit() { }

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
    this.progress = true;
    const index = this.getStartingIndex();
    this.bookService.searchVolumes(this.currentQuery, index).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (results: VolumesPaginated) => {
        this.totalResults = results.totalItems;
        console.log(this.totalResults);

        this.volumeResults = results.items;
        this.progress = false;
      }
    );
  }

  /**
   * Handle query changes coming from the search-bar.
   * @param query Query to search books by.
   */
  onQueryChange(query: string): void {
    this.currentQuery = query;
    this.page = 1; // When changing query, always reset the starting index.
    this.searchBooks();
  }

  /**
   * Handle a change in page by searching for books.
   * @param pagination 
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
