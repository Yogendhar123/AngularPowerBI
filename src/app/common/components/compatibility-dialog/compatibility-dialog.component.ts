import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-compatibility-dialog',
  templateUrl: './compatibility-dialog.component.html',
  styleUrls: ['./compatibility-dialog.component.scss'],
})
export class CompatibilityDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CompatibilityDialogComponent>) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
