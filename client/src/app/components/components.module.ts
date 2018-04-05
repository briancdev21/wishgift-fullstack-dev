import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminheaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AdminheaderComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class ComponentsModule { }