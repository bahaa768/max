import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediant: Ingredient;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngrediants();
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

  }
  ngOnDestroy() {
    this.shoppingListService.ingredientsChanged.unsubscribe();
  }


  onItemClicked(index: number) {
    this.shoppingListService.getIngredient(index);
  }
}
