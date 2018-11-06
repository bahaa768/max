import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';


import { ShoppingListService } from './../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  itemInEdit: Ingredient;
  index: number;
  subscription: Subscription;
  @ViewChild('f') slForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.selectedIngredient.subscribe(
      (ingredient: Ingredient) => {
        this.slForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
        this.editMode = true;

      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(newIngredient);
    this.slForm.reset();
  }

  onDelete() {
    this.shoppingListService.delete();
    this.slForm.reset();
    this.editMode = false;
  }

  // onEmpty() {
  //   this.shoppingListService.clear();
  //   this.shoppingListService.ingredientsChanged.next(this.shoppingListService.getIngrediants());
  // }
  onClear() {
    this.slForm.reset();
    this.editMode = false;

  }

  onEditItem() {
    this.itemInEdit = {name: this.slForm.value.name, amount: this.slForm.value.amount};
    this.shoppingListService.editItem(this.itemInEdit);
    this.editMode = false;
    this.slForm.reset();


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
