
export enum RewardType {
  Relics = 'Relics',
  Diamonds = 'Diamonds',
  Firestones = 'Firestones',
  Dust = 'Dust',
  RaidCards = 'RaidCards',
  Wildcards = 'Wildcards',
  CraftingShards = 'CraftingShards',
  Pets = 'Pets',
  Skillpoints = 'Skillpoints',
  Perks = 'Perks',
  SpecificPerks = 'SpecificPerks',
  CommonItem = 'CommonItem',
  RareItem = 'RareItem',
  LegendaryItem = 'LegendaryItem',
  MythicItem = 'MythicItem',
  HeroWeapon = 'HeroWeapon',
  HeroScroll = 'HeroScroll',
  FortuneWeapon = 'FortuneWeapon',
  FortuneScroll = 'FortuneScroll',
  Gold = 'Gold',
  TournamentPoints = 'TournamentPoints',
  StageRush = 'StageRush',
  Cosmetic = 'Cosmetic',
  RaidXP = 'RaidXP',
  ResetTokens = 'ResetTokens',
}

export enum ScoreType {
  QuestComplete,
  CombinationMade,
  RecipeDiscovered,
  QuestRefreshes,
}

export enum IngredientType {
  Bug = 'Bug',
  Dark = 'Dark',
  Dragon = 'Dragon',
  Electric = 'Electric',
  Fairy = 'Fairy',
  Fighting = 'Fighting',
  Fire = 'Fire',
  Flying = 'Flying',
  Ghost = 'Ghost',
  Grass = 'Grass',
  Ground = 'Ground',
  Ice = 'Ice',
  Normal = 'Normal',
  Poison = 'Poison',
  Psychic = 'Psychic',
  Rock = 'Rock',
  Steel = 'Steel',
  Water = 'Water',
}

export const IngredientIndex = {
  Bug: 0,
  Dark: 1,
  Dragon: 2,
  Electric: 3,
  Fairy: 4,
  Fighting: 5,
  Fire: 6,
  Flying: 7,
  Ghost: 8,
  Grass: 9,
  Ground: 10,
  Ice: 11,
  Normal: 12,
  Poison: 13,
  Psychic: 14,
  Rock: 15,
  Steel: 16,
  Water: 17,
};

export enum Rarity { // need 5
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
    { label: 'Kill 1e3 Titans', reward: {type: 'ingredient', id: IngredientType.Fire, count: 1}, questCount: 1},
    { label: 'Prestige 10 Times', reward: {type: 'ingredient', id: IngredientType.Bug, count: 1}, questCount: 1},
    { label: 'Collect 100 Faires', reward: {type: 'ingredient', id: IngredientType.Grass, count: 1}, questCount: 1},
    { label: 'Watch a Video Ad', reward: {type: 'ingredient', id: IngredientType.Water, count: 1}, questCount: 1},
    { label: 'Sell your Soul', reward: {type: 'ingredient', id: IngredientType.Ghost, count: 1}, questCount: 1},
  ],

  recipes: [
    {ingredients: [IngredientType.Fire, IngredientType.Bug], result: {type: 'value', id: RewardType.Diamonds, count:	200}},
    {ingredients: [IngredientType.Fire, IngredientType.Fire], result: {type: 'value', id: RewardType.Firestones, count:	200}},
    {ingredients: [IngredientType.Fire, IngredientType.Ghost], result: {type: 'value', id: RewardType.Dust, count:	400}},
    {ingredients: [IngredientType.Fire, IngredientType.Grass], result: {type: 'value', id: RewardType.CraftingShards, count:	5}},
    {ingredients: [IngredientType.Fire, IngredientType.Water], result: {type: 'value', id: RewardType.Firestones, count:	200}},
    {ingredients: [IngredientType.Bug, IngredientType.Bug], result: {type: 'value', id: RewardType.Firestones, count:	200}},
    {ingredients: [IngredientType.Bug, IngredientType.Ghost], result: {type: 'value', id: RewardType.RareItem, count:	4}},
    {ingredients: [IngredientType.Bug, IngredientType.Grass], result: {type: 'value', id: RewardType.HeroWeapon, count:	1}},
    {ingredients: [IngredientType.Bug, IngredientType.Water], result: {type: 'value', id: RewardType.Perks, count:	3}},
    { ingredients: [IngredientType.Grass, IngredientType.Ghost], result: {type: 'value', id: RewardType.Pets, count:	7}},
    { ingredients: [IngredientType.Grass, IngredientType.Grass], result: {type: 'value', id: RewardType.Firestones, count:	200}},
    { ingredients: [IngredientType.Grass, IngredientType.Water], result: {type: 'value', id: RewardType.Diamonds, count:	200}},
    { ingredients: [IngredientType.Water, IngredientType.Ghost], result: {type: 'value', id: RewardType.Firestones, count:	200}},
    { ingredients: [IngredientType.Water, IngredientType.Water], result: {type: 'value', id: RewardType.Firestones, count:	200}},
    { ingredients: [IngredientType.Ghost, IngredientType.Ghost], result: {type: 'value', id: RewardType.Firestones, count:	200}},
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

export interface IAlchemyData {
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
  label: string;
  reward: IReward;
  questCount: number;
}

export interface IIngredient {
  id: IngredientType;
  label: string;
  rarity: Rarity;
  value: number;
}

export interface IRecipe {
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
