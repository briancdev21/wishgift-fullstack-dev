import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { RouterModule } from '@angular/router';
import { RectswitchComponent } from './rectswitch/rectswitch.component';
import { RoundswitchComponent } from './roundswitch/roundswitch.component';
import { PriceinputComponent } from './priceinput/priceinput.component';
import { MultitagsComponent } from './multitags/multitags.component';
import { CusDropdownComponent } from './cus-dropdown/cus-dropdown.component';

@NgModule({
  declarations: [
    AdminheaderComponent,
    RectswitchComponent,
    RoundswitchComponent,
    PriceinputComponent,
    MultitagsComponent,
    CusDropdownComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AdminheaderComponent,
    RectswitchComponent,
    RoundswitchComponent,
    PriceinputComponent,
    MultitagsComponent,
    CusDropdownComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class ComponentsModule { }