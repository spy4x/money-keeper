import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mk-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
