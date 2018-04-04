import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule],
})
export class MaterialModule { }