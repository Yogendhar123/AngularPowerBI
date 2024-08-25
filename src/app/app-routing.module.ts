import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { UsageDashboardComponent } from './components/usage-dashboard/usage-dashboard.component';
import { ModeratorDashboardComponent } from './components/moderator-dashboard/moderator-dashboard.component';
import { FeedbackDashboardComponent } from './components/feedback-dashboard/feedback-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/chat',
    pathMatch: 'full',
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'usage-dashboard',
    component: UsageDashboardComponent,
  },
  {
    path: 'moderator-dashboard',
    component: ModeratorDashboardComponent,
  },
  {
    path: 'performance-dashboard',
    component: FeedbackDashboardComponent,
  },
  {
    path: 'auth',
    component: MsalRedirectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
