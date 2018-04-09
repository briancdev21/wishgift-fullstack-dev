import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-priceinput',
  templateUrl: './priceinput.component.html',
  styleUrls: ['./priceinput.component.css']
})
export class PriceinputComponent implements OnInit {
  unitpriceEditable: Boolean = false;
  @Input() unitprice;
  @Output() notifyPrice: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  changeValue() {
    this.notifyPrice.emit(this.unitprice);
  }

}
