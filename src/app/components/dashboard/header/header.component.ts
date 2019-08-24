import { Component, OnInit } from '@angular/core';
import { WishlistService, VisitorService } from '@services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  visitorName$: Observable<string> = new Observable();
  wishlistCount$: Observable<number> = new Observable();
  constructor(private wishlistService: WishlistService, private visitorService: VisitorService) { }

  ngOnInit() {
    this.visitorName$ = this.visitorService.name;
    this.wishlistCount$ = this.wishlistService.wishlist.pipe(
      map(wishlist => (wishlist ? Object.keys(wishlist).length : 0)),
    )
  }

}
