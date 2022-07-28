import * as PIXI from 'pixi.js';
import { AlchemyData, IIngredient, IngredientType, IReward, RewardType, ScoreType } from '../data/AlchemyData';
import { Colors } from '../data/Colors';
import { AlchemyService } from '../services/AlchemyService';
import { SaveManager } from '../services/SaveManager';
import { IngredientItem } from './IngredientItem';
import { Button } from './ui/Button';
import { SimpleModal } from './ui/modals/SimpleModal';

export class RecipeUI extends PIXI.Container {
  private items: IngredientItem[] = [];
  private contents: PIXI.Container;
  constructor() {
    super();

    let background: PIXI.Graphics;
    [background, this.contents] = AlchemyService.makePanel('Recipes', 700, 700, true);
    this.addChild(background);
    background.interactive = true;
  }

  public refreshDisplay() {
    while (this.items.length > 0) {
      this.removeChild(this.items.shift());
    }

    let extrinsic = SaveManager.getExtrinsic();
    let discoveredIngredients = extrinsic.discoveredIngredients;
    let discoveredRecipes = extrinsic.discoveredRecipes;
    let ingredients = AlchemyData.ingredients;

    let across = ingredients.length;
    let itemSize = 590 / across;

    ingredients.forEach((ingredient, i) => {
      let item = new IngredientItem(i, null, itemSize);
      this.contents.addChild(item);
      item.position.set(20 + (i + 1) * itemSize, 20);
      if (discoveredIngredients[ingredient.id]) {
        item.setIngredient(ingredient);
      } else {
        item.setText('?');
      }
      this.items.push(item);

      item = new IngredientItem(i, null, itemSize);
      this.contents.addChild(item);
      item.position.set(20, 20 + (i + 1) * itemSize);
      if (discoveredIngredients[ingredient.id]) {
        item.setIngredient(ingredient);
      } else {
        item.setText('?');
      }
      this.items.push(item);
    });

    for (let i = 0; i < ingredients.length; i++) {
      for (let j = i; j < ingredients.length; j++) {
        let item = new IngredientItem(i, null, itemSize);
        this.contents.addChild(item);
        this.items.push(item);
        item.position.set(20 + (j + 1) * itemSize, 20 + (i + 1) * itemSize);
        if (discoveredRecipes.some(el => AlchemyService.equal2dArray([ingredients[i].id, ingredients[j].id], el))) {
          let reward = AlchemyService.getCraftingReward([ingredients[i], ingredients[j]]);
          if (reward.type === 'ingredient') {
            item.setIngredient(ingredients.find(el => el.id === reward.id));
          } else if (reward.type === 'value') {
            item.setText(`${reward.count} ${RewardType[reward.id]}`);
          }

          // item.setText('YES');
        } else {
          item.setText('?');
        }
      }
    }
  }
}
