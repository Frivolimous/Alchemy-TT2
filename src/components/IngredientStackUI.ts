import * as PIXI from 'pixi.js';
import { AlchemyData, IIngredient, IngredientType, IReward, RewardType, ScoreType } from '../data/AlchemyData';
import { Colors } from '../data/Colors';
import { AlchemyService } from '../services/AlchemyService';
import { SaveManager } from '../services/SaveManager';
import { IngredientItem } from './IngredientItem';
import { Button } from './ui/Button';
import { SimpleModal } from './ui/modals/SimpleModal';

export class IngredientStackUI extends PIXI.Container {
  public ingredients: IngredientType[] = [];
  public ingredientElements: IngredientItem[] = [];
  public selectedElements: IngredientItem[] = [];
  public brewButton: Button;

  constructor(private onRewardAdded: (reward: IReward, ingredients: IIngredient[]) => void) {
    super();

    let extrinsic = SaveManager.getExtrinsic();
    this.ingredients = extrinsic.ingredients;

    let background: PIXI.Graphics;
    let contents: PIXI.Container;
    let topText = new PIXI.Text('Collect ingredients by completing special event quests.', {fontSize: 14, fill: Colors.PANEL_TEXT_NORMAL, wordWrap: true, wordWrapWidth: 280});
    let bottomText = new PIXI.Text('Select two ingredients to combine them into something new!', {fontSize: 14, fill: Colors.PANEL_TEXT_NORMAL, wordWrap: true, wordWrapWidth: 280});
    this.brewButton = new Button({ width: 100, height: 30, label: 'Craft!', onClick: this.craftReward, color: Colors.BUTTON_BACK, rounding: 0, labelStyle: {fill: 0xffffff, fontWeight: 'bold'} });

    [background, contents] = AlchemyService.makePanel('Ingredients', 300, 500);
    topText.position.set(5, 10);

    this.addChild(background);
    contents.addChild(topText, bottomText, this.brewButton);

    let inventorySize = 14;
    let across = 5;
    let itemSize = (300 - 40) / across - 10;
    for (let i = 0; i < inventorySize; i++) {
      let item = new IngredientItem(i, this.ingredientSelected, itemSize);
      contents.addChild(item);
      item.position.set(20 + 10 + (i % across) * (itemSize + 4), topText.y + topText.height + 10 + Math.floor(i / across) * (itemSize + 4));
      this.ingredientElements[i] = item;
    }

    let lineHeight = topText.y + topText.height + 10 + Math.ceil(inventorySize / across) * (itemSize + 4) + 50;

    background.lineStyle(1, Colors.PANEL_BORDER_INNER).moveTo(20, lineHeight).lineTo(300 - 20, lineHeight);

    bottomText.position.set(5, lineHeight - 15);

    let selectedSize = 60;
    for (let i = 0; i < 2; i++) {
      let item = new IngredientItem(i, this.ingredientRemoved, selectedSize);
      contents.addChild(item);
      item.position.set(140 - 70 + i * 80, bottomText.y + bottomText.height + 20);
      this.selectedElements[i] = item;
    }

    this.brewButton.position.set((300 - 20 - this.brewButton.getWidth()) / 2, this.selectedElements[1].y + 80);
    this.brewButton.visible = false;

    this.refreshDisplay();
  }

  public ingredientSelected = (i: number, selected: boolean): boolean => {
    let el = this.ingredientElements[i];
    if (el.count <= 0) return;

    if (!this.selectedElements[0].ingredient) {
      this.selectedElements[0].setIngredient(el.ingredient);
      if (this.selectedElements[1].ingredient) this.brewButton.visible = true;
      el.count--;
    } else if (!this.selectedElements[1].ingredient) {
      this.selectedElements[1].setIngredient(el.ingredient);
      if (this.selectedElements[0].ingredient) this.brewButton.visible = true;
      el.count--;
    }

    return false;
  }

  public ingredientRemoved = (i: number, selected: boolean): boolean => {
    if (this.selectedElements[i]) {
      let ingredient = this.ingredientElements.find(el => el.ingredient === this.selectedElements[i].ingredient);
      ingredient.count++;
      this.selectedElements[i].setIngredient(null);
      this.brewButton.visible = false;
    }
    return false;
  }

  public addIngredient(ingredient: IngredientType, count: number) {
    for (let i = 0; i < count; i++) {
      this.ingredients.push(ingredient);
    }
    this.refreshDisplay();
  }

  public refreshDisplay() {
    let elIndex = 0;
    this.selectedElements[0].setIngredient(null);
    this.selectedElements[1].setIngredient(null);
    this.brewButton.visible = false;

    let ingredientCount: Partial<{[key in IngredientType]: number}> = {};
    Object.keys(SaveManager.getExtrinsic().discoveredIngredients).forEach((key: IngredientType) => {
      if (SaveManager.getExtrinsic().discoveredIngredients[key]) {
        ingredientCount[key] = 0;
      }
    });
    this.ingredients.forEach(el => ingredientCount[el]++);

    for (let key of Object.keys(ingredientCount)) {
      this.ingredientElements[elIndex].setIngredient(AlchemyData.ingredients.find(el => el.id === key));
      this.ingredientElements[elIndex].count = ingredientCount[key as IngredientType];
      elIndex++;
    }

    for (elIndex; elIndex < this.ingredientElements.length; elIndex++) {
      this.ingredientElements[elIndex].setText('?');
    }
  }

  public craftReward = () => {
    let ingredients = this.selectedElements.map(el => el.ingredient);

    let reward = AlchemyService.getCraftingReward(ingredients);

    if (reward) {
      this.ingredients.splice(this.ingredients.findIndex(el => el === this.selectedElements[0].ingredient.id), 1);
      this.ingredients.splice(this.ingredients.findIndex(el => el === this.selectedElements[1].ingredient.id), 1);
      // if (this.selectedIndex[0] < this.selectedIndex[1]) {
      //   [this.selectedIndex[1], this.selectedIndex[0]] = this.selectedIndex;
      //   [this.selectedElements[1], this.selectedElements[0]] = this.selectedElements;
      // }

      // this.ingredients.splice(this.selectedIndex[0], 1);
      // this.ingredients.splice(this.selectedIndex[1], 1);

      this.onRewardAdded(reward, ingredients);
      this.refreshDisplay();
    } else {
      this.onRewardAdded(null, ingredients);
    }
  }

  public getWidth() {
    return 300;
  }

  public getHeight() {
    return 500;
  }
}
