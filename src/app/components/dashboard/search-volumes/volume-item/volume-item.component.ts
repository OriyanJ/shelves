import { Component, OnInit, Input } from '@angular/core';
import { Volume } from '@models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { WishlistService } from '@services';

@Component({
  selector: 'app-volume-item',
  templateUrl: './volume-item.component.html',
  styleUrls: ['./volume-item.component.scss']
})
export class VolumeItemComponent implements OnInit {
  @Input() volume: Volume;
  @Input() isWishlistItem: boolean;

  isInWishlist: boolean;

  constructor(public bsModalRef: BsModalRef, private wishlistService: WishlistService) { }

  ngOnInit() {
    this.isInWishlist = this.isWishlistItem ? true : this.wishlistService.isInWishlist(this.volume.id);
  }

  toggleWishlist() {
    if (this.isWishlistItem || this.isInWishlist) {
      this.wishlistService.remove(this.volume.id);
      this.isInWishlist = false;
      return;
    }
    this.wishlistService.add(this.volume);
    this.isInWishlist = true;
  }

}
