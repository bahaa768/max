import { Recipe } from './../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  // @ViewChild ('f') 
  recipeForm: FormGroup;
  id: number;
  editMode = true;
  recipe: Recipe;
  recipeIngredients = new FormArray([]);
  path = this.route.snapshot.url[0].path
  navigateAway;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
    // to check if path is valid or not, if valid stay : navigate away to homepage
    if (this.path === 'new' || this.recipeService.getRecipe(+this.path) !== undefined) {} else {this.router.navigate(['/recipes'])}}

  ngOnInit() {  
    if (this.path === 'new' ) {
      this.initNewForm();
      this.recipeService.reset.subscribe(
        reset => reset ? this.recipeForm.reset() : null
        )
      console.log('new form initiated');
    } else {
      this.route.params.subscribe(
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
    console.log(this.recipeForm.value);
  }

  onDelete(index: number) {
    // this.recipeForm.removeControl
    console.log('deleted!');
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

}
