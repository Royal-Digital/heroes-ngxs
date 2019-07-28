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
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

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
      }),
      catchError((err: HttpErrorResponse) => {
        alert("Something happened. Please try again.");
        return throwError(err.message);
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
      }),
      catchError((err: HttpErrorResponse) => {
        alert("Something happened. Please try again.");
        return throwError(err.message);
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
      }),
      catchError((err: HttpErrorResponse) => {
        alert("Something happened. Please try again.");
        return throwError(err.message);
      })
    );
  }

  @Action(UpdateVillain)
  updateVillain(
    { getState, setState }: StateContext<VillainStateModel>,
    { payload }: UpdateVillain
  ) {
    // Optimistic update
    const previousState = getState();
    const state = getState();
    const villains = [...state.villains];
    const index = villains.findIndex(item => item.id === payload.id);
    villains[index] = payload;
    setState({
      ...state,
      villains
    });
    return this.villainService.updateVillain(payload).pipe(
      catchError((err: HttpErrorResponse) => {
        alert("Something happened. Please try again.");
        setState({
          ...state,
          villains: previousState.villains
        });
        return throwError(err.message);
      })
    );
  }

  @Action(DeleteVillain)
  deleteVillain(
    { getState, setState }: StateContext<VillainStateModel>,
    { id }: DeleteVillain
  ) {
    // Optimistic update
    const previousState = getState();
    const state = getState();
    const filteredArray = state.villains.filter(h => h.id !== id);
    setState({
      ...state,
      villains: filteredArray
    });
    return this.villainService.removeVillain(id).pipe(
      catchError((err: HttpErrorResponse) => {
        alert("Something happened. Please try again.");
        setState({
          ...state,
          villains: previousState.villains
        });
        return throwError(err.message);
      })
    );
  }
}
