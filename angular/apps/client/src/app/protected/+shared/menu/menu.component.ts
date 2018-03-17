import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'mk-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
}
