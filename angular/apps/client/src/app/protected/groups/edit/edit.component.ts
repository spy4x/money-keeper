import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mk-groups-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
