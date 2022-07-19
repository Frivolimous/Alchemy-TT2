import * as PIXI from 'pixi.js';
import { AlchemyData, IngredientType, IReward, RewardType, ScoreType } from '../data/AlchemyData';
import { Colors } from '../data/Colors';
import { AlchemyService } from '../services/AlchemyService';

export class IngredientUI extends PIXI.Container {
  public ingredients: Partial<{[key in IngredientType]: number}> = { };

  private resourceText: PIXI.Text;

  constructor(private onRewardAdded: (reward: IReward) => void) {
    super();
    let background: PIXI.Graphics;
    let contents: PIXI.Container;

    [background, contents] = AlchemyService.makePanel('Ingredients', 300, 500);
    this.resourceText = new PIXI.Text('no ingredients', {fontSize: 18, fill: 0xffffff});
    this.resourceText.position.set(3, 3);

    this.addChild(background);
    contents.addChild(this.resourceText);
  }

  public addIngredient(ingredient: IngredientType, count: number) {
    this.ingredients[ingredient] = (this.ingredients[ingredient] || 0) + count;
    this.refreshDisplay();
  }

  public refreshDisplay() {
    let txt: string = '';
    for (let key of Object.keys(this.ingredients)) {
      txt += `\n ${AlchemyData.ingredients.find(el => el.id === Number(key)).label}: ${(this.ingredients as any)[key as any]}`;
    }

    this.resourceText.text = txt;
  }
}
