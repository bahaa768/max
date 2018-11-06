import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediant: Ingredient;
  ingredients: Ingredient[];
  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngrediants();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
          console.log('sub');
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }


  onItemClicked(index: number) {
    this.shoppingListService.getIngredient(index);
  }
}
