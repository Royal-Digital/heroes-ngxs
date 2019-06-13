import { Hero } from "../models/hero.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ignore } from "selenium-webdriver/testing";
import { HeroService } from "../heroes/hero.service";
import { GetHeroes } from "../actions/hero.action";
import { tap } from "rxjs/operators";

export class HeroStateModel {
  heroes: Hero[];
}

@State<HeroStateModel>({
  name: "heroes",
  defaults: {
    heroes: []
  }
})
export class HeroState {
  constructor(private heroService: HeroService) {}

  @Selector()
  static getHeroList(state: HeroStateModel) {
    return state.heroes;
  }

  @Action(GetHeroes)
  getHeroes({ getState, setState }: StateContext<HeroStateModel>) {
    return this.heroService.getHeroes().pipe(
      tap(response => {
        console.log("RESPONSE: ", response);
        const state = getState();
        setState({
          ...state,
          heroes: response
        });
      })
    );
  }
}
