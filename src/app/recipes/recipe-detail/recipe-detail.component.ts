import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';

import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: []
})

export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService,
    private router: Router) {
    this.route.params.subscribe(
      (params: Params) => {
        if (this.recipeService.getRecipe(+params['id']) === undefined) {
          this.router.navigate(['recipes']);
        }
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onToShoppingList() {
    this.shoppingListService.toShoppingList(this.recipe.ingredients);
    }
  onRecipeEdit() {
    this.recipeService.editMode = true;
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onRecipeDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  }


