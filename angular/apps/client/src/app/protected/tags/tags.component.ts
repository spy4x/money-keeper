import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TagsDeleteAction } from '@client/protected/tags/+store/actions/delete.action';
import { select, Store } from '@ngrx/store';
import { Tag } from '@root/+shared/types/tag.interface';
import { AppState } from '../../+core/store/app.state';
import { getTagsForActiveGroup } from '../expenses/+store/selectors';
import { TagsCreateAction } from './+store/actions/create.action';
import { TagsEditAction } from './+store/actions/edit.action';

@Component({
  selector: 'mk-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(100%)',
        }),
        animate('0.2s ease-in'),
      ]),
      transition('* => void', [
        animate(
          '0.2s 0.1s ease-out',
          style({
            opacity: 0,
            transform: 'translateY(100%)',
          }),
        ),
      ]),
    ]),
  ],
})
export class TagsComponent {
  tags$ = this.store.pipe(select(getTagsForActiveGroup));
  editTag: Tag;

  constructor(private store: Store<AppState>) {}

  create() {
    this.editTag = {
      name: '',
      color: '',
    };
  }

  edit(tag: Tag) {
    this.editTag = tag;
  }

  remove(tag: Tag) {
    this.store.dispatch(new TagsDeleteAction(tag));
  }

  onCancelEdit() {
    this.editTag = null;
  }

  onSave(tag: Tag) {
    this.store.dispatch(
      tag.id ? new TagsEditAction(tag) : new TagsCreateAction(tag),
    );
    this.onCancelEdit();
  }
}
