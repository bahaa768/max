import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  selectedIngredient = new Subject<Ingredient>();
  selectedIndex: number;
  private ingredients: Ingredient[] = [
    new Ingredient ('Apple', 5),
    new Ingredient ('Tomatoes', 10),
  ];
  emptyIngredients: Ingredient[];
  getIngrediants() {
    return this.ingredients.slice();
  }

  addIngredient(ing: Ingredient) {

    if (this.ingredients.findIndex(x => x.name.toLowerCase() === ing.name.toLowerCase()) === -1) {
      this.ingredients.push(ing);
      this.ingredientsChanged.next(this.getIngrediants());
    } else {
      this.ingredients.find(x => x.name.toLowerCase() === ing.name.toLowerCase()).amount += ing.amount;
    }


  }

  toShoppingList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngrediants());
  }


  cempty() {
    this.ingredients.length = 0;
  }

  delete() {
    this.ingredients.splice(this.selectedIndex, 1);
    this.ingredientsChanged.next(this.getIngrediants());

  }

  getIngredient(index: number) {
    this.selectedIngredient.next(this.ingredients[index]);
    this.selectedIndex = index;
  }

  editItem(ingredient: Ingredient) {
    this.ingredients[this.selectedIndex] = ingredient;
    this.ingredientsChanged.next(this.getIngrediants());
  }



}
