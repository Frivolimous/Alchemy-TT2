import * as PIXI from 'pixi.js';
import { AlchemyData, IAlchemyData, IIngredient, IngredientType, IReward, RewardType } from '../data/AlchemyData';
import { Colors } from '../data/Colors';
import { SaveManager } from './SaveManager';

export const AlchemyService = {
  makeRewardString(reward: IReward) {
    if (reward.type === 'ingredient') {
      let ingredient = AlchemyData.ingredients.find(el => el.id === reward.id);
      return `${ingredient.label}: ${reward.count}`;
    } else {
      return `${(RewardType as any)[reward.id]}: ${reward.count}`;
    }
  },

  makePanel(label: string, width: number, height: number, closeButton = false): [PIXI.Graphics, PIXI.Container] {
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

  getCraftingReward(ingredients: IIngredient[]): IReward {
    let recipe = AlchemyData.recipes.find(el => {
      return (el.ingredients[0] === ingredients[0].id && el.ingredients[1] === ingredients[1].id) || (el.ingredients[1] === ingredients[0].id && el.ingredients[0] === ingredients[1].id);
    });

    return recipe ? recipe.result : null;
  },

  randomQuests(count: number) {
    let quests = AlchemyData.quests.map(el => el);

    return AlchemyService.sampleArray(quests, 5);
  },

  randomIngredient() {
    let discoveredIngredients = SaveManager.getExtrinsic().discoveredIngredients;
    let filtered = AlchemyData.ingredients.filter(ingredient => discoveredIngredients[ingredient.id]);
    let weighted = filtered.map(el => ({el, weight: AlchemyData.rarity.find(el2 => el2.id === el.rarity).weight}));

    return AlchemyService.sampleWeighted(weighted);
  },

  sampleWeighted<T>(a: {el: T, weight: number}[]): T {
    let total = 0;
    a.forEach(el => total += el.weight);
    let random = Math.random() * total;
    let acc = 0;
    let index = 0;
    for (index = 0; index < a.length; index++) {
      acc += a[index].weight;
      if (acc > random) break;
    }

    return a[index].el;
  },

  sampleArray<T>(a: T[], count: number = 1): T[] {
    let m: T[] = [];

    while (m.length < count) {
      let index = Math.floor(Math.random() * a.length);
      m.push(a.splice(index, 1)[0]);
    }

    return m;
  },

  equal2dArray<T>(a: T[], b: T[]): boolean {
    return (a[0] === b[0] && a[1] === b[1]) || (a[1] === b[0] && a[0] === b[1]);
  },

  importTSV(tsv: string, invalidateSave = false) {
    let config: any = {};
    let ingredients: any = [];
    let quests: any = [];
    let recipes: any = [];
    let rarity: any = [];

    let parsed: any = tsv.split('\n').map(el => el.split('\t')).filter(el => !el.every(el2 => el2 === ''));

    while (parsed[0][0] !== 'config') {
      parsed.shift();
    }
    parsed.shift();

    while (parsed[0][0] !== 'quests') {
      config[parsed[0][0]] = Number(parsed[0][1]);
      parsed.shift();
    }
    parsed.shift();
    parsed.shift();

    while (parsed[0][0] !== 'recipes') {
      // 'label', 'reward-type', 'reward-id', 'reward-count', 'questCount'
      quests.push({label: parsed[0][0], reward: {type: parsed[0][1], id: parsed[0][2], count: Number(parsed[0][3])}, questCount: Number(parsed[0][4])});
      parsed.shift();
    }
    parsed.shift();
    parsed.shift();

    while (parsed[0][0] !== 'ingredients') {
      // 'ingredients-0', 'ingredients-1', 'result-type', 'result-id', 'result-count'
      recipes.push({ingredients: [parsed[0][0], parsed[0][1]], result: {type: parsed[0][2], id: parsed[0][3], count: Number(parsed[0][4])}});
      parsed.shift();
    }
    parsed.shift();
    parsed.shift();

    while (parsed[0][0] !== 'rarity') {
      // 'id', 'label', 'rarity', 'value', 'default'
      ingredients.push({id: parsed[0][0], label: parsed[0][1], rarity: Number(parsed[0][2]), value: Number(parsed[0][3]), isDefault: Boolean(Number(parsed[0][4]))});
      parsed.shift();
    }
    parsed.shift();
    parsed.shift();

    while (parsed.length > 0) {
      // 'id', 'weight'
      rarity.push({id: Number(parsed[0][0]), weight: Number(parsed[0][1])});
      parsed.shift();
    }

    AlchemyData.config = config;
    AlchemyData.ingredients = ingredients;
    AlchemyData.quests = quests;
    AlchemyData.recipes = recipes;
    AlchemyData.rarity = rarity;

    console.log(JSON.stringify(AlchemyData));
    // return AlchemyData;

    if (invalidateSave) {
      SaveManager.resetData()();
    }
  },
};
