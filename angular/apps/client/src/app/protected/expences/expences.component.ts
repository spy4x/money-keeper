import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'mk-expences',
  templateUrl: './expences.component.html',
  styleUrls: ['./expences.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpencesComponent {

  constructor() {
  }

}
