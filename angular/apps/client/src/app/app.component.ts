import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'mk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
