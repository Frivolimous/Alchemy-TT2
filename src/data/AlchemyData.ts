
export enum RewardType {
  Relics,
  Diamonds,
  Firestones,
  Dust,
  RaidCards,
  Wildcards,
  CraftingShards,
  Pets,
  Skillpoints,
  Perks,
  SpecificPerks,
  CommonItem,
  RareItem,
  LegendaryItem,
  MythicItem,
  HeroWeapon,
  HeroScroll,
  FortuneWeapon,
  FortuneScroll,
  Gold,
  TournamentPoints,
  StageRush,
  Cosmetic,
  RaidXP,
  ResetTokens,
}

export enum ScoreType {
  QuestComplete,
  CombinationMade,
  RecipeDiscovered,
  QuestRefreshes,
}

export enum IngredientType {
  Normal,
  Fire,
  Water,
  Grass,
  Electric,
  Ice,
  Fighting,
  Poison,
  Ground,
  Flying,
  Psychic,
  Bug,
  Rock,
  Ghost,
  Dark,
  Dragon,
  Steel,
  Fairy,
}

export enum Rariry { // need 5
  Common,
  Rare,
  Epic,
  Legendary,
  Mythic,
}

export const AlchemyData: IAlchemyData = {
  config: {
    inventorySize: 12,
    recipeSize: 2,
    questsPerDay: 5,
  },

  quests: [
    {id: '1', label: 'First Quest', reward: {type: 'ingredient', id: IngredientType.Fire, count: 1}, questCount: 1},
    {id: '2', label: 'Second Quest', reward: {type: 'ingredient', id: IngredientType.Water, count: 1}, questCount: 1},
    {id: '3', label: 'Random Quest', reward: {type: 'value', id: RewardType.Dust, count: 100}, questCount: 1},
    {id: '4', label: 'BLABAL Quest', reward: {type: 'value', id: RewardType.Dust, count: 100}, questCount: 1},
    {id: '5', label: 'Fireball Quest', reward: {type: 'value', id: RewardType.Dust, count: 100}, questCount: 1},
    {id: '6', label: 'Null Quest', reward: {type: 'value', id: RewardType.Dust, count: 100}, questCount: 1},
  ],

  recipes: [

  ],

  ingredients: [
    { id: IngredientType.Normal, label: 'Charm', rarity: 1, value: 2.5 },
    { id: IngredientType.Fire, label: 'Flame', rarity: 1, value: 2.5 },
    { id: IngredientType.Water, label: 'Droplet', rarity: 1, value: 2.5 },
    { id: IngredientType.Grass, label: 'Leaf', rarity: 1, value: 2.5 },
    { id: IngredientType.Electric, label: 'Shock', rarity: 1, value: 2.5 },
    { id: IngredientType.Ice, label: 'Frost', rarity: 1, value: 2.5 },
    { id: IngredientType.Fighting, label: 'Fist', rarity: 1, value: 2.5 },
    { id: IngredientType.Poison, label: 'Bubbles', rarity: 1, value: 2.5 },
    { id: IngredientType.Ground, label: 'Earth', rarity: 1, value: 2.5 },
    { id: IngredientType.Flying, label: 'Wings', rarity: 1, value: 2.5 },
    { id: IngredientType.Psychic, label: 'Eye', rarity: 1, value: 2.5 },
    { id: IngredientType.Bug, label: 'Beetle', rarity: 1, value: 2.5 },
    { id: IngredientType.Rock, label: 'Rock', rarity: 1, value: 2.5 },
    { id: IngredientType.Ghost, label: 'Wisp', rarity: 1, value: 2.5 },
    { id: IngredientType.Dark, label: 'Darkness', rarity: 1, value: 2.5 },
    { id: IngredientType.Dragon, label: 'Mixture', rarity: 1, value: 2.5 },
    { id: IngredientType.Steel, label: 'Artifact', rarity: 1, value: 2.5 },
    { id: IngredientType.Fairy, label: 'Myth', rarity: 1, value: 2.5 },
  ],
};

interface IAlchemyData {
  config: {
    inventorySize: number;
    recipeSize: number;
    questsPerDay: number;
  };

  quests: IQuest[];
  recipes: IRecipe[];
  ingredients: IIngredient[];
}

export interface IQuest {
  id: string;
  label: string;
  reward: IReward;
  questCount: number;
}

export interface IIngredient {
  id: IngredientType;
  label: string;
  rarity: number;
  value: number;
}

export interface IRecipe {
  id: string;
  ingredients: IngredientType[];
  result: IReward;
}

export type IReward = IIngredientReward | IValueReward | IScoreReward;

interface IIngredientReward {
  type: 'ingredient';
  id: IngredientType;
  count: number;
}

interface IValueReward {
  type: 'value';
  id: RewardType;
  count: number;
}

interface IScoreReward {
  type: 'score';
  id: ScoreType;
  count: number;
}
