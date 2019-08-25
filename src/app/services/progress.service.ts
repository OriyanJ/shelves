import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly _isProgress: Subject<boolean> = new Subject();
  readonly isProgress = this._isProgress.asObservable();

  show() {
    this._isProgress.next(true);
  }

  hide() {
    this._isProgress.next(false);
  }
}
