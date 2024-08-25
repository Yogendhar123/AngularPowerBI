import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';
import { CompatibilityDialogComponent } from '../compatibility-dialog/compatibility-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openPrivacyPolicy() {
    const dialogRef = this.dialog.open(PrivacyDialogComponent);
  }

  openCompatibilityDetails() {
    const dialogRef = this.dialog.open(CompatibilityDialogComponent);
  }
}
