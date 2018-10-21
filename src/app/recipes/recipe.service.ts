import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';


export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe ('A Test Recipe1', 'This is a simple test1', 'https://via.placeholder.com/350x150'),
    new Recipe ('A Test Recipe2', 'This is a simple test2', 'https://via.placeholder.com/350x150')
  ];
  getRecipes() {
    return this.recipes.slice();
  }
}
