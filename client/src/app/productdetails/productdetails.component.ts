import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
  providers: [ProductService]
})
export class ProductdetailsComponent implements OnInit {

  process: number[] = [];
  fileData: File;
  serverUrl: string = environment.server;
  apiData = new ProductModel();
  productId: number;

  constructor(private Upload: NgxfUploaderService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe( params => {
      this.productId = params.id;
      this.productService.getProduct(params.id).subscribe((res) => {
        Object.assign(this.apiData, res.data);
        console.log(this.apiData);
        const output = document.querySelector('.image-preview img') as HTMLImageElement;
        output.src = `${this.serverUrl}/images/${this.apiData.productImage}`;
      });
    });

  }

  ngOnInit() {
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
    if (!!file) {
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
          this.productService.updateProduct(this.productId, this.apiData).subscribe((res) => {
            this.router.navigate(['admin']);
          });
        });
    } else {
      console.log('api data', this.apiData);
      this.productService.updateProduct(this.productId, this.apiData).subscribe((res) => {
        this.router.navigate(['admin']);
      });
    }
  
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
