import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../+core/store/app.state';
import { UIMenuToggleAction } from '../../+store/actions/uiMenuToggle.action';

@Component({
  selector: 'mk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private store: Store<AppState>) {}

  toggleMenu(): void {
    this.store.dispatch(new UIMenuToggleAction());
  }
}
