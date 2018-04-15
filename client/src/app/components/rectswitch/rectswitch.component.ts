import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rectswitch',
  templateUrl: './rectswitch.component.html',
  styleUrls: ['./rectswitch.component.css']
})
export class RectswitchComponent implements OnInit {
  isMale: Boolean = true;
  @Input() gender: String;
  @Output() notifyGender: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    if (this.gender.toLowerCase() == 'male') {
      this.isMale = true;
    } else {
      this.isMale = false;
    }
  }

  changeSwitch(status) {
    if (status == 'male') {
      this.isMale = true;
    } else {
      this.isMale = false;
    }
    this.notifyGender.emit(status.toUpperCase());
  }
}
