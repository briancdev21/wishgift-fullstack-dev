import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-roundswitch',
  templateUrl: './roundswitch.component.html',
  styleUrls: ['./roundswitch.component.css']
})
export class RoundswitchComponent implements OnInit {
  @Input() on: Boolean;
  @Output() notifyVisibility: EventEmitter<any> = new EventEmitter();
  status: String;

  constructor() { }

  ngOnInit() {
    if (this.on) {
      this.status = 'on';
    } else {
      this.status = 'off';
    }
  }

  changeText() {
    this.on = !this.on;
    if (this.on) {
      this.status = 'on';
    } else {
      this.status = 'off';
    }
    this.notifyVisibility.emit(this.on);
  }

}
