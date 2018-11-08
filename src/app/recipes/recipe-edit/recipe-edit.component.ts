import { Recipe } from './../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  // @ViewChild ('f')
  recipeForm: FormGroup;
  id: number;
  editMode = true;
  recipe: Recipe;
  recipeIngredients = new FormArray([]);
  path = this.route.snapshot.url[0].path;
  subscription: Subscription;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
    // to check if path is valid or not, if valid stay : navigate away to homepage
    if (this.path === 'new' || this.recipeService.getRecipe(+this.path) !== undefined) {} else {this.router.navigate(['/recipes']); }}

  ngOnInit() {
    if (this.path === 'new' ) {
      this.editMode = false;
      this.initNewForm();
      // this.recipeForm.reset();

      console.log('new form initiated');
    } else {
      this.editMode = true;
      this.subscription = this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
          for (const ingredient of this.recipe.ingredients) {
            this.recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required, Validators.pattern(/^[1-9][0-9]*$/)
              ])
            }));
          }
          this.initEditForm();
          console.log('edit form initiated');
        }
      );
    }
  }

  onSubmit() {
    const name = this.recipeForm.get('name').value;
    const description = this.recipeForm.get('description').value;
    const imagePath = this.recipeForm.get('imagePath').value;
    const ingredients = this.recipeForm.get('ingredients').value;
    if (this.editMode === false) {
      this.recipeService.addRecipe(name, description, imagePath, ingredients);
    } else {
      this.recipeService.editRecipe(this.id, name, description, imagePath, ingredients);
    }
    this.recipeForm.reset();
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onDelete(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    // console.log((<FormArray>this.recipeForm.get('ingredients')).controls);
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['..'], {relativeTo: this.route});
    console.log('cancel');
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
    }));
  }

  private initEditForm() {
    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe.name, Validators.required),
      'imagePath': new FormControl(this.recipe.imagePath, Validators.required),
      'description': new FormControl(this.recipe.description, Validators.required),
      'ingredients': this.recipeIngredients

    });
  }

  private initNewForm() {
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'ingredients': new FormArray([])

    });
  }

  ngOnDestroy() {
    if (this.editMode === true) { this.subscription.unsubscribe(); }
  }

}
