import { IIngredient, IngredientType, IQuest, RewardType, ScoreType } from './AlchemyData';

export type CurrencySlug = 'gold' | 'tokens' | 'refresh' | 'suns' | 'souls';

export interface IExtrinsicModel {
  quests: {quest: IQuest, completed: boolean}[];
  ingredients: Partial<{[key in IngredientType]: number}>;
  resources: Partial<{[key in RewardType]: number}>;
  scores: Partial<{[key in ScoreType]: number}>;
  discoveredIngredients: Partial<{[key in IngredientType]: boolean}>;
  discoveredRecipes: [IngredientType, IngredientType][];
}

export const dExtrinsicModel: IExtrinsicModel = {
  quests: [],
  ingredients: {},
  resources: { [RewardType.Gold]: 100 },
  scores: {},
  discoveredIngredients: {},
  discoveredRecipes: [],
};
