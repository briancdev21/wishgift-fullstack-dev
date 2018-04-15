import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {AuthGuard} from './service/auth-guard.service';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { TagsComponent } from './tags/tags.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tags',
    component: TagsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addproduct',
    component: AddproductComponent,
    canActivate: [AuthGuard]
  },
  { path: 'products/:id', component: ProductdetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}