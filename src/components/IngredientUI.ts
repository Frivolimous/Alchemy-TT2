import * as PIXI from 'pixi.js';
import { AlchemyData, IngredientType, IReward, RewardType, ScoreType } from '../data/AlchemyData';
import { Colors } from '../data/Colors';
import { AlchemyService } from '../services/AlchemyService';
import { IngredientItem } from './IngredientItem';
import { Button } from './ui/Button';
import { SimpleModal } from './ui/modals/SimpleModal';

export class IngredientUI extends PIXI.Container {
  public ingredients: Partial<{[key in IngredientType]: number}> = { };
  public ingredientElements: IngredientItem[] = [];
  public selectedElements: IngredientItem[] = [];
  public selectedIndex: number[] = [-1, -1];
  public brewButton: Button;

  constructor(private onRewardAdded: (reward: IReward) => void) {
    super();
    let background: PIXI.Graphics;
    let contents: PIXI.Container;
    let topText = new PIXI.Text('Collect ingredients by completing special event quests.', {fontSize: 14, fill: Colors.PANEL_TEXT_NORMAL, wordWrap: true, wordWrapWidth: 280});
    let bottomText = new PIXI.Text('Select two ingredients to combine them into something new!', {fontSize: 14, fill: Colors.PANEL_TEXT_NORMAL, wordWrap: true, wordWrapWidth: 280});
    this.brewButton = new Button({ width: 100, height: 30, label: 'Craft!', onClick: this.craftReward, color: Colors.BUTTON_BACK, rounding: 0, labelStyle: {fill: 0xffffff, fontWeight: 'bold'} });

    [background, contents] = AlchemyService.makePanel('Ingredients', 300, 500);
    topText.position.set(5, 10);

    this.addChild(background);
    contents.addChild(topText, bottomText, this.brewButton);

    let inventorySize = AlchemyData.config.inventorySize;
    let across = 4;
    let itemSize = (300 - 40) / 4 - 10;
    for (let i = 0; i < inventorySize; i++) {
      let item = new IngredientItem(i, this.ingredientSelected, itemSize);
      contents.addChild(item);
      item.position.set(20 + 10 + (i % across) * (itemSize + 4), topText.y + topText.height + 10 + Math.floor(i / across) * (itemSize + 4));
      this.ingredientElements[i] = item;
    }

    let lineHeight = topText.y + topText.height + 10 + Math.floor(inventorySize / across) * (itemSize + 4) + 50;

    background.lineStyle(1, Colors.PANEL_BORDER_INNER).moveTo(20, lineHeight).lineTo(300 - 20, lineHeight);

    bottomText.position.set(5, lineHeight - 15);

    let selectedSize = 60;
    for (let i = 0; i < 2; i++) {
      let item = new IngredientItem(i, null, selectedSize);
      contents.addChild(item);
      item.position.set(140 - 70 + i * 80, bottomText.y + bottomText.height + 20);
      this.selectedElements[i] = item;
    }

    this.brewButton.position.set((300 - 20 - this.brewButton.getWidth()) / 2, this.selectedElements[1].y + 80);
    this.brewButton.visible = false;

    this.addIngredient(IngredientType.Bug, 4);
    this.addIngredient(IngredientType.Water, 4);
  }

  public ingredientSelected = (i: number, selected: boolean): boolean => {
    let el = this.ingredientElements[i];
    if (el.isSelected === selected) return false;
    if (el.isSelected) {
      if (this.selectedIndex[0] === i) {
        this.selectedElements[0].setIngredient(null);
        this.selectedIndex[0] = -1;
        this.brewButton.visible = false;
        return true;
      } else if (this.selectedIndex[1] === i) {
        this.selectedElements[1].setIngredient(null);
        this.selectedIndex[1] = -1;
        this.brewButton.visible = false;
        return true;
      }
    } else {
      if (this.selectedIndex[0] === -1) {
        this.selectedElements[0].setIngredient(el.ingredient);
        this.selectedIndex[0] = i;
        if (this.selectedIndex[1] > -1) this.brewButton.visible = true;

        return true;
      } else if (this.selectedIndex[1] === -1) {
        this.selectedElements[1].setIngredient(el.ingredient);
        this.selectedIndex[1] = i;
        if (this.selectedIndex[0] > -1) this.brewButton.visible = true;

        return true;
      }
    }
    return false;
  }

  public addIngredient(ingredient: IngredientType, count: number) {
    this.ingredients[ingredient] = (this.ingredients[ingredient] || 0) + count;
    this.refreshDisplay();
  }

  public refreshDisplay() {
    let elIndex = 0;
    this.selectedElements[0].setIngredient(null);
    this.selectedElements[1].setIngredient(null);
    this.selectedIndex[0] = this.selectedIndex[1] = -1;
    this.brewButton.visible = false;

    for (let key of Object.keys(this.ingredients)) {
      for (let i = 0; i < (this.ingredients as any)[key]; i++) {
        if (elIndex >= AlchemyData.config.inventorySize) continue;
        this.ingredientElements[elIndex].setIngredient(AlchemyData.ingredients.find(el => el.id === Number(key)));
        elIndex++;
      }
    }

    for (elIndex; elIndex < this.ingredientElements.length; elIndex++) {
      this.ingredientElements[elIndex].setIngredient(null);
    }
  }

  public craftReward = () => {
    let ingredients = this.selectedElements.map(el => el.ingredient);

    let reward = AlchemyService.getCraftingReward(ingredients);

    if (reward) {
      this.ingredients[ingredients[0].id]--;
      this.ingredients[ingredients[1].id]--;

      this.onRewardAdded(reward);
      this.refreshDisplay();
    } else {
      this.onRewardAdded(null);
    }
  }
}
