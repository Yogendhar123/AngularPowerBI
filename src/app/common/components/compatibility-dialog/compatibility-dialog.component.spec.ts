import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompatibilityDialogComponent } from './compatibility-dialog.component';

describe('CompatibilityDialogComponent', () => {
  let component: CompatibilityDialogComponent;
  let fixture: ComponentFixture<CompatibilityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompatibilityDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompatibilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
