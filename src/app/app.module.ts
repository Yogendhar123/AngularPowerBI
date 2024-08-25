import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '../app/common/modules/material.module';

import { AuthService } from './common/services/auth.service';
import { UtilityService } from './common/services/utility.service';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ChatComponent } from './components/chat/chat.component';
import { UsageDashboardComponent } from './components/usage-dashboard/usage-dashboard.component';
import { FooterComponent } from './common/components/footer/footer.component';

import {
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalRedirectComponent,
  MsalService,
} from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchPipe } from './common/pipes/search.pipe';
import { ModeratorDashboardComponent } from './components/moderator-dashboard/moderator-dashboard.component';
import { FeedbackDashboardComponent } from './components/feedback-dashboard/feedback-dashboard.component';
import { LogoutDialogComponent } from './common/components/logout-dialog/logout-dialog.component';
import { PrivacyDialogComponent } from './common/components/privacy-dialog/privacy-dialog.component';
import { CompatibilityDialogComponent } from './common/components/compatibility-dialog/compatibility-dialog.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.azureAD.clientId,
      authority: environment.azureAD.authority + environment.azureAD.tenantId,
      redirectUri: '/',
    },
  });
}

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ChatComponent,
    UsageDashboardComponent,
    ModeratorDashboardComponent,
    FeedbackDashboardComponent,
    FooterComponent,
    LogoutDialogComponent,
    PrivacyDialogComponent,
    CompatibilityDialogComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MsalService,
    MsalBroadcastService,

    AuthService,
    UtilityService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
