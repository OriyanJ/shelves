import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VisitorService } from '../services/visitor.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(private router: Router, private visitorService: VisitorService) { }

  /**
   * Guard route from logged-in clients.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.visitorService.name.pipe(
      map(visitorName => {
        if (visitorName) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
