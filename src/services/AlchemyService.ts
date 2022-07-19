import * as PIXI from 'pixi.js';
import { AlchemyData, IngredientType, IReward, RewardType } from '../data/AlchemyData';
import { Colors } from '../data/Colors';

export const AlchemyService = {
  makeRewardString(reward: IReward) {
    if (reward.type === 'ingredient') {
      let ingredient = AlchemyData.ingredients.find(el => el.id === reward.id);
      return `${ingredient.label}: ${reward.count}`;
    } else {
      return `${RewardType[reward.id]}: ${reward.count}`;
    }
  },

  makePanel(label: string, width: number, height: number): [PIXI.Graphics, PIXI.Container] {
    let background = new PIXI.Graphics();
    let container = new PIXI.Container();
    let title = new PIXI.Text(label, {fill: Colors.PANEL_TEXT_HIGHLIGHT, fontSize: 20, fontWeight: 'bold'});
    background.beginFill(Colors.PANEL_BORDER).lineStyle(1).drawRect(0, 0, width, height);
    background.beginFill(Colors.PANEL_BACK).drawRect(5, 30, width - 10, height - 35);
    background.addChild(title, container);
    container.position.set(5, 30);
    title.x = (width - title.width) / 2;
    title.y = (30 - title.height) / 2;

    return [background, container];
  },
};
