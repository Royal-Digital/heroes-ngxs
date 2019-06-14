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
import { tap } from "rxjs/operators";

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

  //TODO: fix because it is not firing
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
      })
    );
  }

  @Action(UpdateHero)
  updateHero(
    { getState, setState }: StateContext<HeroStateModel>,
    { payload, id }: UpdateHero
  ) {}

  @Action(DeleteHero)
  deleteHero(
    { getState, setState }: StateContext<HeroStateModel>,
    { id }: DeleteHero
  ) {
    return this.heroService.removeHero(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.heroes.filter(h => h.id !== id);
        setState({
          ...state,
          heroes: filteredArray
        });
      })
    );
  }
}
