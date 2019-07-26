import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { VillainsComponent } from "./container/villains.component";
import { SharedModule } from "../shared/shared.module";
import { EditVillainComponent } from "./edit-villain/edit-villain.component";
import { NgxsModule } from "@ngxs/store";
import { VillainState } from "./villain.state";

const routes: Routes = [
  {
    path: "",
    component: VillainsComponent
  },
  {
    path: "edit-villain/:id",
    component: EditVillainComponent
  }
];

@NgModule({
  declarations: [VillainsComponent, EditVillainComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([VillainState])
  ]
})
export class VillainsModule {}
