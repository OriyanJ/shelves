import { Component, OnInit } from '@angular/core';
import { Volume } from '@models';
import { WishlistService } from '@services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist$: Observable<Volume[]> = new Observable();
  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlist$ = this.wishlistService.wishlist.pipe(
      map(wishlist => (wishlist ? Object.values(wishlist) : []))
    );
  }
}
