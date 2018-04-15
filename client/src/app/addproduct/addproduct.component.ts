import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../service/product.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  providers: [ProductService]
})  
export class AddproductComponent implements OnInit {
  process: number[] = [];
  fileData: File;

  apiData = new ProductModel();

  constructor(private Upload: NgxfUploaderService, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.apiData.createdDate = new Date().toISOString();
  }
  
   // non-multiple, return File
   uploadFile(file: File | FileError): void {
    if (!(file instanceof File)) {
      this.alertError(file);
      return;
    }
    const output = document.querySelector('.image-preview img') as HTMLImageElement;
    output.src = URL.createObjectURL(file);
    this.fileData = file;
  }

  submit() {
    console.log(this.apiData);
    let file = this.fileData;
    let fileName = '';
    this.Upload.upload({
      url: `${environment.apiserver}/upload`,
      fields: { //Option
        filename: file.name
      },
      filesKey: 'upfile', //Option
      files: file,
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        console.log(event);
        if (event.status === 1) {
          fileName = event.data.data.filename;
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.apiData.productImage = fileName;
        console.log('api data', this.apiData);
        this.productService.addProduct(this.apiData).subscribe((res) => {
          this.router.navigate(['admin']);
        });
      });
  }

  changeVisibility(event) {
    console.log('event:', event);
    this.apiData.visibility = event;
  }
  changeGender(event) {
    console.log('event:', event);
    this.apiData.gender = event;
  }
  changePrice(event) {
    console.log('event:', event);
    this.apiData.price = event;
  }
  changeTags(event) {
    console.log('event:', event);
    this.apiData.tags = event;
  }
  changeRelationships(event) {
    console.log('event:', event);
    this.apiData.relationships = event;
  }
  //Do something you want when file error occur.
  alertError(msg: FileError) {
    switch (msg) {
      case FileError.NumError:
        alert('Number Error');
        break;
      case FileError.SizeError:
        alert('Size Error');
        break;
      case FileError.TypeError:
        alert('Type Error');
        break;
    }
  }
}
