import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VisitorService } from '../services/visitor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private visitorService: VisitorService) { }

  /**
   * Guard route from guests that haven't given their name.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.visitorService.name.pipe(
      map(visitorName => {
        if (!visitorName) {
          this.router.navigate(['/welcome']);
          return false;
        }
        return true;
      })
    );
  }
}
