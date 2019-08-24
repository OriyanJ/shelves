import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class VisitorService {
    private readonly _name: BehaviorSubject<string> = new BehaviorSubject<string>(
        null
    );
    constructor(private router: Router) { }
    readonly name = this._name.asObservable();

    /**
     * Set the visitor's name upon welcoming.
     * @param visitorName Visitor name
     */
    public setName(visitorName: string) {
        this._name.next(visitorName);
        this.router.navigate(['/']);
    }
}
