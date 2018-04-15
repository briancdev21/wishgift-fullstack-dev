import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { HotTableModule } from 'ng2-handsontable';
import { NgxPaginateModule } from 'ngx-paginate';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './angular-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ComponentsModule } from './components/components.module';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';

import { formatId } from './pipes/formatid.pipe';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AddproductComponent,
    formatId,
    ProductdetailsComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgxfUploaderModule.forRoot(),
    HotTableModule,
    NgxPaginateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
