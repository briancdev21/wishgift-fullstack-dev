import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  private mRotateMenu: boolean = true;
  private mProfileOpened: boolean = false;
  private mAlertOpened: boolean = false;
  private mNotificationOpened: boolean = false;

  @HostListener('window:click', ['$event'])

  ngOnInit() {

  }

  openProfile(event: any): void {
    console.log('event fire');
    this.mProfileOpened = !this.mProfileOpened;
    event.stopPropagation();
  }

}