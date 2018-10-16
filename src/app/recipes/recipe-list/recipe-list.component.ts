import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() selectedRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe ('A Test Recipe1', 'This is a simple test1', 'https://via.placeholder.com/350x150'),
    new Recipe ('A Test Recipe2', 'This is a simple test2', 'https://via.placeholder.com/350x150')
  ];


  constructor() {

   }

  ngOnInit() {
  }
  onSelected(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }

}
