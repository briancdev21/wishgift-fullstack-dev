import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cus-dropdown',
  templateUrl: './cus-dropdown.component.html',
  styleUrls: ['./cus-dropdown.component.css']
})
export class CusDropdownComponent implements OnInit {

  @Input() title: string;
  @Input() options: string[];
  @Input() labels: string[];
  @Output() selected: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectionChanged(event) {
    const selectedIndex = event.target.selectedIndex;
    console.log(selectedIndex);
    this.selected.emit(this.options[selectedIndex]);
  }

}
