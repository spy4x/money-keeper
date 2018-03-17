import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mk-groups-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
