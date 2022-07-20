
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

export const baseTSV = `config				
inventorySize	12			
recipeSize	2			
questsPerDay	5			
				
quests				
label	reward-type	reward-id	reward-count	questCount
Kill 1e3 Titans	ingredient	Grass	3	1
Prestige 10 Times	ingredient	Rock	3	1
Complete 3 Solo Raid Attacks	ingredient	Grass	2	1
Change your avatar	ingredient	Rock	2	1
Collect 5 Equipment	ingredient	Grass	2	1
Use 1 Perk	ingredient	Rock	2	1
Collect 10 Faires	ingredient	Water	2	1
Watch a Video Ad	ingredient	Electric	2	1
Change your Skill Tree	ingredient	Water	1	1
Play for 5 minutes	ingredient	Electric	1	1
Spend 1+ Diamonds	ingredient	Water	1	1
Spend 1+ Dust	ingredient	Electric	1	1
Sell your Soul	ingredient	Poison	1	1
Laugh out loud	ingredient	Bug	1	1
Log In 1 time	ingredient	Poison	1	1
Prestige between 3 and 4 minutes	ingredient	Bug	1	1
Eat 15 Donuts	ingredient	Ice	1	1
Tap 100 Times	ingredient	Fire	1	1
Cast 20 Spells	ingredient	Ice	1	1
Post a Clan Chat message	ingredient	Fire	1	1
Complete 1 Tournament	ingredient	Ghost	1	1
Prestige 100 Times	ingredient	Dark	1	1
				
recipes				
ingredients-0	ingredients-1	result-type	result-id	result-count
Grass	Grass	value	Firestones	5
Grass	Rock	value	CommonItem	1
Grass	Water	value	Diamonds	25
Grass	Electric	value	CommonItem	5
Grass	Poison	value	Firestones	127.5
Grass	Bug	value	CraftingShards	3
Grass	Ice	value	Firestones	202.5
Grass	Fire	value	Dust	400
Grass	Ghost	value	Firestones	502.5
Grass	Dark	value	RaidCards	50
Rock	Rock	value	Firestones	5
Rock	Water	value	Pets	1
Rock	Electric	value	RaidCards	3
Rock	Poison	value	Pets	4
Rock	Bug	value	Firestones	127.5
Rock	Ice	value	HeroWeapon	1
Rock	Fire	value	Pets	6
Rock	Ghost	value	Skillpoints	1
Rock	Dark	value	Firestones	502.5
Water	Water	value	Firestones	50
Water	Electric	value	RareItem	1
Water	Poison	value	Perks	2
Water	Bug	value	Pets	5
Water	Ice	value	FortuneWeapon	1
Water	Fire	value	Firestones	225
Water	Ghost	value	CraftingShards	13
Water	Dark	value	RaidCards	52
Electric	Electric	value	Firestones	50
Electric	Poison	value	Firestones	150
Electric	Bug	value	Firestones	150
Electric	Ice	value	Diamonds	225
Electric	Fire	value	Firestones	225
Electric	Ghost	value	Firestones	525
Electric	Dark	value	RaidCards	52
Poison	Poison	value	Firestones	250
Poison	Bug	value	Pets	8
Poison	Ice	value	HeroScroll	1
Poison	Fire	value	Firestones	325
Poison	Ghost	value	Pets	20
Poison	Dark	value	Firestones	625
Bug	Bug	value	Firestones	250
Bug	Ice	value	Diamonds	325
Bug	Fire	value	Dust	650
Bug	Ghost	value	CraftingShards	15
Bug	Dark	value	Wildcards	41
Ice	Ice	value	Firestones	400
Ice	Fire	value	LegendaryItem	1
Ice	Ghost	value	CraftingShards	17
Ice	Dark	value	FortuneScroll	1
Fire	Fire	value	Firestones	400
Fire	Ghost	value	Dust	1400
Fire	Dark	value	Pets	23
Ghost	Ghost	value	Firestones	1000
Ghost	Dark	value	MythicItem	1
Dark	Dark	value	Firestones	1000
				
ingredients				
id	label	rarity	value	
Grass	Leaf	1	2.5	
Rock	Rock	1	2.5	
Water	Droplet	2	25	
Electric	Shock	2	25	
Poison	Bubbles	3	125	
Bug	Beetle	3	125	
Ice	Frost	4	200	
Fire	Flame	4	200	
Ghost	Wisp	5	500	
Dark	Darkness	5	500	`;
