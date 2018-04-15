import { Component, OnInit } from '@angular/core';
import { PageState } from '../models/pagestate.model';
import * as _ from 'lodash';
import { ProductService } from '../service/product.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProductService]
})


export class AdminComponent implements OnInit {

  // Property Definition 
  expage: any = {};
  sortRule: string;
  searchname = '';
  countOfPageProducts = 10;
  productsOfPage = [];
  numberOfPages: number;
  page: PageState;
  products: any[] = [];
  serverUrl: string = environment.server;
  sortRuleForId: string = 'asc';
  sortRuleForName: string = 'asc';
  sortRuleForPrice: string = 'asc';

  countByLabels = [
    '10',
    '20',
    '50',
    '100',
  ];
  countByOptions = [
    10,
    20,
    50,
    100,
  ];

  sortByLabels = [
    'ID Ascending',
    'ID Descending',
    'Name Ascending',
    'Name Descending',
    'Price Ascending',
    'Price Descending'
  ];

  sortByOptions = [
    'id_asc',
    'id_desc',
    'name_asc',
    'name_desc',
    'price_asc',
    'price_desc'
  ];

  page_options = {
    spanPages : 2,
    previousPage: true,
    nextPage: true,
    firstPage: false,
    lastPage: false,
    titles: {
      firstPage: '',
      previousPage: '<',
      lastPage: '',
      nextPage: '>',
    },
    numberOfPages: 5,
    pageSizes: [{
      value: 5,
      display: '5'
    }, {
      value: 10,
      display: '10'
    }, {
      value: 15,
      display: '15'
    }]
  };

  constructor(private productService: ProductService) { 
    this.productService.getProducts().subscribe((res) => {
      this.products = res.results;
      console.log('get products: ', this.products);
      this.getProducts();
    });
  }

  ngOnInit() {
    if (this.products.length % this.countOfPageProducts !== 0) {
      this.numberOfPages = Math.floor(this.products.length / this.countOfPageProducts) + 1;
    } else {
      this.numberOfPages = this.products.length / this.countOfPageProducts;
    }
    this.getProducts();
  }

  pageChange(pageState: PageState) {
    console.log('page state:', pageState, this.expage);
    this.getProducts(pageState.currentPage);
  }

  countByChanged(event) {
    console.log('admin: ', event);
    this.countOfPageProducts = event;
    if (this.products.length % event !== 0) {
      this.numberOfPages = Math.floor(this.products.length / event) + 1;
    } else {
      this.numberOfPages = this.products.length / event;
    }
    console.log('numberOfPages:', this.numberOfPages);
    this.getProducts();
  }

  sortByChanged(event) {
    console.log('admin: sort by ', event);
    this.sortRule = event;
    this.getProducts();
  }

  // Methods for Sorting 
  sortById(productArr: any[], order: string) {
    productArr.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} );
    if (order === 'desc') {
      productArr.reverse();
    }
    return productArr;
  }

  sortByPrice(productArr: any[], order: string) {
    productArr.sort(function(a,b) {return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0);} );
    if (order === 'desc') {
      productArr.reverse();
    }
    return productArr;
  }

  sortByName(productArr: any[], order: string) {
    productArr.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
    if (order === 'desc') {
      productArr.reverse();
    }
    return productArr;
  }

  changeSortRule(type) {
    let newArr;
    switch(type) {
      case 'id': this.sortRuleForId == 'asc' ? this.sortRuleForId = 'desc' : this.sortRuleForId = 'asc';
        newArr = this.sortById(this.productsOfPage, this.sortRuleForId); break;
      case 'name': this.sortRuleForName == 'asc' ? this.sortRuleForName = 'desc' : this.sortRuleForName = 'asc'; 
        newArr = this.sortByName(this.productsOfPage, this.sortRuleForName); break;
      case 'price': this.sortRuleForPrice == 'asc' ? this.sortRuleForPrice = 'desc' : this.sortRuleForPrice = 'asc';
        newArr = this.sortByPrice(this.productsOfPage, this.sortRuleForPrice); break;
      default: 
        break;
    }
    this.productsOfPage = newArr;
    console.log('change', this.productsOfPage);

  }
  sortProducts(products: any[], rule: string) {
    let newProducts;
    switch(rule) {
      case 'id_desc': newProducts = this.sortById(products, 'desc'); break;
      case 'name_asc': newProducts = this.sortByName(products, 'asc'); break;
      case 'name_desc': newProducts = this.sortByName(products, 'desc'); break;
      case 'price_asc': newProducts = this.sortByPrice(products, 'asc'); break;
      case 'price_desc': newProducts = this.sortByPrice(products, 'desc'); break;
      default: 
        newProducts = this.sortById(products, 'asc'); break;
    }
    return newProducts;
  }

  searchByName(searchname: string) {
    const newData = [];
    _.forEach(this.products, (product) => {
      if (product.name.indexOf(searchname) !== -1) {
        newData.push(product);
      }
    });
    if (searchname === '') {
      return this.products;
    }
    return newData;
  }

  searchNameChanged() {
    console.log('search name:', this.searchname);
    this.getProducts();
  }

  getProducts(currentPage = 1) {
    // extract by search name 
    const productsByName = this.searchByName(this.searchname);
    const productsBySortRule = this.sortProducts(productsByName, this.sortRule);
    console.log('this.numberOfPages:', this.numberOfPages);
    this.page = {
      currentPage: currentPage,
      pageSize: this.countOfPageProducts,
      numberOfPages: this.numberOfPages,
      totalItems: productsBySortRule.length
    };
    this.productsOfPage = productsBySortRule.slice((currentPage - 1) * this.countOfPageProducts, currentPage * this.countOfPageProducts);
    console.log(this.productsOfPage);
  }

  removeProduct(id) {
    console.log('remove id:', id);
    const newArr = [];
    _.forEach(this.products, (product) => {
      if (product.id !== id) {
        newArr.push(product);
      }
    })
    this.products = newArr;
    this.productService.removeProduct(id).subscribe((res) => {
      this.getProducts();
    });
  }

  editProduct(id) {
    console.log('edit id:', id);
    
  }
}
