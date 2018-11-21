import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';



export class RecipeService {

  editMode = true;
  recipesChanged = new Subject<Recipe[]>();
  reset = new Subject<boolean>();
  private recipes: Recipe[];
  constructor(private http: Http) {}
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
    this.recipesChanged.next(this.recipes);
  }

  editRecipe (id, name, description, imagePath, ingredients) {
    const recipeToEdit = new Recipe(name, description, imagePath, ingredients);
    this.recipes[id] = recipeToEdit;
    this.recipesChanged.next(this.recipes);

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }

  fetchRecipes() {
    this.http.get('https://maxx-c3347.firebaseio.com/recipes.json')
    .subscribe(
      (response: Response) => {
        this.recipes = response.json();
      }
    );
  }

  saveRecipes() {
    this.http.put('https://maxx-c3347.firebaseio.com/recipes.json', this.recipes);
  }

}
