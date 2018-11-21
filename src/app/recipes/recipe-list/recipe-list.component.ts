import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';

import { RecipeService } from './../recipe.service';
import { Recipe } from '../recipe.model';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;


  recipes: Recipe[];
  //  = [
  //   new Recipe ('A Test Recipe1', 'This is a simple test1', 'https://via.placeholder.com/350x150'),
  //   new Recipe ('A Test Recipe2', 'This is a simple test2', 'https://via.placeholder.com/350x150')
  // ];


  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private http: Http) {

   }

  ngOnInit() {
    this.recipeService.fetchRecipes()
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => { this.recipes = recipes; }
    );
  }

  onNewRecipe() {

    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

