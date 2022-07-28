
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
  IngredientDiscovered,
  RecipeDiscovered,
  QuestRefreshes,
  IngredientAdded,
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
    { id: IngredientType.Normal, label: 'Charm', rarity: 1, value: 2.5, isDefault: true },
    { id: IngredientType.Fire, label: 'Flame', rarity: 1, value: 2.5, isDefault: true },
    { id: IngredientType.Water, label: 'Droplet', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Grass, label: 'Leaf', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Electric, label: 'Shock', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Ice, label: 'Frost', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Fighting, label: 'Fist', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Poison, label: 'Bubbles', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Ground, label: 'Earth', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Flying, label: 'Wings', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Psychic, label: 'Eye', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Bug, label: 'Beetle', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Rock, label: 'Rock', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Ghost, label: 'Wisp', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Dark, label: 'Darkness', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Dragon, label: 'Mixture', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Steel, label: 'Artifact', rarity: 1, value: 2.5, isDefault: false },
    { id: IngredientType.Fairy, label: 'Myth', rarity: 1, value: 2.5, isDefault: false },
  ],

  rarity: [
    {id: 1, weight: 10},
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
  rarity: {id: number, weight: number}[];
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
  isDefault: boolean;
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

export const baseTSV = `config				
inventorySize	12			
recipeSize	2			
questsPerDay	5			
				
quests				
label	reward-type	reward-id	reward-count	questCount
Kill 1e3 Titans	ingredient	Grass	5	1
				
recipes				
ingredients-0	ingredients-1	result-type	result-id	result-count
Grass	Grass	value	CommonItem	1
Grass	Rock	ingredient	Water	1
Grass	Water	ingredient	Electric	1
Grass	Electric	ingredient	Bug	1
Grass	Poison	value	Firestones	155
Grass	Bug	value	CraftingShards	7
Grass	Ice	value	Firestones	280
Grass	Fire	value	Dust	400
Grass	Steel	value	Firestones	530
Grass	Dragon	value	Firestones	1030
Grass	Psychic	ingredient	Ghost	1
Grass	Fairy	value	Firestones	1030
Grass	Ghost	value	Firestones	2030
Grass	Dark	value	RaidCards	203
Rock	Rock	value	Firestones	60
Rock	Water	value	Pets	1
Rock	Electric	ingredient	Poison	1
Rock	Poison	value	Pets	5
Rock	Bug	value	Firestones	280
Rock	Ice	value	HeroWeapon	1
Rock	Fire	value	Pets	17
Rock	Steel	value	Firestones	530
Rock	Dragon	value	Firestones	1030
Rock	Psychic	value	Firestones	1030
Rock	Fairy	ingredient	Dark	1
Rock	Ghost	value	Skillpoints	1
Rock	Dark	value	Firestones	2030
Water	Water	value	Firestones	120
Water	Electric	value	RareItem	1
Water	Poison	value	Perks	2
Water	Bug	ingredient	Ice	1
Water	Ice	value	FortuneWeapon	1
Water	Fire	value	Firestones	560
Water	Steel	value	Firestones	560
Water	Dragon	value	Firestones	1060
Water	Psychic	value	Firestones	1060
Water	Fairy	value	Firestones	1060
Water	Ghost	value	CraftingShards	51
Water	Dark	value	RaidCards	206
Electric	Electric	value	Firestones	120
Electric	Poison	ingredient	Fire	1
Electric	Bug	value	Firestones	310
Electric	Ice	value	Diamonds	310
Electric	Fire	value	Firestones	560
Electric	Steel	value	Firestones	560
Electric	Dragon	value	Firestones	1060
Electric	Psychic	value	Firestones	1060
Electric	Fairy	value	Firestones	1060
Electric	Ghost	value	Firestones	2060
Electric	Dark	value	RaidCards	206
Poison	Poison	value	Firestones	250
Poison	Bug	ingredient	Steel	1
Poison	Ice	value	HeroScroll	1
Poison	Fire	value	Firestones	625
Poison	Steel	value	Firestones	625
Poison	Dragon	value	Firestones	1125
Poison	Psychic	value	Firestones	1125
Poison	Fairy	value	Firestones	1125
Poison	Ghost	value	Pets	70
Poison	Dark	value	Firestones	2125
Bug	Bug	value	Firestones	500
Bug	Ice	value	Diamonds	500
Bug	Fire	value	Dust	650
Bug	Steel	value	Firestones	750
Bug	Dragon	value	Firestones	1250
Bug	Psychic	value	Firestones	1250
Bug	Fairy	value	Firestones	1250
Bug	Ghost	value	CraftingShards	56
Bug	Dark	value	Wildcards	150
Ice	Ice	value	Firestones	500
Ice	Fire	ingredient	Dragon	1
Ice	Steel	ingredient	Fairy	1
Ice	Dragon	value	Firestones	1250
Ice	Psychic	value	Firestones	1250
Ice	Fairy	value	Firestones	1250
Ice	Ghost	value	CraftingShards	56
Ice	Dark	value	FortuneScroll	1
Fire	Fire	value	Firestones	1000
Fire	Steel	ingredient	Psychic	1
Fire	Dragon	value	Firestones	1500
Fire	Psychic	value	Firestones	1500
Fire	Fairy	value	Firestones	1500
Fire	Ghost	value	Dust	1400
Fire	Dark	value	Pets	83
Steel	Dragon	value	Firestones	1500
Steel	Psychic	value	Firestones	1500
Steel	Fairy	value	Firestones	1500
Steel	Ghost	value	Firestones	2500
Steel	Dark	value	Firestones	2500
Dragon	Psychic	value	Firestones	2000
Dragon	Fairy	value	Firestones	2000
Dragon	Ghost	value	Firestones	3000
Dragon	Dark	value	Firestones	3000
Fairy	Fairy	value	Firestones	2000
Fairy	Ghost	value	Firestones	3000
Fairy	Dark	value	Firestones	3000
Ghost	Ghost	value	Firestones	1000
Ghost	Dark	value	MythicItem	1
Dark	Dark	value	Firestones	1000
				
ingredients				
id	label	rarity	value	isDefault
Grass	Leaf	1	30	1
Rock	Rock	1	30	1
Water	Droplet	2	60	0
Electric	Shock	3	60	0
Poison	Bubbles	4	125	0
Bug	Beetle	4	250	0
Ice	Frost	5	250	0
Fire	Flame	5	500	0
Steel	Arcane	5	500	0
Dragon	Mystics	6	1000	0
Psychic	Aura	6	1000	0
Fairy	Demon	6	1000	0
Ghost	Wisps	7	2000	0
Dark	Darkness	7	2000	0
				
rarity				
id	weight			
1	10			
2	8			
3	6			
4	4			
5	2			`;
