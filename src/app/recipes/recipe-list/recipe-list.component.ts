import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {



  recipes: Recipe[];
  //  = [
  //   new Recipe ('A Test Recipe1', 'This is a simple test1', 'https://via.placeholder.com/350x150'),
  //   new Recipe ('A Test Recipe2', 'This is a simple test2', 'https://via.placeholder.com/350x150')
  // ];


  constructor(private recipeService: RecipeService) {

   }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }


}
