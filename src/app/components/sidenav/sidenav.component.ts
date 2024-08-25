import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountInfo } from '@azure/msal-browser';
import { LogoutDialogComponent } from 'src/app/common/components/logout-dialog/logout-dialog.component';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  signedInUserNameInitials? = '';
  profile?: AccountInfo | null;
  // refreshEventSubscription: Subscription;

  constructor(private authService: AuthService, public dialog: MatDialog) {
    // this.refreshEventSubscription = this.authService
    //   .GetAuthRefreshEvent()
    //   .subscribe(() => {
    //     this.signedInUserNameInitials =
    //       this.authService.GetSignedInUserNameInitials();
    //     this.profile = this.authService.GetProfileInfo();
    //   });
  }

  async ngOnInit() {
    this.authService.InitializeMsalConfig();
    this.signedInUserNameInitials =
      this.authService.GetSignedInUserNameInitials();
    this.profile = this.authService.GetProfileInfo();
  }

  logout() {
    const dialogRef = this.dialog.open(LogoutDialogComponent);
  }
}
