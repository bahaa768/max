import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';



export class RecipeService {

  editMode = true;
  recipesChanged = new Subject<Recipe[]>();
  reset = new Subject<boolean>();
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

  formReset (form: FormGroup) {
    form.reset();
  }

  addRecipe(name, description, imagePath, ingredients) {
    const recipeToAdd = new Recipe(name, description, imagePath, ingredients);
    this.recipes.push(recipeToAdd);
    this.recipesChanged.next(this.getRecipes());
  }

  editRecipe (id, name, description, imagePath, ingredients) {
    const recipeToEdit = new Recipe(name, description, imagePath, ingredients);
    this.recipes[id] = recipeToEdit;
    this.recipesChanged.next(this.getRecipes());

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }

}
