import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { VillainState } from "../villain.state";
import { Observable, Subscription } from "rxjs";
import { Villain } from "../villain.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { VillainService } from "../villain.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { GetVillainById, UpdateVillain } from "../villain.action";

@Component({
  selector: "app-edit-villain",
  templateUrl: "./edit-villain.component.html",
  styleUrls: ["./edit-villain.component.css"]
})
export class EditVillainComponent implements OnInit, OnDestroy {
  @Select(VillainState.getSelectedVillain)
  villain: Observable<Villain>;

  villainForm: FormGroup;
  id: string;
  sub: Subscription;
  isSuccess: boolean;

  constructor(
    private store: Store,
    private villainService: VillainService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVillain();
    this.formBuilderInit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.villainForm.value.id = this.id;
    this.putVillain();
    this.isSuccess = true;
  }

  back() {
    this.location.back();
  }

  private getVillain(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.sub = this.store
      .dispatch(new GetVillainById(this.id))
      .subscribe(data => {
        this.patchVillain();
      });
  }

  private patchVillain(): void {
    this.sub = this.villain.subscribe(data => {
      this.villainForm.patchValue(data);
    });
  }

  private putVillain(): void {
    this.store.dispatch(new UpdateVillain(this.villainForm.value)).subscribe();
  }

  private formBuilderInit(): void {
    this.villainForm = this.fb.group({
      id: [""],
      firstName: [""],
      lastName: [""],
      house: [""],
      knownAs: [""]
    });
  }
}
