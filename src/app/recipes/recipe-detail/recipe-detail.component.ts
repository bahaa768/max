import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: []
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnInit() {

  }

  onToShoppingList() {
    this.shoppingListService.toShoppingList(this.recipe.ingredients);
    }

  }


