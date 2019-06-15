import { Hero } from "./hero.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { HeroService } from "./hero.service";
import {
  AddHero,
  DeleteHero,
  GetHeroById,
  GetHeroes,
  UpdateHero
} from "./hero.action";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export class HeroStateModel {
  heroes: Hero[];
  hero: Hero;
}

@State<HeroStateModel>({
  name: "heroes",
  defaults: {
    heroes: [],
    hero: null
  }
})
export class HeroState {
  constructor(private heroService: HeroService) {}

  @Selector()
  static getHeroList(state: HeroStateModel) {
    return state.heroes;
  }

  @Selector()
  static getSelectedHero(state: HeroStateModel) {
    console.log("getSelectedHero!");
    return state.hero;
  }

  @Action(GetHeroes)
  getHeroes({ getState, setState }: StateContext<HeroStateModel>) {
    return this.heroService.getHeroes().pipe(
      tap(response => {
        const state = getState();
        setState({
          ...state,
          heroes: response
        });
      }),
      catchError((err: HttpErrorResponse) => {
        alert("Something happened. Please try again.");
        return throwError(new Error(err.message));
      })
    );
  }

  @Action(GetHeroById)
  getHeroById(
    { getState, setState, patchState }: StateContext<HeroStateModel>,
    { id }: GetHeroById
  ) {
    return this.heroService.getHero(id).pipe(
      tap(response => {
        const state = getState();
        patchState({
          ...state,
          hero: response
        });
      }),
      catchError((err: HttpErrorResponse) => {
        alert("Something happened. Please try again.");
        return throwError(new Error(err.message));
      })
    );
  }

  @Action(AddHero)
  addHero(
    { getState, patchState }: StateContext<HeroStateModel>,
    { payload }: AddHero
  ) {
    return this.heroService.addHero(payload).pipe(
      tap(response => {
        const state = getState();
        patchState({
          heroes: [...state.heroes, response]
        });
      }),
      catchError((err: HttpErrorResponse) => {
        alert("Something happened. Please try again.");
        return throwError(new Error(err.message));
      })
    );
  }

  @Action(UpdateHero)
  updateHero(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload }: UpdateHero
  ) {
    // Optimistic update
    const previousState = getState();
    const state = getState();
    const heroes = [...state.heroes];
    const index = heroes.findIndex(item => item.id === payload.id);
    heroes[index] = payload;
    setState({
      ...state,
      heroes
    });
    return this.heroService.updateHero(payload).pipe(
      catchError((err: HttpErrorResponse) => {
        alert("Something happened. Please try again.");
        setState({
          ...state,
          heroes: previousState.heroes
        });
        return throwError(new Error(err.message));
      })
    );
  }

  @Action(DeleteHero)
  deleteHero(
    { getState, setState }: StateContext<HeroStateModel>,
    { id }: DeleteHero
  ) {
    // Optimistic update
    const previousState = getState();
    const state = getState();
    const filteredArray = state.heroes.filter(h => h.id !== id);
    setState({
      ...state,
      heroes: filteredArray
    });
    return this.heroService.removeHero(id).pipe(
      catchError((err: HttpErrorResponse) => {
        alert("Something happened. Please try again.");
        setState({
          ...state,
          heroes: previousState.heroes
        });
        return throwError(new Error(err.message));
      })
    );
  }
}
