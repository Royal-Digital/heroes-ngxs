import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate(750)]),
      transition('* => void', [animate(750)])
    ])
  ]
})
export class NewItemFormComponent {
  @Input() newItemForm: FormGroup;
  @Input() isShowNewItemForm: boolean = false;

  @Output() handleSubmit = new EventEmitter<void>();
  @Output() handleShowNewItemForm = new EventEmitter<void>();
  @Output() handleCancelForm = new EventEmitter<void>();

  onSubmit() {
    this.handleSubmit.emit();
  }

  cancelForm() {
    this.handleCancelForm.emit();
  }

  showNewItemForm() {
    this.handleShowNewItemForm.emit();
  }
}
