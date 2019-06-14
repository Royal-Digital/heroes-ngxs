import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HeroesComponent } from "./container/heroes.component";
import { SharedModule } from "../shared/shared.module";
import { EditHeroComponent } from "./edit-hero/edit-hero.component";
import { NgxsModule } from "@ngxs/store";
import { HeroState } from "./hero.state";

const routes: Routes = [
  {
    path: "",
    component: HeroesComponent
  },
  {
    path: "edit-hero/:id",
    component: EditHeroComponent
  }
];

@NgModule({
  declarations: [HeroesComponent, EditHeroComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([HeroState])
  ]
})
export class HeroesModule {}
