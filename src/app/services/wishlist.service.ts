import { Injectable } from '@angular/core';
import { Volume } from '@models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly _wishlist: BehaviorSubject<Object> = new BehaviorSubject<
    Object
  >(null);

  private wishlistObject = {};

  constructor() {}
  readonly wishlist = this._wishlist.asObservable();

  /**
   * Add a volume to the client's wishlist.
   * @param volume Volume.
   */
  public add(volume: Volume) {
    this.wishlistObject[volume.id] = volume;
    this._wishlist.next(this.wishlistObject);
  }

  /**
   * Remove a volume from the client's wishlist by a volume ID.
   * @param volumeId Volume ID.
   */
  public remove(volumeId: string) {
    delete this.wishlistObject[volumeId];
    this._wishlist.next(this.wishlistObject);
  }

  /**
   * Indicate whether a volume exists in the client's wishlist by a volume ID.
   * @param volumeId The volume's ID.
   */
  isInWishlist(volumeId: string) {
    return volumeId in this.wishlistObject;
  }
}
