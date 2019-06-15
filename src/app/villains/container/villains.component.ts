import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { VillainState } from "../villain.state";
import { Observable } from "rxjs";
import { Villain } from "../villain.model";
import { AddVillain, DeleteVillain, GetVillains } from "../villain.action";

@Component({
  selector: "app-villains",
  templateUrl: "./villains.component.html",
  styleUrls: ["./villains.component.css"]
})
export class VillainsComponent implements OnInit {
  editItemUrl: string = "/villains/edit-villain/";
  newItemForm: FormGroup;
  isShowNewItemForm: boolean = false;

  @Select(VillainState.getVillainList)
  list$: Observable<Villain[]>;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.formBuilderInit();
    this.store.dispatch(new GetVillains());
  }

  onSubmit() {
    this.store.dispatch(new AddVillain(this.newItemForm.value));
  }

  showNewItemForm() {
    this.isShowNewItemForm = !this.isShowNewItemForm;
  }

  cancelForm() {
    this.isShowNewItemForm = !this.isShowNewItemForm;
  }

  removeItem(villain: Villain) {
    const isConfirmed = confirm(`Delete ${villain.firstName}`);
    if (!isConfirmed) return;

    this.store.dispatch(new DeleteVillain(villain.id));
  }

  private formBuilderInit(): void {
    this.newItemForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: [""],
      house: [""],
      knownAs: [""]
    });
  }
}
