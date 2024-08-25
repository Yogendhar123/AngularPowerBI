import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
    AccountInfo,
    AuthenticationResult,
    EventMessage,
    EventType,
    InteractionStatus,
} from '@azure/msal-browser';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnInit, OnDestroy {
    isAuthenticated: boolean = false;
    profile?: AccountInfo | null;
    signedInUserNameInitials?= '';

    private unsubscribe = new Subject<void>();
    private subject = new Subject<void>();

    constructor(
        private msalService: MsalService,
        private msalBroadcastService: MsalBroadcastService,
        private utilityService: UtilityService
    ) { }

    GetAuthRefreshEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    SendAuthRefreshEvent() {
        this.subject.next();
    }

    ngOnInit() { }

    ngOnDestroy(): void {
        this.unsubscribe.next(undefined);
        this.unsubscribe.complete();
    }

    GetAuthenticationStatus() {
        return this.isAuthenticated;
    }

    InitializeMsalConfig() {
        this.msalBroadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status == InteractionStatus.None),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.SetAuthenticationStatus();

                if (!this.isAuthenticated) {
                    this.Login();
                }
            });

        this.msalBroadcastService.msalSubject$
            .pipe(
                filter(
                    (message: EventMessage) =>
                        message.eventType === EventType.LOGIN_SUCCESS
                ),
                takeUntil(this.unsubscribe)
            )
            .subscribe((message: EventMessage) => {
                const authResult = message.payload as AuthenticationResult;
                this.msalService.instance.setActiveAccount(authResult.account);
            });
    }

    Login(): void {
        this.msalService.instance.loginRedirect({ scopes: ['User.Read'] });
    }

    Logout() {
        this.msalService.instance.logoutRedirect();
    }

    SetAuthenticationStatus(): void {
        // console.log(this.msalService.instance.getActiveAccount());
        let activeAccount = this.msalService.instance.getActiveAccount();
        if (
            !activeAccount &&
            this.msalService.instance.getAllAccounts().length > 0
        ) {
            activeAccount = this.msalService.instance.getAllAccounts()[0];
            this.msalService.instance.setActiveAccount(activeAccount);
        }

        this.isAuthenticated = !!activeAccount;
        this.profile = activeAccount;
        this.signedInUserNameInitials = this.utilityService.GetInitials(
            activeAccount?.name
        );
        this.SendAuthRefreshEvent();
    }

    GetProfileInfo() {
        return this.profile;
    }

    GetSignedInUserNameInitials() {
        return this.signedInUserNameInitials;
    }
}
