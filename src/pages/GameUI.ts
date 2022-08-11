import * as PIXI from 'pixi.js';
import { BaseUI } from './_BaseUI';
import { Fonts } from '../data/Fonts';
import { IResizeEvent } from '../services/GameEvents';
import { QuestUI } from '../components/QuestUI';
import { ResourceUI } from '../components/ResourceUI';
import { AlchemyData, IIngredient, IngredientType, IReward, RewardType, ScoreType } from '../data/AlchemyData';
import { Button } from '../components/ui/Button';
import { IngredientUI } from '../components/IngredientUI';
import { Colors } from '../data/Colors';
import { SimpleModal } from '../components/ui/modals/SimpleModal';
import { AlchemyService } from '../services/AlchemyService';
import { SaveManager } from '../services/SaveManager';
import { RecipeUI } from '../components/RecipeUI';
import { IngredientStackUI } from '../components/IngredientStackUI';

export class GameUI extends BaseUI {
  private title: PIXI.Text;
  private questUI: QuestUI;
  private resourceUI: ResourceUI;
  private ingredientUI: IngredientUI;
  private ingredientStackUI: IngredientStackUI;
  private recipeUI: RecipeUI;
  private generateB: Button;
  private generateB2: Button;
  private toggleButton: Button;
  private ingredientModeButton: Button;
  private recipeModeButton: Button;

  constructor() {
    super({bgColor: Colors.GAME_BACK});
    this.title = new PIXI.Text('Alchemy Test', { fontSize: 30, fontFamily: Fonts.UI, fill: 0x3333ff });
    this.resourceUI = new ResourceUI();
    this.ingredientUI = new IngredientUI(this.addRewardCraft);
    this.ingredientStackUI = new IngredientStackUI(this.addRewardCraft);
    this.questUI = new QuestUI(this.addRewardQuest);
    this.recipeUI = new RecipeUI();
    this.toggleButton = new Button({ width: 100, height: 30, label: 'Show Recipes', onClick: this.togglePanel });
    this.generateB = new Button({ width: 100, height: 30, label: 'Add Ingredient', onClick: this.addRandomIngredient });
    this.generateB2 = new Button({ width: 100, height: 30, label: '12 Ingredients', onClick: this.add12RandomIngredients });
    this.ingredientModeButton = new Button({ width: 100, height: 30, label: 'Change Mode', onClick: this.changeIngredientMode });
    this.recipeModeButton = new Button({ width: 100, height: 30, label: 'Change Mode', onClick: this.changeRecipeMode });
    this.addChild(this.title, this.questUI, this.resourceUI, this.ingredientUI, this.ingredientStackUI);
    this.addChild(this.toggleButton);
    this.addChild(this.generateB, this.generateB2, this.ingredientModeButton, this.recipeModeButton);

    this.addChild(this.recipeUI);

    let discoveredIngredients = SaveManager.getExtrinsic().discoveredIngredients;
    AlchemyData.ingredients.forEach(ingredient => {
      if (ingredient.isDefault && !discoveredIngredients[ingredient.id]) {
        this.resourceUI.addScore(ScoreType.IngredientDiscovered, 1);
        discoveredIngredients[ingredient.id] = true;
      }
    });

    this.ingredientUI.visible = false;
    this.questUI.visible = false;
    this.recipeUI.visible = false;
    // this.ingredientUI.visible = false;
    // this.togglePanel();
  }

  public positionElements = (e: IResizeEvent) => {
    this.title.x = (e.innerBounds.width - this.title.width) / 2;
    this.title.y = 50;

    this.questUI.y = 100;
    this.ingredientUI.y = 100;
    this.ingredientStackUI.y = 100;
    this.questUI.x = this.ingredientUI.x = this.ingredientStackUI.x = 50;
    this.recipeUI.x = 40;
    this.recipeUI.y = 40;

    this.resourceUI.y = 100;
    this.resourceUI.x = 400;
    this.toggleButton.position.set(5, 5);
    this.recipeModeButton.position.set(this.toggleButton.x + this.toggleButton.getWidth() + 5, 5);
    this.generateB.position.set(this.ingredientUI.x + (this.ingredientUI.getWidth() - this.generateB.getWidth()) / 2, this.ingredientUI.y + this.ingredientUI.getHeight() + 20);
    this.generateB2.position.set(this.generateB.x, this.generateB.y + this.generateB.getHeight() + 5);
    this.ingredientModeButton.position.set(this.generateB2.x, this.generateB2.y + this.generateB2.getHeight() + 5);
  }

  private addRewardQuest = (reward: IReward) => {
    if (reward.type === 'value') {
      this.resourceUI.addResource(reward.id, reward.count);
    } else if (reward.type === 'score') {
      this.resourceUI.addScore(reward.id, reward.count);
    } else {
      if (!SaveManager.getExtrinsic().discoveredIngredients[reward.id]) {
        this.resourceUI.addScore(ScoreType.IngredientDiscovered, 1);
        SaveManager.getExtrinsic().discoveredIngredients[reward.id] = true;
      }
      this.ingredientUI.addIngredient(reward.id, reward.count);
      this.ingredientStackUI.refreshDisplay();
    }
  }

  private addRewardCraft = (reward: IReward, ingredients: IIngredient[]) => {
    if (reward) {
      let dialogueText: string = '';
      if (reward.type === 'value') {
        this.resourceUI.addResource(reward.id, reward.count);
        dialogueText = `Congratulations! You turned ${ingredients[0].label} and ${ingredients[1].label} into ${reward.count} ${RewardType[reward.id]}(s).`;
      } else if (reward.type === 'score') {
        this.resourceUI.addScore(reward.id, reward.count);
        dialogueText = `Congratulations! You turned ${ingredients[0].label} and ${ingredients[1].label} into ${reward.count} ${ScoreType[reward.id]}(s).`;
      } else {
        if (!SaveManager.getExtrinsic().discoveredIngredients[reward.id]) {
          this.resourceUI.addScore(ScoreType.IngredientDiscovered, 1);
          SaveManager.getExtrinsic().discoveredIngredients[reward.id] = true;
        }
        this.ingredientUI.addIngredient(reward.id, reward.count);
        this.ingredientStackUI.refreshDisplay();
        dialogueText = `Congratulations! You turned ${ingredients[0].label} and ${ingredients[1].label} into ${reward.count} ${IngredientType[reward.id]}(s).`;
      }
      let dialogue = new SimpleModal(dialogueText);
      this.addDialogueWindow(dialogue);
      this.resourceUI.addScore(ScoreType.CombinationMade, 1);
      let recipes = SaveManager.getExtrinsic().discoveredRecipes;
      if (!recipes.some(el => ((el[0] === ingredients[0].id && el[1] === ingredients[1].id) || (el[0] === ingredients[1].id && el[1] === ingredients[0].id)))) {
        this.resourceUI.addScore(ScoreType.RecipeDiscovered, 1);
        recipes.push([ingredients[0].id, ingredients[1].id]);
      }
      SaveManager.saveExtrinsic();
    } else {
      let dialogue = new SimpleModal('Oops!  No recipe found!');
      this.addDialogueWindow(dialogue);
    }
  }

  private togglePanel = () => {
    this.recipeUI.visible = !this.recipeUI.visible;
    this.recipeUI.refreshDisplay();
  }

  private addRandomIngredient = () => {
    this.resourceUI.addScore(ScoreType.IngredientAdded, 1);
    let ingredient = AlchemyService.randomIngredient();
    this.ingredientUI.addIngredient(ingredient.id, 1);
    this.ingredientStackUI.refreshDisplay();
    SaveManager.saveExtrinsic();
  }

  private add12RandomIngredients = () => {
    this.resourceUI.addScore(ScoreType.IngredientAdded, 12);
    for (let i = 0; i < 12; i++) {
      let ingredient = AlchemyService.randomIngredient();
      this.ingredientUI.addIngredient(ingredient.id, 1);
    }
    this.ingredientStackUI.refreshDisplay();
    SaveManager.saveExtrinsic();
  }

  private changeIngredientMode = () => {
    this.ingredientUI.visible = !this.ingredientUI.visible;
    this.ingredientStackUI.visible = !this.ingredientUI.visible;
  }

  private changeRecipeMode = () => {
    this.recipeUI.changeMode();
  }
}
