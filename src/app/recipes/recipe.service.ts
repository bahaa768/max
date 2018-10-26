import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';


export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe ('A Test Recipe1',
     'This is a simple test1',
      'https://via.placeholder.com/350x150',
       [new Ingredient('dajaj', 5), new Ingredient('hotdog', 2)]),
    new Recipe ('A Test Recipe2',
     'This is a simple test2',
      'https://via.placeholder.com/350x150',
       [new Ingredient('meat', 2), new Ingredient('bread', 2)])
      ];
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
