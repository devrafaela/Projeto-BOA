import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dicas-bubble',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './ensina-bubble.component.html',
  styleUrl: './ensina-bubble.component.scss'
})
export class EnsinaBubbleComponent {
    constructor(
    private router: Router,
    private dialogRef: MatDialogRef<EnsinaBubbleComponent>
  ) {}

  continuar() {
    this.dialogRef.close(false);
  }

  navigate() {
    this.dialogRef.close();
    this.router.navigate(['home']);
  }
}
