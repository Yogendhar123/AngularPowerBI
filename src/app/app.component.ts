import { Component } from '@angular/core';
import { AuthService } from './common/services/auth.service';
import { MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TCS - Responsible AI';
  isAuthenticated: boolean = false;
  refreshEventSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.authService.InitializeMsalConfig();
    this.refreshEventSubscription = this.authService
      .GetAuthRefreshEvent()
      .subscribe(() => {
        this.isAuthenticated = this.authService.GetAuthenticationStatus();
      });
  }
}
