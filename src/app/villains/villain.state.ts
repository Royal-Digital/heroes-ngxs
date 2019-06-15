import { Villain } from "./villain.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { VillainService } from "./villain.service";
import {
  AddVillain,
  DeleteVillain,
  GetVillainById,
  GetVillains,
  UpdateVillain
} from "./villain.action";
import { tap } from "rxjs/operators";

export class VillainStateModel {
  villains: Villain[];
  villain: Villain;
}

@State<VillainStateModel>({
  name: "villains",
  defaults: {
    villains: [],
    villain: null
  }
})
export class VillainState {
  constructor(private villainService: VillainService) {}

  @Selector()
  static getVillainList(state: VillainStateModel) {
    return state.villains;
  }

  @Selector()
  static getSelectedVillain(state: VillainStateModel) {
    return state.villain;
  }

  @Action(GetVillains)
  getVillains({ getState, setState }: StateContext<VillainStateModel>) {
    return this.villainService.getVillains().pipe(
      tap(response => {
        const state = getState();
        setState({
          ...state,
          villains: response
        });
      })
    );
  }

  @Action(GetVillainById)
  getVillainById(
    { getState, setState, patchState }: StateContext<VillainStateModel>,
    { id }: GetVillainById
  ) {
    return this.villainService.getVillain(id).pipe(
      tap(response => {
        const state = getState();
        patchState({
          ...state,
          villain: response
        });
      })
    );
  }

  @Action(AddVillain)
  addVillain(
    { getState, patchState }: StateContext<VillainStateModel>,
    { payload }: AddVillain
  ) {
    return this.villainService.addVillain(payload).pipe(
      tap(response => {
        const state = getState();
        patchState({
          villains: [...state.villains, response]
        });
      })
    );
  }

  @Action(UpdateVillain)
  updateVillain(
    { getState, setState }: StateContext<VillainStateModel>,
    { payload }: UpdateVillain
  ) {
    return this.villainService.updateVillain(payload).pipe(
      tap(response => {
        const state = getState();
        const villains = [...state.villains];
        const index = villains.findIndex(item => item.id === payload.id);
        villains[index] = response;
        setState({
          ...state,
          villains
        });
      })
    );
  }

  @Action(DeleteVillain)
  deleteVillain(
    { getState, setState }: StateContext<VillainStateModel>,
    { id }: DeleteVillain
  ) {
    return this.villainService.removeVillain(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.villains.filter(h => h.id !== id);
        setState({
          ...state,
          villains: filteredArray
        });
      })
    );
  }
}
