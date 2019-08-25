import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgressService } from '@services';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  constructor(private progressService: ProgressService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.progressService.show();
    return next.handle(req).pipe(finalize(() => this.progressService.hide()));
  }
}
