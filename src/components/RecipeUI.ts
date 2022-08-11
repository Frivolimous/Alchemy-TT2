import * as PIXI from 'pixi.js';
import { AlchemyData, IIngredient, IngredientType, IReward, RewardType, ScoreType } from '../data/AlchemyData';
import { Colors } from '../data/Colors';
import { AlchemyService } from '../services/AlchemyService';
import { SaveManager } from '../services/SaveManager';
import { IngredientItem } from './IngredientItem';
import { Button } from './ui/Button';
import { SimpleModal } from './ui/modals/SimpleModal';
import { Scrollbar } from './ui/Scrollbar';
import { ScrollWindow } from './ui/ScrollWindow';

export class RecipeUI extends PIXI.Container {
  private items: IngredientItem[] = [];
  private background1: PIXI.Graphics;
  private background2: PIXI.Graphics;
  private contents: PIXI.Container;
  private contents2: PIXI.Container;
  private mode: number = 2;
  private modeFunctions: (() => void)[] = [];
  private scrollWindow: ScrollWindow = new ScrollWindow(280, 455);
  // private scrollBar: Scrollbar;

  constructor() {
    super();
    this.modeFunctions = [this.refreshDisplayTR, this.refreshDisplayBL, this.refreshDisplayList];

    [this.background1, this.contents] = AlchemyService.makePanel('Recipes', 700, 700, true);
    this.addChild(this.background1);
    this.background1.interactive = true;
    [this.background2, this.contents2] = AlchemyService.makePanel('Recipes', 300, 500, true);
    this.addChild(this.background2);
    this.background2.interactive = true;
    this.background2.position.set(10, 60);

    // this.scrollBar = new Scrollbar(20, 500, this.scrollContainer.scrollTo);
    this.contents2.addChild(this.scrollWindow);
    // this.contents.addChild(this.scrollBar);
    // this.scrollWindow.visible = false;
    // this.scrollBar.visible = false;

    this.scrollWindow.position.set(0, 5);
    // this.scrollBar.position.set(650, 50);
  }

  public redrawBackground(width: number) {

  }

  public changeMode() {
    this.mode = (this.mode + 1) % this.modeFunctions.length;
    this.refreshDisplay();
  }

  public refreshDisplay() {
    while (this.items.length > 0) {
      let item = this.items.shift();
      item.parent.removeChild(item);
    }
    // this.scrollWindow.visible = false;
    this.background1.visible = true;
    this.background2.visible = false;

    this.modeFunctions[this.mode]();
  }

  public refreshDisplayTR = () => {
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

  public refreshDisplayBL = () => {
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
        item.position.set(20 + (i + 1) * itemSize, 20 + (j + 1) * itemSize);
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

  public refreshDisplayList = () => {
    // this.scrollWindow.visible = true;
    this.background1.visible = false;
    this.background2.visible = true;


    let extrinsic = SaveManager.getExtrinsic();
    let discoveredIngredients = extrinsic.discoveredIngredients;
    let discoveredRecipes = extrinsic.discoveredRecipes;
    let ingredients = AlchemyData.ingredients;
    let itemSize = 50;
    let y = 10;

    for (let i = 0; i < discoveredRecipes.length; i++) {
      this.addRecipeRow(y, ingredients.find(el => el.id === discoveredRecipes[i][0]), ingredients.find(el => el.id === discoveredRecipes[i][1]), AlchemyService.getCraftingReward(discoveredRecipes[i].map(el => ingredients.find(el2 => el === el2.id))));
      y += itemSize + 10;
    }

    let ia: IngredientType[] = Object.keys(discoveredIngredients).filter(el => (discoveredIngredients as any)[el]) as any;

    for (let i = 0; i < ia.length; i++) {
      for (let j = i; j < ia.length; j++) {
        if (!discoveredRecipes.some(el => AlchemyService.equal2dArray([ia[i], ia[j]], el))) {
          this.addRecipeRow(y, ingredients.find(el => el.id === ia[i]), ingredients.find(el => el.id === ia[j]), null);
          y += itemSize + 10;
        }
      }
    }
  }

  private addRecipeRow(y: number, ingredient1: IIngredient, ingredient2: IIngredient, reward: IReward) {
    let itemSize = 50;

    let item = new IngredientItem(0, null, itemSize);
    this.scrollWindow.addObject(item);
    item.setIngredient(ingredient1);
    item.position.set(5, y);
    this.items.push(item);

    item = new IngredientItem(1, null, itemSize);
    this.scrollWindow.addObject(item);
    item.setIngredient(ingredient2);
    item.position.set(5 + itemSize, y);
    this.items.push(item);

    item = new IngredientItem(2, null, itemSize);
    this.scrollWindow.addObject(item);
    if (!reward) {
      item.setText('?');
    } else if (reward.type === 'ingredient') {
      item.setIngredient(AlchemyData.ingredients.find(el => el.id === reward.id));
    } else if (reward.type === 'value') {
      item.setText(`${reward.count} ${RewardType[reward.id]}`);
    }
    item.position.set(5 + itemSize * 2 + 20, y);
    this.items.push(item);
  }
}
