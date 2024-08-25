import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilityService implements OnInit {
    constructor() { }

    ngOnInit() { }

    GetInitials(nameString: string | undefined, i?: any) {
        return nameString !== undefined && nameString !== null
            ? nameString
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
            : 'NA';
    }
}
