import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input() editItemUrl: string;
  @Input() list$: Observable<any[]>;

  @Output() handleRemoveItem: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {}

  removeItem(item: any): void {
    this.handleRemoveItem.emit(item);
  }

  goToEditItem(id: string): void {
    this.router.navigateByUrl(this.editItemUrl + id);
  }
}
