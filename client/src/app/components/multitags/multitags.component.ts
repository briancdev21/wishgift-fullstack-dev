import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Renderer, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multitags',
  templateUrl: './multitags.component.html',
  styleUrls: ['./multitags.component.css']
})
export class MultitagsComponent implements AfterViewInit, OnInit {
  @Input() keywords;
  @Output() notifyKeywordChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('box') input: ElementRef;
  editable: boolean;
  newKeyword: string;

  constructor(private renderer: Renderer) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {
    this.editable = false;
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  addKeyword() {
    this.keywords.push(this.newKeyword);
    this.newKeyword = '';
    this.notifyKeywordChange.emit(this.keywords);
  }

  removeKeyword(index) {
    this.keywords.splice(index, 1);
    this.notifyKeywordChange.emit(this.keywords);
  }

}
