import { Component, OnDestroy, OnInit } from "@angular/core";
import { Hero } from "../hero.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { HeroService } from "../hero.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { GetHeroById, UpdateHero } from "../hero.action";
import { HeroState } from "../hero.state";

@Component({
  selector: "app-edit-hero",
  templateUrl: "./edit-hero.component.html",
  styleUrls: ["./edit-hero.component.css"]
})
export class EditHeroComponent implements OnInit, OnDestroy {
  hero: any;

  heroForm: FormGroup;
  id: string;
  sub: Subscription;
  isSuccess: boolean;

  constructor(
    private store: Store,
    private heroService: HeroService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.hero = this.store.select(state => state.heroes.hero);
  }

  ngOnInit(): void {
    this.getHero();
    this.formBuilderInit();
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  onSubmit() {
    this.heroForm.value.id = this.id;
    this.putHero();
    this.isSuccess = true;
  }

  back() {
    this.location.back();
  }

  private getHero(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.store.dispatch(new GetHeroById(this.id));
  }

  private putHero() {
    this.store
      .dispatch(new UpdateHero(this.heroForm.value, this.heroForm.value.id))
      .subscribe();
  }

  private formBuilderInit(): void {
    this.heroForm = this.fb.group({
      id: [""],
      firstName: [""],
      lastName: [""],
      house: [""],
      knownAs: [""]
    });
  }
}
